import { useEffect, useState, useRef } from 'react'
import './shop.css'
import Cart from './cart'

export default function Shop() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(0)
  const [disableButton, setDisableButton] = useState(false)
  const loaderRef = useRef()
  const [cart, setCart] = useState([])
  const [quantities, setQuantities] = useState({})
  const [open, setOpen] = useState(false)

  const handlePopup = () => setOpen(!open)
  const closePopup = () => setOpen(false)

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) setCart(JSON.parse(storedCart))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `https://dummyjson.com/products?limit=20&skip=${count * 20}`
        )
        const result = await response.json()

        if (result?.products?.length) {
          await preloadImages(result.products)
          const pricedProducts = result.products.map((item) => ({
            ...item,
            price: (Math.random() * 100 + 10).toFixed(2),
          }))
          setProducts((prev) => [...prev, ...pricedProducts])

          const newQuantities = {}
          pricedProducts.forEach((item) => {
            newQuantities[item.id] = 1
          })
          setQuantities((prev) => ({ ...prev, ...newQuantities }))
        }

        if (products.length + result.products.length >= 100) {
          setDisableButton(true)
        }
      } catch (e) {
        console.error('Failed to fetch products:', e)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [count])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !disableButton && !loading) {
        setCount((prev) => prev + 1)
      }
    })
    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [disableButton, loading])

  const preloadImages = async (items) =>
    Promise.all(
      items.map((item) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.src = item.thumbnail
          img.onload = resolve
          img.onerror = resolve
        })
      })
    )

  const increaseLocalQuantity = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }))

  const decreaseLocalQuantity = (id) =>
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, prev[id] - 1) }))

  const addToCart = (product) => {
    const quantityToAdd = quantities[product.id] || 1
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      return existing
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantityToAdd }
              : item
          )
        : [...prev, { ...product, quantity: quantityToAdd }]
    })
  }

  const updateCartQuantity = (id, delta) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id))

  const handleCheckout = () => {
    alert('Thank you for your purchase!')
    setCart([])
    localStorage.removeItem('cart')
    closePopup()
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className='load-more-container'>
      {open && (
        <Cart
          className='modal-container'
          cart={cart}
          updateCartQuantity={updateCartQuantity}
          removeFromCart={removeFromCart}
          handleCheckout={handleCheckout}
          onClose={closePopup}
        />
      )}
      <div className='floating-cart-icon' onClick={handlePopup}>
        🛒 Items: {totalItems} | Total: $
        {cart
          .reduce((sum, item) => sum + item.quantity * item.price, 0)
          .toFixed(2)}
      </div>

      {/* <div className='cart' onClick={handlePopup}>
        🛒 Items: {totalItems} | Total: $
        {cart
          .reduce((sum, item) => sum + item.quantity * item.price, 0)
          .toFixed(2)}
      </div> */}

      <div className='product-container'>
        {products.map((item) => (
          <div className='product' key={item.id}>
            <img src={item.thumbnail} alt={item.title} />
            <p>{item.title}</p>
            <p className='price'>${item.price}</p>

            <div className='quantity-control'>
              <span>Quantity: {quantities[item.id]}</span>
              <button onClick={() => increaseLocalQuantity(item.id)}>+</button>
              <button
                onClick={() => decreaseLocalQuantity(item.id)}
                disabled={quantities[item.id] === 1}
              >
                -
              </button>
            </div>

            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}

        {loading &&
          [...Array(4)].map((_, i) => (
            <div className='product skeleton' key={`skeleton-${i}`}>
              <div className='skeleton-img'></div>
              <div className='skeleton-text'></div>
            </div>
          ))}
      </div>

      <div ref={loaderRef}></div>
    </div>
  )
}
