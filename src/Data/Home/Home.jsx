import "./Home.css";

function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small-text">  PREMIUM CAR RENTALS  </p>
          <h1>
            Find Your
            <br />
            Perfect Ride
          </h1>
          <p>
            Rent your dream car and explore the road
            with comfort, freedom and style.
          </p>
          <button className="explore-btn">
            Explore Cars
          </button>
        </div>
      </section>
      <section className="popular-cars">
        <h2>Popular Cars</h2>
        <p>Choose from our most popular rental cars.</p>
        <div className="car-container">
          <div className="car-card">
            <div className="car-image">
              🚘
            </div>
            <h3>BMW 5 Series</h3>
            <p>₹4,500 / day</p>
          </div>
          <div className="car-card">
            <div className="car-image">
              🚙
            </div>
            <h3>Audi A6</h3>
            <p>₹5,200 / day</p>
          </div>
          <div className="car-card">
            <div className="car-image">
              🚗
            </div>
            <h3>Tesla Model 3</h3>
            <p>₹6,000 / day</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;