    import "./MyBooking.css";
    import { useNavigate } from "react-router-dom";
    
    const MyBooking = () => {
        const navigate = useNavigate();
        const handleCancelBooking = (bookingId) => {
  const confirmCancel = window.confirm("Are you sure you want to cancel this booking?"
  );
  if (!confirmCancel) {
    return;
  }
  const updatedBookings =
    savedBookings.filter(
      (booking) =>booking.bookingId !== bookingId);
  localStorage.setItem("cargoBookings",
    JSON.stringify(updatedBookings)
  );
  window.location.reload();
};
        const savedBookings = JSON.parse(localStorage.getItem("cargoBookings")) || [];
  return (
    <main className="my-bookings-page">
      <section className="my-bookings-header">
        <p className="my-bookings-label">CARGO RENTALS</p>
        <h1> My Bookings</h1>
        <p>View all your car rental bookings.</p>
      </section>
      <section className="my-bookings-container">
        {savedBookings.length === 0 ? (
          <div className="my-bookings-empty">
            <h2>No Bookings Yet</h2>
            <p>You haven't booked any cars yet.</p>
            <button
              className="my-bookings-browse-btn"
              onClick={() => navigate("/")}>
              Browse Cars</button>
          </div>
        ) : (
          savedBookings.map((booking) => (
            <div
              className="my-booking-card"
              key={booking.bookingId}>
              {/* Car Image */}
              <div className="my-booking-image">
                <img
                  src={`${booking.car.image}`}
                  alt={booking.car.name}/>
              </div>
              {/* Booking Information */}
              <div className="my-booking-information">
                <div className="my-booking-top">
                  <div>
                    <h2>{booking.car.name}</h2>
                    <p>{booking.car.category}</p>
                  </div>
                  <span className="my-booking-status">Confirmed</span>
                </div>
                <div className="my-booking-id">
                  Booking ID:
                  <strong>{booking.bookingId}</strong>
                </div>
                <div className="my-booking-details">
                  <div>
                    <span>Pickup Location</span>
                    <strong>{booking.location}</strong>
                  </div>
                  <div>
                    <span>Pickup Date </span>
                    <strong>{booking.pickupDate}</strong>
                  </div>
                  <div>
                    <span>Return Date</span>
                    <strong>{booking.returnDate}</strong>
                  </div>
                  <div>
                    <span>Rental Days</span>
                    <strong>{booking.rentalDays}</strong>
                  </div>
                </div>
                <div className="my-booking-bottom">
            <div className="my-booking-total">
              <span>Total Amount</span>
              <strong>₹{booking.totalPrice}</strong>
            </div>
           <button
               className="my-booking-cancel-btn"
                onClick={() =>
                   handleCancelBooking(
                   booking.bookingId
                 )}>Cancel Booking</button>
               </div>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

    export default MyBooking