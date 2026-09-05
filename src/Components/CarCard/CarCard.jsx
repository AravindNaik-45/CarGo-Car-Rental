import { Link } from "react-router-dom";
import "./CarCard.css"
import { useState } from "react";

function CarCard({ car }) {
  const [isFavorite,setIsFavorite] = useState(() => {
    const savedFavorites =
    JSON.parse(localStorage.getItem("cargoFavorites")) || [];
    const carId = Number(car.id);
    return savedFavorites.includes(carId)
  });
  const handleFavorite = () => {
  const savedFavorites =
    JSON.parse(localStorage.getItem("cargoFavorites")) || [];
    const carId = Number(car.id);
  let updatedFavorites;
  if (savedFavorites.includes(carId)) {
    updatedFavorites = savedFavorites.filter(
        (id) => id !== car.id );
    setIsFavorite(false);
  } else {
    updatedFavorites = [ ...savedFavorites, car.id];
    setIsFavorite(true);
  }
  localStorage.setItem(
    "cargoFavorites",
    JSON.stringify(updatedFavorites)
  );
};
  return (
    <div className="car-card">
      <div className="car-image">
        <img src={car.image} alt={car.name}/>
        <button type="button" className="car-card-favorite-btn" onClick={handleFavorite}
           aria-label={
             isFavorite
               ? "Remove from favorites" : "Add to favorites"}>{isFavorite ? "❤️" : "♡"}</button>
      </div>
      <div className="car-details">
        <div className="car-title">
          <h3> {car.name} </h3>
          <span>⭐ {car.rating} </span>
        </div>
        <p className="car-category">{car.category}</p>
        <div className="car-specs">
          <span> 👤 {car.seats} Seats</span>
          <span> ⚙️ {car.transmission} </span>
          <span> ⛽ {car.fuel} </span>
        </div>
        <div className="car-bottom">
          <div>
            <strong>₹{car.price}</strong>
            <span> / day</span>
          </div>
          <Link
            to={`/cars/${car.id}`}
            className="view-details-btn">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CarCard