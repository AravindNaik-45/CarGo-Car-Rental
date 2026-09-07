import { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn =
    localStorage.getItem("cargoLoggedIn") === "true";
  const handleLogout = () => {
    localStorage.removeItem("cargoLoggedIn");
    setIsMenuOpen(false);
    window.location.href = "/login";
  };
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <nav className="cargo-navbar">
      {/* LEFT - LOGO */}
      <div className="cargo-navbar-logo">
        🚗 <span>CarGo</span>
      </div>
      {/* CENTER - NAVIGATION LINKS */}
      <div
        className={
          isMenuOpen
            ? "cargo-navbar-links cargo-navbar-links-open"
            : "cargo-navbar-links"
        }>
        <Link to="/" onClick={closeMobileMenu}> Home </Link>
        <Link to="/cars" onClick={closeMobileMenu}> Cars </Link>
        <Link to="/offers" onClick={closeMobileMenu}> Offers </Link>
        <Link to="/about" onClick={closeMobileMenu}> About </Link>
        <Link to="/my-bookings" onClick={closeMobileMenu}> My Bookings </Link>
        <Link
          to="/favorites"
          className="cargo-navbar-wishlist"
          onClick={closeMobileMenu}
        > ❤️ Wishlist </Link>
        {/* MOBILE LOGIN / LOGOUT */}
        <div className="cargo-navbar-mobile-action">
          {isLoggedIn ? (
            <button
              type="button"
              className="cargo-navbar-logout"
              onClick={handleLogout}
            > Logout </button>
          ) : (
            <Link
              to="/login"
              className="cargo-navbar-login"
              onClick={closeMobileMenu}
            > Login </Link>
          )}
        </div>
      </div>
      {/* RIGHT - DESKTOP LOGIN / LOGOUT */}
      <div className="cargo-navbar-action">
        {isLoggedIn ? (
          <button
            type="button"
            className="cargo-navbar-logout"
            onClick={handleLogout}>Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="cargo-navbar-login"
            onClick={closeMobileMenu}>Login
          </Link>
        )}
      </div>
      {/* MOBILE HAMBURGER */}
      <button
        type="button"
        className="cargo-navbar-menu-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu">
        {isMenuOpen ? "✕" : "☰"}
      </button>
    </nav>
  );
};
export default NavBar;