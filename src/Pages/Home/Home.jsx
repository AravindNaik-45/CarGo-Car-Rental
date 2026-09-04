import { useState } from "react";
import "./Home.css";
import SearchBar from "../../Components/Searchbar/SearchBar";
import WhyChoose from "../../Components/WhyChoose/WhyChoose";
import cars from "../../Data/Cars";
import CarCard from "../../Components/CarCard/CarCard";

function Home() {
  const [searchData,setSearchData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory,setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [maxPrice, setMaxPrice] = useState(10000);
    const filteredCars = cars
  .filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || car.category === selectedCategory;
      const matchesPrice = car.price <=maxPrice;
    return (matchesSearch && matchesCategory && matchesPrice)
  })
  .sort((a, b) => {
    if (sortOption === "lowToHigh") {
      return a.price - b.price;
    }
    if (sortOption === "highToLow") {
      return b.price - a.price;
    }
    return 0;
  });
  const handleSearch = (data) =>{
    setSearchData(data);
  }
  return (   
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small-text">  PREMIUM CAR RENTALS  </p>
          <h1> Find Your<br /> Perfect Ride</h1>
          <p>Rent your dream car and explore the road with comfort, freedom and style. </p>
          <button className="explore-btn"> Explore Cars</button>
        </div>
           {/* RIGHT SIDE - CAR IMAGE */}
        <div className="hero-image">
          <img  src="/assets/Audi_logo.png" alt="Audi rental car" />
        </div>
      </section>
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch}/>
      {searchData && (
  <div className="search-result">
    <h3>Search Details</h3>
    <p>Location: {searchData.location}</p>
    <p>Pickup: {searchData.pickupDate}</p>
    <p>Return: {searchData.returnDate}</p>
  </div>
)}
      {/* Popular Cars */}
<section className="popular-cars">
  <div className="section-heading">
    <p className="section-label">OUR COLLECTION</p>
    <h2>Popular Cars</h2>
    <p>Choose from our most popular rental cars.</p>
  </div>
  {/* Search + Category + Sort + Price*/}
  <div className="home-car-filter">
  <div className="home-search-wrapper">
    <input
      type="text"
      placeholder="Search cars..."
      value={searchTerm}
      onChange={(event) =>setSearchTerm(event.target.value) }
      className="home-car-search"/>
  </div>
  {/* Category Filter */}
  <div className="home-category-buttons">
    <button
      className={selectedCategory === "All"
          ? "home-category-btn home-category-active"
          : "home-category-btn"
      }
      onClick={() =>
        setSelectedCategory("All")
      }>All</button>
    <button
      className={selectedCategory === "SUV"
          ? "home-category-btn home-category-active"
          : "home-category-btn"
      }
      onClick={() =>
        setSelectedCategory("SUV")}
    >SUV</button>
    <button
      className={selectedCategory === "Sedan"
          ? "home-category-btn home-category-active"
          : "home-category-btn"
      }
      onClick={() =>
        setSelectedCategory("Sedan")}>Sedan</button>
    <button
      className={
        selectedCategory === "Luxury"
          ? "home-category-btn home-category-active"
          : "home-category-btn"}
      onClick={() => setSelectedCategory("Luxury")}>Luxury
    </button>
  </div>
   {/* Sort */}
   <div className="home-sort-wrapper">
    <label htmlFor="home-car-sort"> Sort by: </label>
    <select
      id="home-car-sort" className="home-car-sort" value={sortOption}
      onChange={(event) => setSortOption(event.target.value)}>
      <option value="default">Recommended</option>
      <option value="lowToHigh">Price: Low to High</option>
      <option value="highToLow">Price: High to Low</option>
    </select>
   </div>
   {/* Price Filter */}
   <div className="home-price-filter">
  <label htmlFor="home-max-price">
    Max Price: ₹{maxPrice}
  </label>
  <input
    id="home-max-price"
    type="range"
    min="1000"
    max="10000"
    step="500"
    value={maxPrice}
    onChange={(event) =>
      setMaxPrice(Number(event.target.value))
    }
  />
</div>
  </div>
{/* Filtered Cars */}
  {filteredCars.length === 0 ? (
    <div className="home-no-cars">
      <h3>No Cars Found</h3>
      <p>Try searching for another car.</p>
    </div>
  ) : (
    <div className="car-container">
      {filteredCars.map((car) => (
        <CarCard
          key={car.id}
          car={car}/>
      ))}
    </div>
)}
</section>
      <WhyChoose/>
    </main>
  );
}

export default Home;