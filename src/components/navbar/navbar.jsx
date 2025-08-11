import { Link } from 'react-router-dom'
import './navbar.css'

function Navbar() {
  return (
    <nav className='navbar'>
      {/* <div className='logo'>Shopping</div> */}
      <ul>
        <li style={{ left: 0 }}>
          <Link to='/shopping'>Shopping</Link>
        </li>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/shop'>Shop</Link>
        </li>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
