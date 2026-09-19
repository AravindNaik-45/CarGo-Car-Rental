import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./BookingConformation.css"

const BookingConformation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(location.state || null);
  useEffect(() => {
  if (booking) {
    return;
    }
    const savedBookings =
      JSON.parse(localStorage.getItem("cargoBookings")) || [];
    const bookingId = new URLSearchParams(location.search).get("bookingId");
    if (!bookingId) {
      return;
    }
    const savedBooking = savedBookings.find(
      (item) => String(item.bookingId) === String(bookingId)
    );
    if (savedBooking) {
      setBooking(savedBooking);
    }
  }, [booking, location.search]);
  if (!booking) {
    return (
      <div className="booking-confirmation-empty">
        <h2>Booking information not found</h2>
        <p>Please return to My Bookings to view your booking details.</p>
        <button
          type="button"
          className="booking-confirmation-back-btn"
          onClick={() => navigate("/my-bookings")}
        >
          ← Back to My Bookings
        </button>
      </div>
    );
  }
  return (
    <main className="confirmation-page">
      <section className="confirmation-card">
        {/* Booking Status Icon */}
        <div
          className={
            booking.status === "Cancelled"
              ? "confirmation-status-icon confirmation-status-icon-cancelled"
              : "confirmation-success-icon"
          }
        >
          {booking.status === "Cancelled" ? "!" : "✓"}
        </div>
        {/* Heading */}
        <h1>
          {booking.status === "Cancelled"
            ? "Booking Cancelled"
            : "Booking Confirmed!"}
        </h1>
        <p className="confirmation-message">
          {booking.status === "Cancelled"
            ? "This booking has been cancelled."
            : "Your car has been successfully booked."}
        </p>
        {/* Booking ID */}
        <div className="confirmation-id-box">
          <span>Booking ID</span>
          <strong>{booking.bookingId || "N/A"}</strong>
        </div>     
        {/* Car Information */}
        <div className="confirmation-car-info">
          <img
            src={booking.car?.image || "/assets/default-car.jpg"}
            alt={booking.car?.name || "Car"}
          />
          <div>
            <h2>{booking.car?.name || "Unknown Car"}</h2>
            <p>{booking.car?.category || "Car"}</p>
            <p>⭐ {booking.car?.rating || "N/A"}</p>
          </div>
        </div>
        {/* Rental Information */}
        <div className="confirmation-details">
          <div className="confirmation-detail-item">
            <span> Pickup Location </span>
            <strong>{booking.location || "N/A"}</strong>
          </div>
          <div className="confirmation-detail-item">
            <span> Pickup Date</span>
            <strong>{booking.pickupDate
            ? new Date(booking.pickupDate).toLocaleDateString("en-IN")
            : "N/A"} 
            </strong>
          </div>
          <div className="confirmation-detail-item">
            <span> Return Date </span>
            <strong>
              {booking.returnDate
                ? new Date(booking.returnDate).toLocaleDateString("en-IN")
                : "N/A"}
            </strong>
          </div>
          <div className="confirmation-detail-item">
            <span> Rental Days </span>
            <strong>
              {Number(booking.rentalDays || 0)}{" "}
              {Number(booking.rentalDays || 0) === 1
                ? "Day"
                : "Days"}
            </strong>
          </div>
        </div>
        {/* Total */}
        <div className="confirmation-total">
          <span> Total Amount</span>
          <strong>₹{Number(booking.totalPrice || 0).toLocaleString("en-IN")} </strong>
        </div>
        <div className="confirmation-payment">
          <div className="confirmation-payment-item">
            <span>Payment Status</span>
            <strong
              className={
                booking.paymentStatus === "Paid"
                  ? "confirmation-payment-paid"
                  : "confirmation-payment-pending"
              }
            >
              {booking.paymentStatus || "Pending"}
            </strong>
          </div>
          <div className="confirmation-payment-item">
            <span>Payment Method</span>
            <strong>
              {booking.paymentMethod || "Not Paid"}
            </strong>
          </div>
        </div>
        <div className="confirmation-status">
        <div className="confirmation-status-item">
            <span>Booking Status</span>
            <strong
              className={
                booking.status === "Cancelled"
                  ? "confirmation-status-cancelled"
                  : "confirmation-status-confirmed"
              }
            >
              {booking.status || "Confirmed"}
            </strong>
          </div>
          {booking.status === "Cancelled" && (
            <div className="confirmation-status-item">
              <span>Cancellation Reason</span>
              <strong>
                {booking.cancellationReason || "Cancelled by customer"}
              </strong>
            </div>
          )}
          {booking.status === "Cancelled" &&
            booking.refundAmount > 0 && (
              <div className="confirmation-status-item">
                <span>Refund Status</span>
                <strong>
                  {booking.refundStatus || "Refund Completed"}
                </strong>
              </div>
            )}
        </div>
        {/* Button */}
        <div className="confirmation-actions">
          <button
            className="confirmation-details-btn"
            onClick={() =>
              navigate(`/my-booking-details/${booking.bookingId}`)
            }
          >
            View Booking Details
          </button>
          <button
            className="confirmation-bookings-btn"
            onClick={() => navigate("/my-bookings")}
          >
            View My Bookings
          </button>
          <button
            className="confirmation-home-btn"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </section>
    </main>
  );
}

export default BookingConformation