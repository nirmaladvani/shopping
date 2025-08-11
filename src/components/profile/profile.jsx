import { useEffect, useState } from 'react'
import './profile.css'

export default function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <div className='profile'>
      <h1>Profile</h1>
      {user ? (
        <>
          <p>
            <strong>Name:</strong> {user.fullName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Joined:</strong> {new Date(user.createdAt).toLocaleString()}
          </p>
        </>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  )
}
