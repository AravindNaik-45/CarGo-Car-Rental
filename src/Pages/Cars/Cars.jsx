import { useState } from "react";
import { Link } from "react-router-dom";
import { getCars } from "../../Utils/carStorage";
import "./Cars.css";

const Cars = () => {
    const [cars, setCars] = useState(() => getCars());
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOption, setSortOption] = useState("default");
    const [maxPrice, setMaxPrice] = useState(10000);
    const filteredCars = cars
      .filter((car) => {
        const matchesSearch = car.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "All" ||
          car.category === selectedCategory;
        const matchesPrice = Number(car.price) <= maxPrice;
        return (
          matchesSearch &&
          matchesCategory &&
          matchesPrice
        );
      })
      .sort((a, b) => {
        if (sortOption === "lowToHigh") {
          return Number(a.price) - Number(b.price);
        }
        if (sortOption === "highToLow") {
          return Number(b.price) - Number(a.price);
        }
        return 0;
      });
    const handleRefreshCars = () => {
      setCars(getCars());
    };
  return (
    <main className="cargo-cars-page">
      {/* Page Header */}
      <section className="cargo-cars-header">
        <p className="cargo-cars-small-title">
          OUR COLLECTION
        </p>
        <h1>Explore Our Cars</h1>
        <p>
          Choose from our wide range of cars and find
          the perfect ride for your journey.
        </p>
      </section>
      {/* Filters */}
      <section className="cargo-cars-filter-section">
        {/* Search */}
        <div className="cargo-cars-search-box">
          <input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>
        {/* Categories */}
        <div className="cargo-cars-category-buttons">
          <button
            type="button"
            className={
              selectedCategory === "All"
                ? "cargo-cars-category-btn cargo-cars-category-active"
                : "cargo-cars-category-btn"
            }
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>
          <button
            type="button"
            className={
              selectedCategory === "SUV"
                ? "cargo-cars-category-btn cargo-cars-category-active"
                : "cargo-cars-category-btn"
            }
            onClick={() => setSelectedCategory("SUV")}
          >
            SUV
          </button>
          <button
            type="button"
            className={
              selectedCategory === "Sedan"
                ? "cargo-cars-category-btn cargo-cars-category-active"
                : "cargo-cars-category-btn"
            }
            onClick={() => setSelectedCategory("Sedan")}
          >
            Sedan
          </button>
          <button
            type="button"
            className={
              selectedCategory === "Luxury"
                ? "cargo-cars-category-btn cargo-cars-category-active"
                : "cargo-cars-category-btn"
            }
            onClick={() => setSelectedCategory("Luxury")}
          >
            Luxury
          </button>
        </div>
        {/* Sort */}
        <div className="cargo-cars-sort-box">
          <label htmlFor="cargo-cars-sort">
            Sort by:
          </label>
          <select
            id="cargo-cars-sort"
            value={sortOption}
            onChange={(event) =>
              setSortOption(event.target.value)
            }
          >
            <option value="default">
              Recommended
            </option>
            <option value="lowToHigh">
              Price: Low to High
            </option>
            <option value="highToLow">
              Price: High to Low
            </option>
          </select>
        </div>
        {/* Price */}
        <div className="cargo-cars-price-box">
          <label htmlFor="cargo-cars-max-price">
            Max Price: ₹{maxPrice}
          </label>
          <input
            id="cargo-cars-max-price"
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
      </section>
      {/* Refresh button */}
      <div className="cargo-cars-refresh-wrapper">
        <button
          type="button"
          className="cargo-cars-refresh-btn"
          onClick={handleRefreshCars}
        >
          Refresh Cars
        </button>
      </div>
      {/* Cars */}
      <section className="cargo-cars-list-section">
        {filteredCars.length === 0 ? (
          <div className="cargo-cars-empty">
            <h2>No Cars Found</h2>
            <p>
              Try changing your search, category,
              or price filter.
            </p>
          </div>
        ) : (
          <div className="cargo-cars-grid">
            {filteredCars.map((car) => (
              <div
                className="cargo-cars-item"
                key={car.id}
              >
                {/* Image */}
                <div className="cargo-cars-image-wrapper">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="cargo-cars-image"
                  />
                </div>
                {/* Content */}
                <div className="cargo-cars-content">
                  <p className="cargo-cars-category">
                    {car.category}
                  </p>
                  <h2>{car.name}</h2>
                  <div className="cargo-cars-info">
                    <span>
                      ⭐ {car.rating}
                    </span>
                    <span>
                      👤 {car.seats} Seats
                    </span>
                    <span>
                      ⚙️ {car.transmission}
                    </span>
                  </div>
                  <div className="cargo-cars-bottom">
                    <p className="cargo-cars-price">
                      ₹{car.price}
                      <span> / day</span>
                    </p>
                    <Link
                      to={`/cars/${car.id}`}
                      className="cargo-cars-details-btn"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Cars