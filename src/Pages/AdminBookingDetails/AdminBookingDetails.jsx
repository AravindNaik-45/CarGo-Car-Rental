import { useNavigate, useParams } from "react-router-dom";
import "./AdminBookingDetails.css";

const AdminBookingDetails = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const bookings =
    JSON.parse(localStorage.getItem("cargoBookings")) || [];
  const booking = bookings.find(
    (item) =>
      String(item.bookingId) === String(bookingId)
  );
  if (!booking) {
    return (
      <main className="admin-booking-details-page">
        <div className="admin-booking-details-not-found">
          <h2>Booking Not Found</h2>
          <p>The requested booking could not be found.</p>
          <button
            type="button"
            onClick={() =>
              navigate("/admin/bookings")
            }
          >
            ← Back to Bookings
          </button>
        </div>
      </main>
    );
  }
  return (
    <main className="admin-booking-details-page">
      {/* HEADER */}
      <section className="admin-booking-details-header">
        <div>
          <p className="admin-booking-details-label">
            CARGO ADMIN
          </p>
          <h1>Booking Details</h1>
          <p>
            View complete booking information.
          </p>
        </div>
        <button
          type="button"
          className="admin-booking-details-back-btn"
          onClick={() =>
            navigate("/admin/bookings")
          }
        >
          ← Booking Management
        </button>
      </section>
      {/* BOOKING SUMMARY */}
      <section className="admin-booking-details-card">
        <div className="admin-booking-details-title">
          <div>
            <h2>
              {booking.car?.name || "Unknown Car"}
            </h2>
            <p>
              Booking ID: {booking.bookingId}
            </p>
          </div>
          <span
            className={
              booking.status === "Cancelled"
                ? "admin-booking-details-status admin-booking-details-status-cancelled"
                : "admin-booking-details-status"
            }
          >
            {booking.status || "Confirmed"}
          </span>
        </div>
        {/* CAR INFORMATION */}
        <div className="admin-booking-details-section">
          <h3>Car Information</h3>
          <div className="admin-booking-details-grid">
            <div>
              <span>Car Name</span>
              <strong>
                {booking.car?.name || "N/A"}
              </strong>
            </div>
            <div>
              <span>Category</span>
              <strong>
                {booking.car?.category || "N/A"}
              </strong>
            </div>
            <div>
              <span>Seats</span>
              <strong>
                {booking.car?.seats || "N/A"}
              </strong>
            </div>
            <div>
              <span>Transmission</span>
              <strong>
                {booking.car?.transmission || "N/A"}
              </strong>
            </div>
          </div>
        </div>
        {/* CUSTOMER INFORMATION */}
        <div className="admin-booking-details-section">
          <h3>Customer Information</h3>
          <div className="admin-booking-details-grid">
            <div>
              <span>Name</span>
              <strong>
                {booking.name || "N/A"}
              </strong>
            </div>
            <div>
              <span>Email</span>
              <strong>
                {booking.email || "N/A"}
              </strong>
            </div>
            <div>
              <span>Phone</span>
              <strong>
                {booking.phone || "N/A"}
              </strong>
            </div>
            <div>
              <span>Location</span>
              <strong>
                {booking.location || "N/A"}
              </strong>
            </div>
          </div>
        </div>
        {/* RENTAL INFORMATION */}
        <div className="admin-booking-details-section">
          <h3>Rental Information</h3>
          <div className="admin-booking-details-grid">
            <div>
              <span>Pickup Date</span>
              <strong>
                {booking.pickupDate
                  ? new Date(
                      booking.pickupDate
                    ).toLocaleDateString("en-IN")
                  : "N/A"}
              </strong>
            </div>
            <div>
              <span>Return Date</span>
              <strong>
                {booking.returnDate
                  ? new Date(
                      booking.returnDate
                    ).toLocaleDateString("en-IN")
                  : "N/A"}
              </strong>
            </div>
            <div>
              <span>Rental Days</span>
              <strong>
                {Number(
                  booking.rentalDays || 0
                )}{" "}
                Days
              </strong>
            </div>
            <div>
              <span>Booked On</span>
              <strong>
                {booking.createdAt
                  ? new Date(
                      booking.createdAt
                    ).toLocaleDateString("en-IN")
                  : "N/A"}
              </strong>
            </div>
          </div>
        </div>
        {/* PAYMENT INFORMATION */}
        <div className="admin-booking-details-section">
          <h3>Payment Information</h3>
          <div className="admin-booking-details-grid">
            <div>
              <span>Total Amount</span>
              <strong>
                ₹
                {Number(
                  booking.totalPrice || 0
                ).toLocaleString("en-IN")}
              </strong>
            </div>
            <div>
              <span>Payment Status</span>
              <strong>
                {booking.paymentStatus || "Pending"}
              </strong>
            </div>
            <div>
              <span>Payment Method</span>
              <strong>
                {booking.paymentMethod || "Not Paid"}
              </strong>
            </div>
            <div>
              <span>Net Amount</span>
              <strong>
                ₹
                {(
                  booking.paymentStatus === "Paid"
                    ? Number(
                        booking.totalPrice || 0
                      ) -
                      Number(
                        booking.refundAmount || 0
                      )
                    : 0
                ).toLocaleString("en-IN")}
              </strong>
            </div>
          </div>
        </div>
        {/* REFUND INFORMATION */}
        {booking.status === "Cancelled" && (
          <div className="admin-booking-details-section">
            <h3>Cancellation & Refund</h3>
            <div className="admin-booking-details-grid">
              <div>
                <span>Cancellation Reason</span>
                <strong>
                  {booking.cancellationReason ||
                    "Not Available"}
                </strong>
              </div>
              <div>
                <span>Refund Status</span>
                <strong>
                  {booking.refundStatus ||
                    "Not Applicable"}
                </strong>
              </div>
              <div>
                <span>Refund Amount</span>
                <strong>
                  ₹
                  {Number(
                    booking.refundAmount || 0
                  ).toLocaleString("en-IN")}
                </strong>
              </div>
              <div>
                <span>Refund Method</span>
                <strong>
                  {booking.refundMethod ||
                    "Not Applicable"}
                </strong>
              </div>
            </div>
          </div>
        )}
        {/* ACTION */}
        <div className="admin-booking-details-actions">
          <button
            type="button"
            onClick={() =>
              navigate("/admin/bookings")
            }
          >
            ← Back to Booking Management
          </button>
        </div>
      </section>
    </main>
  );
};

export default AdminBookingDetails;