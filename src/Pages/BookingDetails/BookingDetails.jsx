import { useEffect, useState } from "react";
import "./BookingDetails.css"
import { useNavigate, useParams } from "react-router-dom";

const BookingDetails = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const handlePrintReceipt = () => {
        window.print();
    };
    const [booking, setBooking] = useState(null);  
    useEffect(() => {
      const savedBookings =
      JSON.parse(localStorage.getItem("cargoBookings")) || [];
  
      const selectedBooking = savedBookings.find(
      (item) => String(item.bookingId) === String(bookingId)
       );
    setBooking(selectedBooking || null);
     }, [bookingId]);
    if (!booking) {
    return (
       <main className="booking-details-page">
        <section className="booking-details-empty">
          <h2>Booking Not Found</h2>
          <p>
            We could not find the booking you are looking for.
          </p>
          <button
            type="button"
            className="booking-details-back-btn"
            onClick={() => navigate("/my-bookings")}
          >
            Back to My Bookings
          </button>
        </section>
      </main>
    );
  }
  return ( 
    <main className="booking-details-page">
      <section className="booking-details-header">
        <p className="booking-details-label">
          CARGO RENTALS
        </p>
        <h1>Booking Details</h1>
        <p>View complete information about your booking.</p>
      </section>
      <section className="booking-details-card">
        <div className="booking-details-car-section">
          <div className="booking-details-car-image">
            <img
              src={booking.car.image}
              alt={booking.car.name}
            />
          </div>
          <div className="booking-details-car-info">
            <p className="booking-details-category">
              {booking.car.category}
            </p>
            <h2>{booking.car.name}</h2>
            <p>
              ⭐ {booking.car.rating} &nbsp; | &nbsp;
              {booking.car.seats} Seats &nbsp; | &nbsp;
              {booking.car.transmission}
            </p>
            <div
              className={
                booking.status === "Cancelled"
                  ? "booking-details-status booking-details-status-cancelled"
                  : "booking-details-status"
              }
            >
              {booking.status || "Confirmed"}
            </div>
          </div>
        </div>
        <div className="booking-details-id-section">
          <span>Booking ID</span>
          <strong>{booking.bookingId}</strong>
        </div>
        <div className="booking-details-information">
          <h3>Customer Information</h3>
          <div className="booking-details-grid">
            <div className="booking-details-item">
              <span>Customer Name</span>
              <strong>{booking.name}</strong>
            </div>
            <div className="booking-details-item">
              <span>Email</span>
              <strong>{booking.email}</strong>
            </div>
            <div className="booking-details-item">
              <span>Phone</span>
              <strong>{booking.phone}</strong>
            </div>
            <div className="booking-details-item">
              <span>Pickup Location</span>
              <strong>{booking.location}</strong>
            </div>
          </div>
        </div>
        <div className="booking-details-information">
          <h3>Rental Information</h3>
          <div className="booking-details-grid">
            <div className="booking-details-item">
              <span>Pickup Date</span>
              <strong>{booking.pickupDate}</strong>
            </div>
            <div className="booking-details-item">
              <span>Return Date</span>
              <strong>{booking.returnDate}</strong>
            </div>
            <div className="booking-details-item">
              <span>Rental Days</span>
              <strong>{booking.rentalDays}</strong>
            </div>
            <div className="booking-details-item">
              <span>Price Per Day</span>
              <strong>₹{booking.car.price}</strong>
            </div>
          </div>
        </div>
        <div className="booking-details-total-section">
          <span>Total Amount</span>
          <strong>₹{booking.totalPrice}</strong>
        </div>
        <div className="booking-details-action-buttons">
        <button
          type="button"
          className="booking-details-print-btn"
          onClick={handlePrintReceipt}
        > 🖨️ Print / Save Receipt
        </button>
        <button
          type="button"
          className="booking-details-back-btn"
          onClick={() => navigate("/my-bookings")}
        > ← Back to My Bookings
        </button>
      </div>
      </section>
    </main>
  );
}

export default BookingDetails