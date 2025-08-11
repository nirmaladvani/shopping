import { useNavigate } from 'react-router-dom'
import './login.css'

export default function Login() {
  const navigate = useNavigate()

  return (
    <div className='container'>
      <h2>Login</h2>
      <div className='login'>
        <form action=''>
          <input
            type='text'
            id='username'
            placeholder='Enter Username or Email'
          />
          <input
            type='password'
            id='password'
            placeholder='Enter your password'
          />
          <button>Login</button>
        </form>
      </div>
      <div className='register'>
        <div>Don&apos;t have an account? Regisrer Now</div>
        <button onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  )
}
