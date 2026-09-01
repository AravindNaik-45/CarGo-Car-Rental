import "./Footer.css";
let Footer = () => {
    return (
      <footer className="footer">
      <div className="footer-logo">🚗 CarGo</div>
      <p>Your journey starts with the right car.</p>
      <div className="footer-links">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Contact</a>
      </div>
      <p className="copyright"> © 2026 CarGo. All rights reserved.</p>
    </footer>
  );
}

export default Footer