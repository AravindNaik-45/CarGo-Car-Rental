import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const bookings =
      JSON.parse(localStorage.getItem("cargoBookings")) || [];
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(
      (booking) => booking.status !== "Cancelled"
    ).length;
    const cancelledBookings = bookings.filter(
      (booking) => booking.status === "Cancelled"
    ).length;
    const totalRevenue = useMemo(() => {
      return bookings
        .filter((booking) => booking.status !== "Cancelled")
        .reduce(
          (total, booking) =>
            total + Number(booking.totalPrice || 0), 0
        );
    }, [bookings]);
    const paidBookings = bookings.filter(
      (booking) => booking.paymentStatus === "Paid"
    ).length;
    const pendingPayments = bookings.filter(
      (booking) => booking.paymentStatus !== "Paid"
    ).length;
  return (
    <main className="admin-dashboard-page">
      {/* HEADER */}
      <section className="admin-dashboard-header">
        <div>
          <p className="admin-dashboard-label">
            CARGO ADMIN
          </p>
          <h1>Admin Dashboard</h1>
          <p>
            Monitor bookings, payments and rental
            performance.
          </p>
        </div>
        <button
          type="button"
          className="admin-dashboard-home-btn"
          onClick={() => navigate("/")}
        >
          Back to Website
        </button>
        <button
          type="button"
          className="admin-dashboard-cars-btn"
          onClick={() => navigate("/admin/cars")}
        >
          🚗 Manage Cars
        </button>
      </section>
      {/* STATISTICS */}
      <section className="admin-dashboard-stat-grid">
        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-icon">
            📋
          </div>
          <div>
            <span>Total Bookings</span>
            <strong>{totalBookings}</strong>
          </div>
        </div>
        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-icon">
            ✅
          </div>
          <div>
            <span>Confirmed</span>
            <strong>{confirmedBookings}</strong>
          </div>
        </div>
        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-icon">
            ❌
          </div>
          <div>
            <span>Cancelled</span>
            <strong>{cancelledBookings}</strong>
          </div>
        </div>
        <div className="admin-dashboard-stat-card">
          <div className="admin-dashboard-stat-icon">
            💰
          </div>
          <div>
            <span>Total Revenue</span>
            <strong>₹{totalRevenue}</strong>
          </div>
        </div>
      </section>
      {/* PAYMENT STATISTICS */}
      <section className="admin-dashboard-payment-section">
        <h2>Payment Overview</h2>
        <div className="admin-dashboard-payment-grid">
          <div className="admin-dashboard-payment-card">
            <span>Paid Bookings</span>
            <strong>{paidBookings}</strong>
          </div>
          <div className="admin-dashboard-payment-card">
            <span>Pending Payments</span>
            <strong>{pendingPayments}</strong>
          </div>
        </div>
      </section>
      {/* RECENT BOOKINGS */}
      <section className="admin-dashboard-bookings-section">
        <div className="admin-dashboard-section-heading">
          <div>
            <p>BOOKING MANAGEMENT</p>
            <h2>Recent Bookings</h2>
          </div>
          <span>
            {totalBookings} Total
          </span>
        </div>
        {bookings.length === 0 ? (
          <div className="admin-dashboard-empty">
            <h3>No Bookings Yet</h3>
            <p>
              Customer bookings will appear here.
            </p>
          </div>
        ) : (
          <div className="admin-dashboard-table-wrapper">
            <table className="admin-dashboard-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Car</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {bookings
                  .slice()
                  .reverse()
                  .map((booking) => (
                    <tr key={booking.bookingId}>
                      <td>
                        <strong>
                          {booking.bookingId}
                        </strong>
                      </td>
                      <td>
                        {booking.name}
                      </td>
                      <td>
                        {booking.car?.name || "N/A"}
                      </td>
                      <td>
                        {booking.pickupDate}
                      </td>
                      <td>
                        ₹{booking.totalPrice}
                      </td>
                      <td>
                        <span
                          className={
                            booking.status ===
                            "Cancelled"
                              ? "admin-dashboard-status admin-dashboard-status-cancelled"
                              : "admin-dashboard-status"
                          }>
                          {booking.status ||
                            "Confirmed"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={
                            booking.paymentStatus ===
                            "Paid"
                              ? "admin-dashboard-payment-status admin-dashboard-payment-paid"
                              : "admin-dashboard-payment-status"
                          }>
                          {booking.paymentStatus ||
                            "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )}

export default AdminDashboard