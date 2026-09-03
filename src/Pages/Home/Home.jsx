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
  const filteredCars = cars.filter((car) => {
  const matchesSearch =
    car.name
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase());
  const matchesCategory =
    selectedCategory === "All" ||
    car.category === selectedCategory;
  return matchesSearch && matchesCategory;
});
  const categories = ["All","Luxury","Electric"]
  const handleSearch = (data) =>{
    setSearchData(data);
  }
  // const filteredCars =
  // selectedCategory === "All"
  //   ? cars : cars.filter((car) => car.category === selectedCategory);
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
  {/* Search + Category Filter */}
  <div className="home-car-filter">
  <div className="home-search-wrapper">
    <input
      type="text"
      placeholder="Search cars..."
      value={searchTerm}
      onChange={(event) =>
        setSearchTerm(event.target.value)
      }
      className="home-car-search"/>
  </div>
  <div className="home-category-buttons">
    <button
      className={
        selectedCategory === "All"
          ? "home-category-btn home-category-active"
          : "home-category-btn"
      }
      onClick={() =>
        setSelectedCategory("All")
      }>All</button>
    <button
      className={
        selectedCategory === "SUV"
          ? "home-category-btn home-category-active"
          : "home-category-btn"
      }
      onClick={() =>
        setSelectedCategory("SUV")}
    >SUV</button>
    <button
      className={
        selectedCategory === "Sedan"
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
      onClick={() =>
        setSelectedCategory("Luxury")}>Luxury
    </button>
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