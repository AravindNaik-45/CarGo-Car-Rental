import { useState } from "react";
import "./MyBooking.css";
import { useNavigate } from "react-router-dom";

const MyBooking = () => {
  const [bookingFilter, setBookingFilter] = useState("All");
  const navigate = useNavigate();
  // Get bookings from localStorage
  const savedBookings =
    JSON.parse(localStorage.getItem("cargoBookings")) || [];
  // Sort bookings: newest booking first
  const sortedBookings = [...savedBookings].sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    );
  // Filter bookings for display
  const filteredBookings = sortedBookings.filter((booking) => {
    if (bookingFilter === "All") {
      return true;
    }
    if (bookingFilter === "Confirmed") {
      return booking.status !== "Cancelled";
    }
    if (bookingFilter === "Cancelled") {
      return booking.status === "Cancelled";
    }
    return true;
  });
  // Cancel booking
  // Update original saved bookings
  const handleCancelBooking = (bookingId) => {
  const booking = savedBookings.find(
    (item) => String(item.bookingId) === String(bookingId)
  );
  if (!booking) {
    alert("Booking not found.");
    return;
  }
  // Prevent cancelling an already cancelled booking
  if (booking.status === "Cancelled") {
    alert("This booking is already cancelled.");
    return;
  }
  const today = new Date();
  const returnDate = new Date(booking.returnDate);
  // Prevent cancellation after rental period
  if (today >= returnDate) {
    alert("This booking cannot be cancelled after the return date.");
    return;
  }
  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this booking?"
  );
  if (!confirmCancel) return;
  let refundStatus = "Not Applicable";
  let refundAmount = 0;
  // Refund logic
  if (booking.paymentStatus === "Paid") {
    const pickupDate = new Date(booking.pickupDate);
    if (today < pickupDate) {
      refundStatus = "Refund Completed";
      refundAmount = Number(booking.totalPrice || 0);
    } else {
      refundStatus = "No Refund";
      refundAmount = 0;
    }
  }
  const updatedBookings = savedBookings.map((item) => {
    if (String(item.bookingId) !== String(bookingId)) {
      return item;
    }
    return {
      ...item,
      status: "Cancelled",
      cancellationReason: "Cancelled by customer",
      cancelledAt: new Date().toISOString(),
      refundStatus: refundStatus,
      refundAmount: refundAmount,
      refundMethod:
        refundAmount > 0
          ? item.paymentMethod || "Original Payment Method"
          : "Not Applicable",
      refundedAt:
        refundAmount > 0
          ? new Date().toISOString()
          : null
    };
  });
  localStorage.setItem(
    "cargoBookings",
    JSON.stringify(updatedBookings)
  );
  window.location.reload();
};
  return (
    <main className="my-bookings-page">
      {/* HEADER */}
      <section className="my-bookings-header">
        <p className="my-bookings-label">CARGO RENTALS</p>
        <h1>My Bookings</h1>
        <p>View all your car rental bookings.</p>
      </section>
      {/* FILTER BUTTONS */}
      <section className="my-booking-filter-section">
        {/* ALL */}
        <button
          type="button"
          className={
            bookingFilter === "All"
              ? "my-booking-filter-btn my-booking-filter-active"
              : "my-booking-filter-btn"
          }
          onClick={() => setBookingFilter("All")}
        >
          All ({savedBookings.length})
        </button>
        {/* CONFIRMED */}
        <button
          type="button"
          className={
            bookingFilter === "Confirmed"
              ? "my-booking-filter-btn my-booking-filter-active"
              : "my-booking-filter-btn"
          }
          onClick={() => setBookingFilter("Confirmed")}
        >
          Confirmed (
          {
            savedBookings.filter(
              (booking) => booking.status !== "Cancelled"
            ).length
          }
          )
        </button>
        {/* CANCELLED */}
        <button
          type="button"
          className={
            bookingFilter === "Cancelled"
              ? "my-booking-filter-btn my-booking-filter-active"
              : "my-booking-filter-btn"
          }
          onClick={() => setBookingFilter("Cancelled")}
        >
          Cancelled (
          {
            savedBookings.filter(
              (booking) => booking.status === "Cancelled"
            ).length
          }
          )
        </button>
      </section>
      {/* BOOKINGS */}
      <section className="my-bookings-container">
        {filteredBookings.length === 0 ? (
          /* EMPTY STATE */
          <div className="my-bookings-empty">
            <h2>
              No {bookingFilter} Bookings </h2>
            <p>
              There are no{" "}
              {bookingFilter.toLowerCase()} bookings
              to display.
            </p>
            <button
              className="my-bookings-browse-btn"
              onClick={() => navigate("/")}
            >
              Browse Cars
            </button>
          </div>
        ) : (
          /* BOOKING LIST */
          filteredBookings.map((booking) => (
            <div
              className="my-booking-card"
              key={booking.bookingId}
            >
              {/* CAR IMAGE */}
              <div className="my-booking-image">
                <img
                  src={booking.car?.image || "/assets/default-car.jpg"}
                  alt={booking.car?.name || "Car"}
                />
              </div>
              {/* BOOKING INFORMATION */}
              <div className="my-booking-information">
                {/* TOP */}
                <div className="my-booking-top">
                  <div>
                    <h2>{booking.car?.name || "Car Details Unavailable"}</h2>
                    <p>{booking.car?.category || "Category Unavailable"}</p>
                  </div>
                  {/* STATUS */}
                 <div className="my-booking-status-section">
                 <span
                   className={
                     booking.status === "Cancelled"
                       ? "my-booking-status my-booking-status-cancelled"
                       : "my-booking-status"
                   }
                 >
                   {booking.status || "Confirmed"}
                 </span>
                <span
                  className={
                    booking.paymentStatus === "Paid"
                      ? "my-booking-payment my-booking-payment-paid"
                      : "my-booking-payment my-booking-payment-pending"
                  }
                >
                  Payment: {booking.paymentStatus || "Pending"}
                </span>
                {booking.status === "Cancelled" && (
                  <span
                    className={
                      booking.refundStatus === "Refund Completed"
                        ? "my-booking-refund my-booking-refund-completed"
                        : booking.refundStatus === "No Refund"
                        ? "my-booking-refund my-booking-refund-none"
                        : "my-booking-refund my-booking-refund-pending"
                    }
                  >
                    Refund: {booking.refundStatus || "Pending"}
                  </span>
                )}
               </div>
                </div>
                {/* BOOKING ID */}
                <div className="my-booking-id">
                  Booking ID:
                  <strong>
                    {booking.bookingId}
                  </strong>
                </div>
                 {/* BOOKED DATE */}
                <p className="my-booking-created-date">
                  Booked On:{" "}
                  {booking.createdAt
                    ? new Date( booking.createdAt )
                    .toLocaleDateString("en-IN")
                    : "N/A"}
                </p>
                {/* BOOKING DETAILS */}
                <div className="my-booking-details">
                  <div>
                    <span>Pickup Location</span>
                    <strong>
                      {booking.location}
                    </strong>
                  </div>
                  <div>
                    <span>Pickup Date</span>
                    <strong>
                      {booking.pickupDate
                        ? new Date(booking.pickupDate).toLocaleDateString("en-IN")
                        : "N/A"}
                    </strong>
                  </div>
                  <div>
                    <span>Return Date</span>
                    <strong>
                      {booking.returnDate
                        ? new Date(booking.returnDate).toLocaleDateString("en-IN")
                        : "N/A"}
                    </strong>
                  </div>
                  <div>
                    <span>Rental Days</span>
                    <strong>
                      {Number(booking.rentalDays || 0)} Days
                    </strong>
                  </div>
                </div>
                {/* BOTTOM */}
                <div className="my-booking-bottom">
                  <div className="my-booking-total">
                    <span>
                      Total Amount
                    </span>
                    <strong>
                      ₹{Number(booking.totalPrice || 0).toLocaleString("en-IN")}
                    </strong>
                  </div>
                  {/* ACTION BUTTON */}
                  <div className="my-booking-action-buttons">
                  {/* VIEW DETAILS */}
                  <button
                    type="button"
                    className="my-booking-view-details-btn"
                    onClick={() =>
                      navigate(`/my-booking-details/${booking.bookingId}`)
                    }
                  >
                    View Details
                  </button>
                  {/* CANCEL BUTTON */}
                  {booking.status !== "Cancelled" && (
                    <button
                      type="button"
                      className="my-booking-cancel-btn"
                      onClick={() =>
                        handleCancelBooking(booking.bookingId)
                      }>
                      Cancel Booking
                    </button>
                  )} 
                 </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default MyBooking;