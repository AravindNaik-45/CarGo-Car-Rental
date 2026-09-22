import { useState } from "react";
import "./MyBooking.css";
import { useNavigate } from "react-router-dom";
import {
  getBookingStatus,
  getBookingStatusClass
} from "../../Utils/bookingStatus";

const MyBooking = () => {
  const [bookingFilter, setBookingFilter] = useState("All");
  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingDateFilter, setBookingDateFilter] = useState("All");
  const handleResetBookingFilters = () => {
    setBookingSearch("");
    setBookingFilter("All");
    setBookingDateFilter("All");
  };
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
  const totalBookingsCount = savedBookings.length;
  const pendingPaymentCount = savedBookings.filter(
    (booking) =>
      getBookingStatus(booking) === "Pending Payment"
  ).length;
  const confirmedBookingsCount = savedBookings.filter(
    (booking) =>
      getBookingStatus(booking) === "Confirmed"
  ).length;
  const completedBookingsCount = savedBookings.filter(
    (booking) =>
      getBookingStatus(booking) === "Completed"
  ).length;
  const cancelledBookingsCount = savedBookings.filter(
    (booking) =>
      getBookingStatus(booking) === "Cancelled"
  ).length;
  const  totalBookingValue = savedBookings.reduce(
    (total, booking) =>
      total + Number(booking.totalPrice || 0),
    0
  );
  const paidAmount = savedBookings
    .filter(
      (booking) => booking.paymentStatus === "Paid"
    )
    .reduce(
      (total, booking) =>
        total + Number(booking.totalPrice || 0),
      0
    );
  const refundedAmount = savedBookings.reduce(
    (total, booking) =>
      total + Number(booking.refundAmount || 0),
    0
  );
  const netSpent =
    paidAmount - refundedAmount;
  const activeAmount = savedBookings
    .filter((booking) => {
      const status = getBookingStatus(booking);
      return (
        status === "Pending Payment" ||
        status === "Confirmed"
      );
    })
    .reduce(
      (total, booking) =>
        total + Number(booking.totalPrice || 0),
      0
    );
  // Filter bookings for display
  const filteredBookings = sortedBookings.filter((booking) => {
  const bookingStatus = getBookingStatus(booking);
  const searchValue = bookingSearch.trim().toLowerCase();
  const matchesSearch =
    String(booking.bookingId || "")
      .toLowerCase()
      .includes(searchValue) ||
    String(booking.car?.name || "")
      .toLowerCase()
      .includes(searchValue) ||
    String(booking.name || "")
      .toLowerCase()
      .includes(searchValue) ||
    String(booking.email || "")
      .toLowerCase()
      .includes(searchValue);
    if (!matchesSearch) {
      return false;
    }
  // DATE FILTER
    const pickupDate = booking.pickupDate
      ? new Date(booking.pickupDate)
      : null;
    const returnDate = booking.returnDate
      ? new Date(booking.returnDate)
      : null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (pickupDate) {
      pickupDate.setHours(0, 0, 0, 0);
    }
    if (returnDate) {
      returnDate.setHours(0, 0, 0, 0);
    }
    let matchesDate = true;
    if (bookingDateFilter === "Today") {
      matchesDate =
        pickupDate &&
        pickupDate.getTime() === today.getTime();
    }
    if (bookingDateFilter === "Upcoming") {
      matchesDate =
        pickupDate &&
        pickupDate > today;
    }
    if (bookingDateFilter === "Past") {
      matchesDate =
        returnDate &&
        returnDate < today;
    }
    if (bookingDateFilter === "Active") {
      matchesDate =
        pickupDate &&
        returnDate &&
        pickupDate <= today &&
        returnDate >= today;
    }
    if (!matchesDate) {
      return false;
    }
    // STATUS FILTER
    if (bookingFilter === "All") {
      return true;
    }
    if (bookingFilter === "Pending Payment") {
      return bookingStatus === "Pending Payment";
    }
    if (bookingFilter === "Confirmed") {
      return bookingStatus === "Confirmed";
    }
    if (bookingFilter === "Completed") {
      return bookingStatus === "Completed";
    }
    if (bookingFilter === "Cancelled") {
      return bookingStatus === "Cancelled";
    }
    return true;
  });
  // Cancel booking
  const handleCancelBooking = (bookingId) => {
    const booking = savedBookings.find(
      (item) =>
        String(item.bookingId) === String(bookingId)
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
      alert(
        "This booking cannot be cancelled after the return date."
      );
      return;
    }
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmCancel) {
      return;
    }
    let refundStatus = "Not Applicable";
    let refundAmount = 0;
    // Refund logic
    if (booking.paymentStatus === "Paid") {
      const pickupDate = new Date(booking.pickupDate);
      if (today < pickupDate) {
        refundStatus = "Refund Completed";
        refundAmount = Number(
          booking.totalPrice || 0
        );
      } else {
        refundStatus = "No Refund";
        refundAmount = 0;
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
          cancelledAt: new Date().toISOString(),
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
    window.dispatchEvent(
      new Event("cargoBookingsUpdated")
    );
    window.location.reload();
  };
  // Export bookings as CSV
  const handleExportBookings = () => {
    if (savedBookings.length === 0) {
      alert("No bookings available to export.");
      return;
    }
    const headers = [
      "Booking ID",
      "Car Name",
      "Status",
      "Payment Status",
      "Pickup Location",
      "Pickup Date",
      "Return Date",
      "Rental Days",
      "Total Amount",
      "Booked On"
    ];
    const rows = savedBookings.map((booking) => [
      booking.bookingId || "",
      booking.car?.name || "Car Details Unavailable",
      getBookingStatus(booking),
      booking.paymentStatus || "Pending",
      booking.location || "",
      booking.pickupDate || "",
      booking.returnDate || "",
      Number(booking.rentalDays || 0),
      Number(booking.totalPrice || 0),
      booking.createdAt
        ? new Date(
            booking.createdAt
          ).toLocaleDateString("en-IN")
        : ""
    ]);
    const csvContent = [
      headers,
      ...rows
    ]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");
    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;"
      }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cargo-my-bookings.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return (
    <main className="my-bookings-page">
      {/* HEADER */}
      <section className="my-bookings-header">
        <p className="my-bookings-label">
          CARGO RENTALS
        </p>
        <h1>My Bookings</h1>
        <p>
          View all your car rental bookings.
        </p>
      </section>
      <div className="my-booking-summary">
        <div className="my-booking-summary-card">
          <span className="my-booking-summary-label">
            Total Bookings
          </span>
          <strong className="my-booking-summary-number">
            {totalBookingsCount}
          </strong>
        </div>
        <div className="my-booking-summary-card">
          <span className="my-booking-summary-label">
            Pending Payment
          </span>
          <strong className="my-booking-summary-number">
            {pendingPaymentCount}
          </strong>
        </div>
        <div className="my-booking-summary-card">
          <span className="my-booking-summary-label">
            Confirmed
          </span>
          <strong className="my-booking-summary-number">
            {confirmedBookingsCount}
          </strong>
        </div>
        <div className="my-booking-summary-card">
          <span className="my-booking-summary-label">
            Completed
          </span>
          <strong className="my-booking-summary-number">
            {completedBookingsCount}
          </strong>
        </div>
        <div className="my-booking-summary-card">
          <span className="my-booking-summary-label">
            Cancelled
          </span>
          <strong className="my-booking-summary-number">
            {cancelledBookingsCount}
          </strong>
        </div>
        <div className="my-booking-summary-card my-booking-financial-card">
          <span className="my-booking-summary-label">
            Total Booking Value
          </span>
          <strong className="my-booking-summary-number">
            ₹{totalBookingValue.toLocaleString("en-IN")}
          </strong>
        </div>
        <div className="my-booking-summary-card my-booking-financial-card">
          <span className="my-booking-summary-label">
            Paid Amount
          </span>
          <strong className="my-booking-summary-number">
            ₹{paidAmount.toLocaleString("en-IN")}
          </strong>
        </div>
        <div className="my-booking-summary-card my-booking-financial-card">
          <span className="my-booking-summary-label">
            Refunded Amount
          </span>
          <strong className="my-booking-summary-number">
            ₹{refundedAmount.toLocaleString("en-IN")}
          </strong>
        </div>
        <div className="my-booking-summary-card my-booking-financial-card">
          <span className="my-booking-summary-label">
            Net Spent
          </span>     
          <strong className="my-booking-summary-number">
            ₹{netSpent.toLocaleString("en-IN")}
          </strong>
        </div>
      </div>
      {/* SEARCH BOOKINGS */}
      <div className="my-booking-search">
        <input
          type="text"
          value={bookingSearch}
          onChange={(event) =>
            setBookingSearch(event.target.value)
          }
          placeholder="Search by booking ID, car name, name or email"
          className="my-booking-search-input"
        />
        {bookingSearch && (
          <button
            type="button"
            className="my-booking-search-clear"
            onClick={() => setBookingSearch("")}
          >
            Clear
          </button>
        )}
      </div>
      <div className="my-booking-export-section">
        <button
          type="button"
          className="my-booking-export-btn"
          onClick={handleExportBookings}
        >
          📥 Export Bookings
        </button>
      </div>
      <div className="my-booking-date-filter-section">
        <span className="my-booking-date-filter-label">
          Booking Date:
        </span>
        <select
          value={bookingDateFilter}
          onChange={(event) =>
            setBookingDateFilter(event.target.value)
          }
          className="my-booking-date-filter-select"
        >
          <option value="All">All Dates</option>
          <option value="Today">Today</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Past">Past</option>
          <option value="Active">Active Today</option>
        </select>
      </div>
      <div className="my-booking-reset-filter-section">
        <button
          type="button"
          className="my-booking-reset-filter-btn"
          onClick={handleResetBookingFilters}
        >
          Reset Filters
        </button>
      </div>
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
          onClick={() =>
            setBookingFilter("All")
          }
        >
          All ({savedBookings.length})
        </button>
        {/* PENDING PAYMENT */}
        <button
          type="button"
          className={
            bookingFilter === "Pending Payment"
              ? "my-booking-filter-btn my-booking-filter-active"
              : "my-booking-filter-btn"
          }
          onClick={() =>
            setBookingFilter("Pending Payment")
          }
        >
          Pending Payment (
          {
            savedBookings.filter(
              (booking) =>
                getBookingStatus(booking) ===
                "Pending Payment"
            ).length
          }
          )
        </button>
        {/* CONFIRMED */}
        <button
          type="button"
          className={
            bookingFilter === "Confirmed"
              ? "my-booking-filter-btn my-booking-filter-active"
              : "my-booking-filter-btn"
          }
          onClick={() =>
            setBookingFilter("Confirmed")
          }
        >
          Confirmed (
          {
            savedBookings.filter(
              (booking) =>
                getBookingStatus(booking) === "Confirmed"
            ).length
          }
          )
        </button>
        {/* COMPLETED */}
        <button
          type="button"
          className={
            bookingFilter === "Completed"
              ? "my-booking-filter-btn my-booking-filter-active"
              : "my-booking-filter-btn"
          }
          onClick={() =>
            setBookingFilter("Completed")
          }
        >
          Completed (
          {
            savedBookings.filter(
              (booking) =>
                getBookingStatus(booking) ===
                "Completed"
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
          onClick={() =>
            setBookingFilter("Cancelled")
          }
        >
          Cancelled (
          {
            savedBookings.filter(
              (booking) =>
                getBookingStatus(booking) === "Cancelled"
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
            {savedBookings.length === 0 ? (
              <>
                <h2>No Bookings Yet</h2>
                <p>
                  You haven't made any car bookings yet.
                </p>
                <button
                  type="button"
                  className="my-bookings-browse-btn"
                  onClick={() => navigate("/")}
                >
                  Browse Cars
                </button>
              </>
            ) : bookingSearch.trim() ? (
              <>
                <h2>No Bookings Found</h2>
                <p>
                  No bookings match{" "}
                  <strong>"{bookingSearch.trim()}"</strong>.
                </p>
                <button
                  type="button"
                  className="my-bookings-clear-search-btn"
                  onClick={() => setBookingSearch("")}
                >
                  Clear Search
                </button>
              </>
            ) : (
              <>
                <h2>No Matching Bookings</h2>
                <p>
                  No bookings match your selected filters.
                </p>
                <button
                  type="button"
                  className="my-bookings-browse-btn"
                  onClick={handleResetBookingFilters}
                >
                  Reset Filters
                </button>
              </>
            )}
          </div>
          ) : (
          /* BOOKING LIST */
          filteredBookings.map((booking) => {
            // Get dynamic booking status
            const bookingStatus =
              getBookingStatus(booking);
            // Get unique status class
            const bookingStatusClass =
              getBookingStatusClass(
                bookingStatus,
                "my-booking-status"
              );
            return (
              <div
                className="my-booking-card"
                key={booking.bookingId}
              >
                {/* CAR IMAGE */}
                <div className="my-booking-image">
                  <img
                    src={
                      booking.car?.image ||
                      "/assets/default-car.jpg"
                    }
                    alt={
                      booking.car?.name || "Car"
                    }
                  />
                </div>
                {/* BOOKING INFORMATION */}
                <div className="my-booking-information">
                  {/* TOP */}
                  <div className="my-booking-top">
                    <div>
                      <h2>
                        {booking.car?.name ||
                          "Car Details Unavailable"}
                      </h2>
                      <p>
                        {booking.car?.category ||
                          "Category Unavailable"}
                      </p>
                    </div>
                    {/* STATUS */}
                    <div className="my-booking-status-section">
                      {/* BOOKING STATUS */}
                      <span
                        className={
                          bookingStatusClass
                        }
                      >
                        {bookingStatus}
                      </span>
                      {/* PAYMENT STATUS */}
                      <span
                        className={
                          booking.paymentStatus ===
                          "Paid"
                            ? "my-booking-payment my-booking-payment-paid"
                            : "my-booking-payment my-booking-payment-pending"
                        }
                      >
                        Payment:{" "}
                        {booking.paymentStatus ||
                          "Pending"}
                      </span>
                      {/* REFUND STATUS */}
                      {booking.status ===
                        "Cancelled" && (
                        <span
                          className={
                            booking.refundStatus ===
                            "Refund Completed"
                              ? "my-booking-refund my-booking-refund-completed"
                              : booking.refundStatus ===
                                "No Refund"
                              ? "my-booking-refund my-booking-refund-none"
                              : "my-booking-refund my-booking-refund-pending"
                          }
                        >
                          Refund:{" "}
                          {booking.refundStatus ||
                            "Pending"}
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
                      ? new Date(
                          booking.createdAt
                        ).toLocaleDateString(
                          "en-IN"
                        )
                      : "N/A"}
                  </p>
                  {/* BOOKING DETAILS */}
                  <div className="my-booking-details">
                    <div>
                      <span>
                        Pickup Location
                      </span>
                      <strong>
                        {booking.location}
                      </strong>
                    </div>
                    <div>
                      <span>
                        Pickup Date
                      </span>
                      <strong>
                        {booking.pickupDate
                          ? new Date(
                              booking.pickupDate
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "N/A"}
                      </strong>
                    </div>
                    <div>
                      <span>
                        Return Date
                      </span>
                      <strong>
                        {booking.returnDate
                          ? new Date(
                              booking.returnDate
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "N/A"}
                      </strong>
                    </div>
                    <div>
                      <span>
                        Rental Days
                      </span>
                      <strong>
                        {Number(
                          booking.rentalDays || 0
                        )}{" "}
                        Days
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
                        ₹
                        {Number(
                          booking.totalPrice || 0
                        ).toLocaleString("en-IN")}
                      </strong>
                    </div>
                    {/* ACTION BUTTONS */}
                    <div className="my-booking-action-buttons">
                      {/* VIEW DETAILS */}
                      <button
                        type="button"
                        className="my-booking-view-details-btn"
                        onClick={() =>
                          navigate(
                            `/my-booking-details/${booking.bookingId}`
                          )
                        }
                      >
                        View Details
                      </button>
                      {/* CANCEL BUTTON */}
                      {bookingStatus !== "Cancelled" &&
                        bookingStatus !== "Completed" && (
                        <button
                          type="button"
                          className="my-booking-cancel-btn"
                          onClick={() =>
                            handleCancelBooking(
                              booking.bookingId
                            )
                          }
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>
    </main>
  );
};

export default MyBooking;