import "./BookingConformation.css"

import { useLocation, useNavigate } from "react-router-dom";

 const BookingConformation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state;
  if (!booking) {
    return (
      <main className="confirmation-empty">
        <h2>No Booking Found</h2>
        <button
          className="confirmation-home-btn"
          onClick={() => navigate("/")}>
          Back to Home</button>
      </main>
    );
  }
  return (
    <main className="confirmation-page">
      <section className="confirmation-card">
        {/* Success Icon */}
        <div className="confirmation-success-icon">✓</div>
        {/* Heading */}
        <h1>Booking Confirmed!</h1>
        <p className="confirmation-message">Your car has been successfully booked.</p>
        {/* Booking ID */}
        <div className="confirmation-id-box">
          <span>Booking ID</span>
          <strong>{booking.bookingId}</strong>
        </div>
        {/* Car Information */}
        <div className="confirmation-car-info">
          <img src={`${booking.car.image}`} alt={booking.car.name}/>
          <div>
            <h2>{booking.car.name}</h2>
            <p>{booking.car.category} </p>
            <p>⭐ {booking.car.rating}</p>
          </div>
        </div>
        {/* Rental Information */}
        <div className="confirmation-details">
          <div className="confirmation-detail-item">
            <span> Pickup Location </span>
            <strong>{booking.location}</strong>
          </div>
          <div className="confirmation-detail-item">
            <span> Pickup Date</span>
            <strong>{booking.pickupDate} </strong>
          </div>
          <div className="confirmation-detail-item">
            <span> Return Date </span>
            <strong> {booking.returnDate} </strong>
          </div>
          <div className="confirmation-detail-item">
            <span> Rental Days </span>
            <strong> {booking.rentalDays}</strong>
          </div>
        </div>
        {/* Total */}
        <div className="confirmation-total">
          <span> Total Amount</span>
          <strong> ₹{booking.totalPrice} </strong>
        </div>
        {/* Button */}
        <button
          className="confirmation-home-btn"
          onClick={() => navigate("/")}>
          Back to Home</button>
      </section>
    </main>
  );
}

export default BookingConformation