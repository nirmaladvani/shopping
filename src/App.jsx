import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/layout'
import Login from './components/login/login'
import Register from './components/register/register'
import Home from './components/home/home'
import Shop from './components/shop/shop'
import Profile from './components/profile/profile'

function App() {
  return (
    <Routes>
      {/* Pages with layout */}
      <Route
        path='/'
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path='/shop'
        element={
          <Layout>
            <Shop />
          </Layout>
        }
      />
      <Route
        path='/profile'
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />

      {/* Pages without navbar */}
      <Route
        path='/login'
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path='/register'
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
    </Routes>
  )
}

export default App
