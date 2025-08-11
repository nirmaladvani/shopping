import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './register.css'

export default function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    cpassword: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.password !== formData.cpassword) {
      setError('Passwords do not match')
      return
    }

    const userProfile = {
      fullName: `${formData.fname} ${formData.lname}`,
      email: formData.email,
      createdAt: new Date().toISOString(),
    }

    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(userProfile))

    // Navigate to profile page
    navigate('/profile')
  }

  return (
    <div className='container'>
      <h2>Register</h2>
      <div className='register'>
        <form onSubmit={handleSubmit}>
          <div className='name'>
            <input
              type='text'
              name='fname'
              placeholder='First Name'
              value={formData.fname}
              onChange={handleChange}
              required
            />
            <input
              type='text'
              name='lname'
              placeholder='Last Name'
              value={formData.lname}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type='email'
            name='email'
            placeholder='Enter your email'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type='password'
            name='cpassword'
            placeholder='Confirm Password'
            value={formData.cpassword}
            onChange={handleChange}
            required
          />
          <button type='submit'>Register</button>
        </form>
        {error && <p className='error'>{error}</p>}
      </div>

      <div className='login'>
        <div>Already got an account? Login Now</div>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  )
}
