import { useNavigate } from 'react-router-dom'
import './home.css'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className='container'>
      <div className='home'>
        <h1>Welcome to shopping</h1>
        <div>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
          <button onClick={() => navigate('/shop')}>Shop</button>
          <button onClick={() => navigate('/profile')}>Profile</button>
        </div>
      </div>
    </div>
  )
}
