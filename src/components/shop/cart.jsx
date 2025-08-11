import './shop.css'
import PropTypes from 'prop-types'

export default function Cart({
  cart,
  updateCartQuantity,
  removeFromCart,
  handleCheckout,
  className = '',
  onClose,
}) {
  const totalPrice = cart
    .reduce((sum, item) => sum + item.quantity * item.price, 0)
    .toFixed(2)

  return (
    <div className={`cart-panel ${className}`}>
      <button className='close-button' onClick={onClose}>
        ✖ Close
      </button>
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div className='cart-item' key={item.id}>
          <img src={item.thumbnail} alt={item.title} />
          <div className='cart-content'>
            <div className='cart-details'>
              <p>{item.title}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>

            <div className='cart-actions'>
              <button onClick={() => updateCartQuantity(item.id, 1)}>+</button>
              <button
                onClick={() => {
                  if (item.quantity === 1) {
                    removeFromCart(item.id)
                  } else {
                    updateCartQuantity(item.id, -1)
                  }
                }}
              >
                -
              </button>

              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        </div>
      ))}
      {cart.length === 0 && (
        <p className='cart-empty-msg'>Your cart is empty.</p>
      )}

      <h3>Cart Total: ${totalPrice}</h3>
      <button
        className='checkout-button'
        onClick={handleCheckout}
        disabled={cart.length === 0}
      >
        Proceed to Checkout
      </button>
    </div>
  )
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      thumbnail: PropTypes.string.isRequired,
    })
  ).isRequired,
  updateCartQuantity: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  handleCheckout: PropTypes.func.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}
