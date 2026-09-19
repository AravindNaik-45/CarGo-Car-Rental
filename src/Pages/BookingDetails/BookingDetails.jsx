import { useEffect, useState } from "react";
import "./BookingDetails.css";
import { useNavigate, useParams } from "react-router-dom";

const BookingDetails = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const handlePrintReceipt = () => {
        window.print();
    };
    const handleCancelBooking = (bookingId) => {
      const savedBookings =
        JSON.parse(localStorage.getItem("cargoBookings")) || [];
      const booking = savedBookings.find(
        (item) =>
          String(item.bookingId) === String(bookingId)
      );
      if (!booking) {
        alert("Booking not found.");
        return;
      }
      if (booking.status === "Cancelled") {
        alert("This booking is already cancelled.");
        return;
      }
      const today = new Date();
      const returnDate = new Date(booking.returnDate);
      if (today >= returnDate) {
        alert(
          "This booking cannot be cancelled after the return date."
        );
        return;
      }
      const confirmCancel = window.confirm(
        "Are you sure you want to cancel this booking?"
      );
      if (!confirmCancel) return;
      let refundStatus = "Not Applicable";
      let refundAmount = 0;
      if (booking.paymentStatus === "Paid") {
        const pickupDate = new Date(booking.pickupDate);
        if (today < pickupDate) {
          refundStatus = "Refund Completed";
          refundAmount = Number(booking.totalPrice || 0);
        } else {
          refundStatus = "No Refund";
        }
      }
      const updatedBookings = savedBookings.map(
        (item) => {
          if (
            String(item.bookingId) !==
            String(bookingId)
          ) {
            return item;
          }
          return {
            ...item,
            status: "Cancelled",
            cancellationReason:
              "Cancelled by customer",
            cancelledAt:
              new Date().toISOString(),
            refundStatus: refundStatus,
            refundAmount: refundAmount,
            refundMethod:
              refundAmount > 0
                ? item.paymentMethod ||
                  "Original Payment Method"
                : "Not Applicable",
            refundedAt:
              refundAmount > 0
                ? new Date().toISOString()
                : null
          };
        }
      );
      localStorage.setItem(
        "cargoBookings",
        JSON.stringify(updatedBookings)
      );
      navigate("/my-bookings");
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
              src={booking.car?.image || "/assets/default-car.jpg"}
              alt={booking.car?.name || "Car"}
            />
          </div>
          <div className="booking-details-car-info">
            <p className="booking-details-category">
               {booking.car?.category || "Car"}
             </p>
             <h2>{booking.car?.name || "Unknown Car"}</h2>
            <p>
              ⭐ {booking.car?.rating || "N/A"} &nbsp; | &nbsp;
              {booking.car?.seats || "N/A"} Seats &nbsp; | &nbsp;
              {booking.car?.transmission || "N/A"}
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
            {booking.status === "Cancelled" ? (
              <p className="booking-details-action-message">
                This booking has been cancelled.
              </p>
            ) : new Date() >= new Date(booking.returnDate) ? (
              <p className="booking-details-action-message">
                This rental period has ended.
              </p>
            ) : booking.paymentStatus === "Paid" ? (
              <p className="booking-details-action-message">
                Payment completed. You can cancel this booking before the rental period ends.
              </p>
            ) : (
              <p className="booking-details-action-message">
                Payment is pending. You can complete payment or cancel this booking.
              </p>
            )}
          </div>
        </div>
        <div className="booking-details-id-section">
          <span>Booking ID</span>
          <strong>{booking.bookingId || "N/A"}</strong>
        </div>
        {booking.createdAt && (
          <div className="booking-details-created-section">
            <span>Booked On</span>    
            <strong>
              {new Date(booking.createdAt).toLocaleString()}
            </strong>
          </div>
        )}
        {/* Booking Timeline */}
        <div className="booking-details-timeline">
          <div className="booking-details-timeline-title">
            Booking Timeline
          </div>
          <div className="booking-details-timeline-item">
            <div className="booking-details-timeline-dot">
              ✓
            </div>
            <div className="booking-details-timeline-content">
              <strong>Booking Created</strong>
              <span>
                {booking.createdAt
                  ? new Date(booking.createdAt).toLocaleString("en-IN")
                  : "N/A"}
              </span>
            </div>
          </div>
        {/* Payment Timeline */}
        <div className="booking-details-timeline-line"></div>
        <div className="booking-details-timeline-item">
          <div
            className={
              booking.paymentStatus === "Paid"
                ? "booking-details-timeline-dot"
                : "booking-details-timeline-dot booking-details-timeline-pending"
            }
          >
            {booking.paymentStatus === "Paid" ? "✓" : "!"}
          </div>
          <div className="booking-details-timeline-content">
            <strong>
              {booking.paymentStatus === "Paid"
                ? "Payment Completed"
                : "Payment Pending"}
            </strong>
            <span>
              {booking.paymentStatus === "Paid"
                ? `Paid via ${booking.paymentMethod || "Online"}`
                : "Complete payment to confirm payment status"}
            </span>
          </div>
        </div>
        {/* Booking Status Timeline */}
        <div className="booking-details-timeline-line"></div>
        <div className="booking-details-timeline-item">
          <div
            className={
              booking.status === "Cancelled"
                ? "booking-details-timeline-dot booking-details-timeline-cancelled"
                : "booking-details-timeline-dot"
            }
          >
            {booking.status === "Cancelled" ? "!" : "✓"}
          </div>
          <div className="booking-details-timeline-content">
            <strong>
              {booking.status === "Cancelled"
                ? "Booking Cancelled"
                : "Booking Confirmed"}
            </strong>
            <span>
              {booking.status === "Cancelled"
                ? "This booking is cancelled"
                : "Your car booking is confirmed"}
            </span>
          </div>
        </div>
        </div>
        {/* ADD REFUND INFORMATION HERE */}
        {booking.status === "Cancelled" &&
          booking.paymentStatus === "Paid" && (
            <div className="booking-details-refund-section">
              <div className="booking-details-refund-item">
                <span>Refund Status</span>
                <strong
                  className={
                    booking.refundStatus === "Refund Completed"
                    ? "booking-details-refund-completed"
                    : "booking-details-refund-pending"
                  }
                  >
                  {booking.refundStatus || "Refund Pending"}
                </strong>
              </div>
              <div className="booking-details-refund-item">
                <span>Refund Amount</span>        
                <strong>
                  ₹{Number(
                    booking.refundAmount || 0
                  ).toLocaleString("en-IN")}
                </strong>
              </div>
              <div className="booking-details-refund-item">
                <span>Refund Method</span>
                <strong>
                  {booking.refundMethod || "Not Applicable"}
                </strong>
              </div>
            </div>
          )}
          <div className="booking-details-payment-section">
            <div className="booking-details-payment-item">
              <span>Payment Status</span>
              <strong
                className={
                  booking.paymentStatus === "Paid"
                    ? "booking-details-payment-paid"
                    : "booking-details-payment-pending"
                }>
                {booking.paymentStatus || "Pending"}
              </strong>
            </div>
            <div className="booking-details-payment-item">
              <span>Payment Method</span>
              <strong>
                {booking.paymentMethod || "Not Paid"}
              </strong>
            </div>
          </div>
        <div className="booking-details-information">
          <h3>Customer Information</h3>
          <div className="booking-details-grid">
            <div className="booking-details-item">
              <span>Customer Name</span>
              <strong>{booking.name || "N/A"}</strong>
            </div>
            <div className="booking-details-item">
              <span>Email</span>
              <strong>{booking.email || "N/A"}</strong>
            </div>
            <div className="booking-details-item">
              <span>Phone</span>
              <strong>{booking.phone || "N/A"}</strong>
            </div>
            <div className="booking-details-item">
              <span>Pickup Location</span>
              <strong>{booking.location || "N/A"}</strong>
            </div>
          </div>
        </div>
        <div className="booking-details-information">
          <h3>Rental Information</h3>
          <div className="booking-details-grid">
            <div className="booking-details-item">
              <span>Pickup Date</span>
              <strong>
                {booking.pickupDate
                  ? new Date(booking.pickupDate).toLocaleDateString("en-IN")
                  : "N/A"}
              </strong>
            </div>
            <div className="booking-details-item">
              <span>Return Date</span>
              <strong>
                {booking.returnDate
                  ? new Date(booking.returnDate).toLocaleDateString("en-IN")
                  : "N/A"}
              </strong>
            </div>
            <div className="booking-details-item">
              <span>Rental Days</span>
              <strong>
                {Number(booking.rentalDays || 0)}{" "}
                {Number(booking.rentalDays || 0) === 1
                  ? "Day"
                  : "Days"}</strong>
            </div>
            <div className="booking-details-item">
              <span>Price Per Day</span>
              <strong>₹{Number(booking.car?.price || 0).toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </div>
        <div className="booking-details-total-section">
          <span>Total Amount</span>
          <strong>₹{Number(booking.totalPrice || 0).toLocaleString("en-IN")}</strong>
        </div>
        <div className="booking-details-action-buttons">
          {booking.status !== "Cancelled" &&
          booking.paymentStatus !== "Paid" &&
          new Date() < new Date(booking.returnDate) && (
            <button
              type="button"
              className="booking-details-payment-btn"
              onClick={() =>
                navigate(`/payment/${booking.bookingId}`)
              }
            >
              💳 Make Payment
            </button>
          )}
          {booking.status !== "Cancelled" &&
           new Date() < new Date(booking.returnDate) && (
            <button
              type="button"
              className="booking-details-cancel-btn"
              onClick={() =>
                handleCancelBooking(booking.bookingId)
              }
            >
              Cancel Booking
            </button>
          )}
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