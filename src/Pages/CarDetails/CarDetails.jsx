import { useParams } from "react-router-dom";
import cars from "../../Data/Cars";
import "./CarDetails.css";

function CarDetails() {
  const { id } = useParams();
  const car = cars.find((car) => car.id === Number(id));
  if (!car) {
    return <h2>Car not found</h2>;
  }
  return (
    <section className="car-details-page">
      <div className="details-image">
        <img
          src={`${car.image}`}
          alt={car.name}
        />
      </div>
      <div className="details-content">
        <p className="details-category">
          {car.category}
        </p>
        <h1>{car.name}</h1>
        <p className="details-rating">
          ⭐ {car.rating}
        </p>
        <div className="car-specs">
          <div>
            <span>👥</span>
            <p>{car.seats} Seats</p>
          </div>
          <div>
            <span>⚙️</span>
            <p>{car.transmission}</p>
          </div>
          <div>
            <span>⛽</span>
            <p>{car.fuel}</p>
          </div>
        </div>
        <div className="details-bottom">
          <div>
            <strong>₹{car.price}</strong>
            <span> / day</span>
          </div>
        </div>
      </div>
    </section>
  );
}
export default CarDetails;