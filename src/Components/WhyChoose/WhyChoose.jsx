import "./WhyChoose.css";

function WhyChoose() {
  return (
    <section className="why-choose">
      <div className="section-heading">
        <p>WHY CHOOSE US</p>
        <h2>Everything You Need<br />For a Better Journey</h2>
      </div>
      <div className="benefits">
        <div className="benefit-card">
          <div className="benefit-icon">🛡️</div>
          <h3>Safe & Reliable</h3>
          <p>All our cars are regularly maintained and inspected.</p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">💰</div>
          <h3>Best Prices</h3>
          <p>Enjoy competitive rental prices with no hidden charges.</p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">🚘</div>
          <h3>Wide Selection</h3>
          <p>Choose from economy, luxury, SUV and electric cars</p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">📞</div>
          <h3>24/7 Support</h3>
          <p>Our support team is available whenever you need help.</p>
        </div>
      </div>
    </section>
  );
}
export default WhyChoose;