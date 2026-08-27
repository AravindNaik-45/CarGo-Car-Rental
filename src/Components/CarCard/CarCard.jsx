import "./CarCard.css"

function CarCard({ car }) {
  return (
    <div className="car-card">
      <div className="car-image">
        <img src={car.image} alt={car.name}/>
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
          <button>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarCard