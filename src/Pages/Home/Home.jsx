import "./Home.css";
import SearchBar from "../../Components/Searchbar/SearchBar";
import WhyChoose from "../../Components/WhyChoose/WhyChoose";
import cars from "../../Data/Cars";
import CarCard from "../../Components/CarCard/CarCard";

function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small-text">  PREMIUM CAR RENTALS  </p>
          <h1> Find Your<br /> Perfect Ride</h1>
          <p>Rent your dream car and explore the road with comfort, freedom and style. </p>
          <button className="explore-btn">
            Explore Cars
          </button>
        </div>
           {/* RIGHT SIDE - CAR IMAGE */}
        <div className="hero-image">
          <img  src="/assets/Audi_logo.png" alt="BMW rental car" />
        </div>
      </section>

      {/* Search Bar */}
      <SearchBar/>
      
      {/* Popular Cars */}
<section className="popular-cars">
  <div className="section-heading">
    <p className="section-label">OUR COLLECTION</p>
    <h2>Popular Cars</h2>
    <p>      Choose from our most popular rental cars.</p>
  </div>
  <div className="car-container">
    {cars.map((car) => (
      <CarCard
        key={car.id}
        car={car}
      />
    ))}
  </div>
</section>
      <WhyChoose/>
    </main>
  );
}

export default Home;