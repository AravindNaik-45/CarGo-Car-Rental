import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./BookingConformation.css"
import { getBookingStatus, getBookingStatusClass } from "../../Utils/bookingStatus";

const BookingConformation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(location.state || null);
  useEffect(() => {
    const loadLatestBooking = () => {
      const savedBookings =
        JSON.parse(localStorage.getItem("cargoBookings")) || []; 
      const bookingId = new URLSearchParams(
        location.search
      ).get("bookingId");
      if (!bookingId) {
        return;
      }
      const savedBooking = savedBookings.find(
        (item) =>
          String(item.bookingId) === String(bookingId)
      );
      if (savedBooking) {
        setBooking(savedBooking);
      }
    };
    loadLatestBooking();
    window.addEventListener(
      "storage",
      loadLatestBooking
    );
    window.addEventListener(
      "cargoBookingsUpdated",
      loadLatestBooking
    );
    return () => {
      window.removeEventListener(
        "storage",
        loadLatestBooking
      );
      window.removeEventListener(
        "cargoBookingsUpdated",
        loadLatestBooking
      );
    };
  }, [location.search]);
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
  const bookingStatus = getBookingStatus(booking);
  const bookingStatusClass =
  getBookingStatusClass(bookingStatus, "confirmation-status"
  );
  return (
    <main className="confirmation-page">
      <section className="confirmation-card">
        {/* Booking Status Icon */}
        <div
          className={
            bookingStatus === "Cancelled"
              ? "confirmation-status-icon confirmation-status-icon-cancelled"
              : "confirmation-success-icon"
          }
        >
          {bookingStatus === "Cancelled" ? "!" : "✓"}
        </div>
        {/* Heading */}
        <h1>
          {bookingStatus === "Cancelled"
          ? "Booking Cancelled"
          : bookingStatus === "Pending Payment"
          ? "Payment Pending"
          : bookingStatus === "Completed"
          ? "Rental Completed"
          : "Booking Confirmed!"}
        </h1>
        <p className="confirmation-message">
          {bookingStatus === "Cancelled"
            ? "This booking has been cancelled."
            : bookingStatus === "Pending Payment"
            ? "Your booking has been created. Complete payment to confirm your rental."
            : bookingStatus === "Completed"
            ? "Your rental period has been completed."
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
            <strong className={bookingStatusClass}>
              {bookingStatus}
            </strong>
          </div>
          {booking.status === "Cancelled" && (
            <>
            <div className="confirmation-status-item">
              <span>Cancellation Reason</span>
              <strong>
                {booking.cancellationReason || "Cancelled by customer"}
              </strong>
            </div>
          <div className="confirmation-status-item">
            <span>Cancelled On</span>
            <strong>
              {booking.cancelledAt
                ? new Date(
                  booking.cancelledAt
                ).toLocaleString("en-IN")
                : "N/A"}
            </strong>
          </div>

              <div className="confirmation-status-item">
              <span>Refund Status</span>
              <strong>
              {booking.refundStatus || "Not Applicable"}
              </strong>
              </div>
              {Number(booking.refundAmount || 0) > 0 && (
                <div className="confirmation-status-item">
                  <span>Refund Amount</span>
                  <strong className="confirmation-refund-amount">
                    ₹
                    {Number(
                      booking.refundAmount
                    ).toLocaleString("en-IN")}
                  </strong>
                </div>
            )}
            </>
          )}
        </div>
          {bookingStatus === "Cancelled" ? (
          <p className="confirmation-action-message confirmation-action-message-cancelled">
            This booking is no longer active. You can view its details or return
            to My Bookings.
          </p>
        ) : bookingStatus === "Pending Payment" ? (
          <p className="confirmation-action-message confirmation-action-message-pending">
            Your booking has been created. Please complete payment to confirm your
            car rental.
          </p>
        ) : bookingStatus === "Completed" ? (
          <p className="confirmation-action-message">
            This rental has been completed. You can view the booking details from
            the button below.
          </p>
        ) : (
          <p className="confirmation-action-message">
            Your booking is active. You can view the complete booking details from
            the button below.
          </p>
        )}
        {/* Button */}
        <div className="confirmation-actions">
          <button
            type="button"
            className="confirmation-details-btn"
            onClick={() =>
              navigate(`/my-booking-details/${booking.bookingId}`)
            }
          >
            View Booking Details
          </button>
          <button
            type="button"
            className="confirmation-bookings-btn"
            onClick={() => navigate("/my-bookings")}
          >
            View My Bookings
          </button>
          <button
            type="button"
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