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
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(
      (booking) => booking.status !== "Cancelled"
    ).length;
    const cancelledBookings = bookings.filter(
      (booking) => booking.status === "Cancelled"
    ).length;
    const paidBookings = bookings.filter(
      (booking) => booking.paymentStatus === "Paid"
    ).length;
    const totalRevenue = bookings.reduce((total, booking) => {
      if (booking.paymentStatus === "Paid") {
        return total + Number(booking.totalPrice || 0);
      }
      return total;
    }, 0);
    const totalRefund = bookings.reduce((total, booking) => {
      if (booking.refundStatus === "Refund Completed") {
        return total + Number(booking.refundAmount || 0);
      }
      return total;
    }, 0);
    const netRevenue = totalRevenue - totalRefund;
    const handleStatusChange = (bookingId, newStatus) => {
      const booking = bookings.find(
        (item) => String(item.bookingId) === String(bookingId)
      );
      if (!booking) {
        alert("Booking not found.");
        return;
      }
      // Prevent changing cancelled booking back to confirmed
      if (
        booking.status === "Cancelled" &&
        newStatus !== "Cancelled"
      ) {
        alert("A cancelled booking cannot be changed back to Confirmed.");
        return;
      }
      // Admin cancellation confirmation
      if (
        newStatus === "Cancelled" &&
        booking.status !== "Cancelled"
      ) {
        const confirmCancel = window.confirm(
          "Are you sure you want to cancel this booking?"
        );
        if (!confirmCancel) {
          return;
        }
      }
      let refundStatus = booking.refundStatus || "Not Applicable";
      let refundAmount = Number(booking.refundAmount || 0);
      let refundMethod = booking.refundMethod || "Not Applicable";
      let refundedAt = booking.refundedAt || null;
      // Refund logic for paid booking
      if (
        newStatus === "Cancelled" &&
        booking.paymentStatus === "Paid"
      ) {
        const today = new Date();
        const pickupDate = new Date(booking.pickupDate);
        if (today < pickupDate) {
          refundStatus = "Refund Completed";
          refundAmount = Number(booking.totalPrice || 0);
          refundMethod =
            booking.paymentMethod || "Original Payment Method";
          refundedAt = new Date().toISOString();
        } else {
          refundStatus = "No Refund";
          refundAmount = 0;
          refundMethod = "Not Applicable";
          refundedAt = null;
        }
      }
      // Unpaid cancellation
      if (
        newStatus === "Cancelled" &&
        booking.paymentStatus !== "Paid"
      ) {
        refundStatus = "Not Applicable";
        refundAmount = 0;
        refundMethod = "Not Applicable";
        refundedAt = null;
      }
      const updatedBookings = bookings.map((item) => {
        if (
          String(item.bookingId) !== String(bookingId)
        ) {
          return item;
        }
        return {
          ...item,
          status: newStatus,
          ...(newStatus === "Cancelled" && {
            cancellationReason: "Cancelled by admin",
            cancelledAt: new Date().toISOString(),
            refundStatus: refundStatus,
            refundAmount: refundAmount,
            refundMethod: refundMethod,
            refundedAt: refundedAt
          })
        };
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
      {/* BOOKING STATISTICS */}
      <section className="admin-bookings-stats-section">
        <div className="admin-bookings-stat-card">
          <span>Total Bookings</span>
          <strong>{totalBookings}</strong>
        </div>
        <div className="admin-bookings-stat-card">
          <span>Confirmed</span>
          <strong>{confirmedBookings}</strong>
        </div>
        <div className="admin-bookings-stat-card">
          <span>Cancelled</span>
          <strong>{cancelledBookings}</strong>
        </div>
        <div className="admin-bookings-stat-card">
          <span>Paid</span>
          <strong>{paidBookings}</strong>
        </div>
      </section>
      {/* FINANCIAL STATISTICS */}
      <section className="admin-bookings-financial-section">
        <div className="admin-bookings-financial-card">
          <span>Total Revenue</span>
          <strong>
            ₹{totalRevenue.toLocaleString("en-IN")}
          </strong>
        </div>
        <div className="admin-bookings-financial-card">
          <span>Total Refund</span>
          <strong>
            ₹{totalRefund.toLocaleString("en-IN")}
          </strong>
        </div>
        <div className="admin-bookings-financial-card">
          <span>Net Revenue</span>
          <strong>
            ₹{netRevenue.toLocaleString("en-IN")}
          </strong>
        </div>
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
            .sort(
              (a, b) =>
                new Date(b.createdAt || 0) -
                new Date(a.createdAt || 0)
            )
            .map((booking) => (
              <div
                className="admin-bookings-card"
                key={booking.bookingId}
              >
                {/* CAR */}
               <div className="admin-bookings-car-section">
               <img
                 src={
                   booking.car?.image ||
                   "/assets/default-car.jpg"
                 }
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
                 {booking.createdAt && (
                   <small className="admin-bookings-created-date">
                     Booked On:{" "}
                     {new Date(booking.createdAt).toLocaleDateString(
                       "en-IN"
                     )}
                   </small>
                 )}
               </div>
             </div>
                {/* CUSTOMER */}
                <div className="admin-bookings-info">
                  <span>Customer</span>
                  <strong>
                    {booking.name || "N/A"}
                  </strong>
                  <p>
                    {booking.email || "N/A"}
                  </p>
                </div>
                {/* DATE */}
                <div className="admin-bookings-info">
                  <span>Rental Dates</span>
                  <strong>
                    {booking.pickupDate
                      ? new Date(booking.pickupDate).toLocaleDateString("en-IN")
                      : "N/A"}
                  </strong>
                  <p>
                    to{" "}
                    {booking.returnDate
                      ? new Date(booking.returnDate).toLocaleDateString("en-IN")
                      : "N/A"}
                  </p>
                </div>
                {/* AMOUNT & FINANCIAL DETAILS */}
                <div className="admin-bookings-amount-section">               
                  <div className="admin-bookings-info">
                    <span>Total Amount</span>
                    <strong>
                      ₹
                      {Number(
                        booking.totalPrice || 0
                      ).toLocaleString("en-IN")}
                    </strong>
                  </div>                
                  <div className="admin-bookings-financial-row">
                    <span>Payment</span>
                    <strong>
                      {booking.paymentStatus || "Pending"}
                    </strong>
                  </div>               
                  <div className="admin-bookings-financial-row">
                    <span>Refund</span>
                    <strong>
                      ₹
                      {Number(
                        booking.refundAmount || 0
                      ).toLocaleString("en-IN")}
                    </strong>
                  </div>                
                  <div className="admin-bookings-financial-row">
                    <span>Net Amount</span>
                    <strong>
                      ₹
                      {(
                        booking.paymentStatus === "Paid"
                          ? Number(booking.totalPrice || 0) -
                            Number(booking.refundAmount || 0)
                          : 0
                      ).toLocaleString("en-IN")}
                    </strong>
                  </div>                
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
                {/* REFUND */}
                {booking.status === "Cancelled" && (
                  <div className="admin-bookings-refund-section">
                    <span
                      className={
                        booking.refundStatus === "Refund Completed"
                          ? "admin-bookings-refund admin-bookings-refund-completed"
                          : booking.refundStatus === "No Refund"
                          ? "admin-bookings-refund admin-bookings-refund-none"
                          : "admin-bookings-refund admin-bookings-refund-pending"
                      }
                    >
                      Refund: {booking.refundStatus || "Not Applicable"}
                    </span>
                    {Number(booking.refundAmount || 0) > 0 && (
                      <span className="admin-bookings-refund-amount">
                        ₹
                        {Number(booking.refundAmount || 0).toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    )}
                  </div>
                )}
                {/* ACTIONS */}
                <div className="admin-bookings-actions">
                  <button
                    type="button"
                    className="admin-bookings-details-btn"
                    onClick={() =>
                      navigate(
                        `/admin/booking/${booking.bookingId}`
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