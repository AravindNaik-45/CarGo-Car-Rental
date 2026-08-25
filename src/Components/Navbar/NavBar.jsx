import "./NavBar.css"
const NavBar = () => {
  return <>
  <nav className='navbar'> 
    <div className='logo'>
       🚗 CarGo
    </div>
    <div className='nav-links'>
        <a href="#">Home</a>
        <a href="#">Card</a>
        <a href="#">Offers</a>
        <a href="#">About</a>
    </div>
    <button className='login-btn'>Login</button>
  </nav>
  </>
}

export default NavBar