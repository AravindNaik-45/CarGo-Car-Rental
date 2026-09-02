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
        <a href="#">Card</a>
        <a href="#">Offers</a>
        <a href="#">About</a>
        <Link to="/my-bookings">My Bookings</Link>
    </div>
    <button className='login-btn'>Login</button>
  </nav>
  </>
}

export default NavBar