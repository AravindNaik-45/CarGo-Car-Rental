import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminBookings.css";

const AdminBookings = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState(() => {
      return JSON.parse(localStorage.getItem("cargoBookings")) || [];
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [paymentFilter, setPaymentFilter] = useState("All");
    const handleStatusChange = (bookingId, newStatus) => {
      const updatedBookings = bookings.map((booking) => {
        if (booking.bookingId === bookingId) {
          return {
            ...booking,
            status: newStatus
          };
        }
        return booking;
      });
      localStorage.setItem(
        "cargoBookings",
        JSON.stringify(updatedBookings)
      );
      setBookings(updatedBookings);
    };
    const filteredBookings = bookings.filter((booking) => {
      const searchValue = searchTerm.toLowerCase();
      const matchesSearch =
        String(booking.bookingId)
          .toLowerCase()
          .includes(searchValue) ||
        booking.name
          ?.toLowerCase()
          .includes(searchValue) ||
        booking.car?.name
          ?.toLowerCase()
          .includes(searchValue);
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Confirmed" &&
          booking.status !== "Cancelled") ||
        (statusFilter === "Cancelled" &&
          booking.status === "Cancelled");
      const matchesPayment =
        paymentFilter === "All" ||
        (paymentFilter === "Paid" &&
          booking.paymentStatus === "Paid") ||
        (paymentFilter === "Pending" &&
          booking.paymentStatus !== "Paid");
      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment
      );
    });
  return (
    <main className="admin-bookings-page">
      {/* HEADER */}
      <section className="admin-bookings-header">
        <div>
          <p className="admin-bookings-label">
            CARGO ADMIN
          </p>
          <h1>Booking Management</h1>
          <p>
            Manage customer bookings, statuses and payments.
          </p>
        </div>
        <button
          type="button"
          className="admin-bookings-back-btn"
          onClick={() => navigate("/admin")}
        >
          ← Admin Dashboard
        </button>
      </section>
      {/* FILTER SECTION */}
      <section className="admin-bookings-filter-section">
        <div className="admin-bookings-search-box">
          <label htmlFor="admin-booking-search">
            Search Booking
          </label>
          <input
            id="admin-booking-search"
            type="text"
            placeholder="Search by ID, customer or car..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>
        <div className="admin-bookings-filter-box">
          <label htmlFor="admin-booking-status">
            Booking Status
          </label>
          <select
            id="admin-booking-status"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }>
            <option value="All">All</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="admin-bookings-filter-box">
          <label htmlFor="admin-booking-payment">
            Payment Status
          </label>
          <select
            id="admin-booking-payment"
            value={paymentFilter}
            onChange={(event) =>
              setPaymentFilter(event.target.value)
            }>
            <option value="All">All</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </section>
      {/* BOOKING COUNT */}
      <section className="admin-bookings-count-section">
        <h2>All Bookings</h2>
        <span>
          {filteredBookings.length} Booking(s)
        </span>
      </section>
      {/* BOOKINGS */}
      {filteredBookings.length === 0 ? (
        <div className="admin-bookings-empty">
          <h3>No Bookings Found</h3>
          <p>
            Try changing your search or filter.
          </p>
        </div>
      ) : (
        <section className="admin-bookings-list">
          {filteredBookings
            .slice()
            .reverse()
            .map((booking) => (
              <div
                className="admin-bookings-card"
                key={booking.bookingId}
              >
                {/* CAR */}
                <div className="admin-bookings-car-section">
                  <img
                    src={booking.car?.image}
                    alt={booking.car?.name || "Car"}
                    className="admin-bookings-car-image"
                  />
                  <div>
                    <h3>
                      {booking.car?.name || "Unknown Car"}
                    </h3>
                    <p>
                      Booking ID: {booking.bookingId}
                    </p>
                  </div>
                </div>
                {/* CUSTOMER */}
                <div className="admin-bookings-info">
                  <span>Customer</span>
                  <strong>
                    {booking.name}
                  </strong>
                  <p>
                    {booking.email}
                  </p>
                </div>
                {/* DATE */}
                <div className="admin-bookings-info">
                  <span>Rental Dates</span>
                  <strong>
                    {booking.pickupDate}
                  </strong>
                  <p>
                    to {booking.returnDate}
                  </p>
                </div>
                {/* AMOUNT */}
                <div className="admin-bookings-info">

                  <span>Total Amount</span>
                  <strong>
                    ₹{booking.totalPrice}
                  </strong>
                </div>
                {/* STATUS */}
                <div className="admin-bookings-status-section">
                  <span
                    className={
                      booking.status === "Cancelled"
                        ? "admin-bookings-status admin-bookings-status-cancelled"
                        : "admin-bookings-status"
                    }>
                    {booking.status || "Confirmed"}
                  </span>
                  <span
                    className={
                      booking.paymentStatus === "Paid"
                        ? "admin-bookings-payment admin-bookings-payment-paid"
                        : "admin-bookings-payment"
                    }>
                    {booking.paymentStatus || "Pending"}
                  </span>
                </div>
                {/* ACTIONS */}
                <div className="admin-bookings-actions">
                  <button
                    type="button"
                    className="admin-bookings-details-btn"
                    onClick={() =>
                      navigate(
                        `/my-booking-details/${booking.bookingId}`
                      )
                    }>
                    View Details
                  </button>
                   <select
                     className="admin-bookings-status-select"
                     value={booking.status || "Confirmed"}
                     onChange={(event) =>
                       handleStatusChange(
                         booking.bookingId,
                         event.target.value
                       )
                     }
                   >
                     <option value="Confirmed"> Confirmed </option>       
                     <option value="Cancelled"> Cancelled </option>
                   </select>
                </div>
              </div>
            ))}
        </section>
      )}
    </main>
  )
}

export default AdminBookings