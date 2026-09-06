import "./NavBar.css"
import { Link } from "react-router-dom";
const NavBar = () => {
  return <>
  <nav className='navbar'> 
    <div className='logo'>
       🚗 CarGo
    </div>
    <div className='nav-links'>
        <Link to="/">Home</Link>
        <Link to="/cars">Cars</Link>
        <Link to="/offers">Offers</Link>
        <Link to="about">About</Link>
        <Link to="/my-bookings">My Bookings</Link>
        <Link to="/favorites" className="navbar-wishlist-link"> ❤️ Wishlist</Link>
    </div>
    <Link to="/login" className='login-btn'>Login</Link>
  </nav>
  </>
}

export default NavBar