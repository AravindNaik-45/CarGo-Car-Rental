import { useState } from "react";
import "./MyBooking.css";
import { useNavigate } from "react-router-dom";

const MyBooking = () => {
  const [bookingFilter, setBookingFilter] = useState("All");

  const navigate = useNavigate();

  const savedBookings =
    JSON.parse(localStorage.getItem("cargoBookings")) || [];

  // Filter bookings for display
  const filteredBookings = savedBookings.filter((booking) => {
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
  const handleCancelBooking = (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }

    const updatedBookings = savedBookings.map((booking) => {
      if (booking.bookingId === bookingId) {
        return {
          ...booking,
          status: "Cancelled",
        };
      }

      return booking;
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
              No {bookingFilter} Bookings
            </h2>
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
                  src={booking.car.image}
                  alt={booking.car.name}
                />
              </div>
              {/* BOOKING INFORMATION */}
              <div className="my-booking-information">
                {/* TOP */}
                <div className="my-booking-top">
                  <div>
                    <h2>
                      {booking.car.name}
                    </h2>
                    <p>
                      {booking.car.category}
                    </p>
                  </div>
                  {/* STATUS */}
                  <span
                    className={
                      booking.status === "Cancelled"
                        ? "my-booking-status my-booking-status-cancelled"
                        : "my-booking-status"
                    }
                  >
                    {booking.status || "Confirmed"}
                  </span>
                </div>
                {/* BOOKING ID */}
                <div className="my-booking-id">
                  Booking ID:
                  <strong>
                    {booking.bookingId}
                  </strong>
                </div>
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
                      {booking.pickupDate}
                    </strong>
                  </div>
                  <div>
                    <span>Return Date</span>
                    <strong>
                      {booking.returnDate}
                    </strong>
                  </div>
                  <div>
                    <span>Rental Days</span>
                    <strong>
                      {booking.rentalDays}
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
                      ₹{booking.totalPrice}
                    </strong>
                  </div>
                  {/* CANCEL BUTTON */}
                  {booking.status !== "Cancelled" && (
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
          ))
        )}
      </section>
    </main>
  );
};
export default MyBooking;