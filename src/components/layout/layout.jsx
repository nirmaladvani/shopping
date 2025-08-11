import Navbar from '../navbar/navbar'
import PropTypes from 'prop-types'
import './layout.css'

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ padding: '1rem' }}>{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
