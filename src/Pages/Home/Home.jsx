import { useState } from "react";
import "./Home.css";
import SearchBar from "../../Components/Searchbar/SearchBar";
import WhyChoose from "../../Components/WhyChoose/WhyChoose";
import cars from "../../Data/Cars";
import CarCard from "../../Components/CarCard/CarCard";

function Home() {
  const [searchData,setSearchData] = useState(null);
  const [selectedCategory,setSelectedCategory] = useState("All");
  const categories = ["All","Luxury","Electric"]
  const handleSearch = (data) =>{
    setSearchData(data);
  }
  const filteredCars =
  selectedCategory === "All"
    ? cars : cars.filter((car) => car.category === selectedCategory);
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
    <div className="category-buttons">
    {categories.map((category) => (
      <button key={category} className={
          selectedCategory === category
            ? "category-btn active" : "category-btn"}
        onClick={() => setSelectedCategory(category)}>
        {category} </button>
    ))}
  </div>
  <div className="car-container">
    {filteredCars.map((car) => (
      <CarCard key={car.id} car={car}/>
    ))}
  </div>
</section>
      <WhyChoose/>
    </main>
  );
}

export default Home;