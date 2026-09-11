import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    
    const [booking, setBooking] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("UPI");
    const [paymentStatus, setPaymentStatus] = useState("pending");
    
    useEffect(() => {
      const savedBookings =
        JSON.parse(localStorage.getItem("cargoBookings")) || [];
      const selectedBooking = savedBookings.find(
        (item) =>
          String(item.bookingId) === String(bookingId)
      );
      setBooking(selectedBooking || null);
    }, [bookingId]);
    const handlePayment = (event) => {
      event.preventDefault();
      setPaymentStatus("processing");
      setTimeout(() => {
        const savedBookings =
          JSON.parse(localStorage.getItem("cargoBookings")) || [];
        const updatedBookings = savedBookings.map((item) => {
          if (
            String(item.bookingId) === String(bookingId)
          ) {
            return {
              ...item,
              paymentStatus: "Paid",
              paymentMethod: paymentMethod
            };
          }
          return item;
        });
        localStorage.setItem(
          "cargoBookings",
          JSON.stringify(updatedBookings)
        );
        setPaymentStatus("success");
      }, 1500);
    };
    if (!booking) {
      return (
        <main className="payment-page">
          <section className="payment-empty">
            <h2>Booking Not Found</h2>
            <p>
              We could not find the booking for payment.
            </p>
            <button
              type="button"
              className="payment-back-btn"
              onClick={() => navigate("/my-bookings")}
            >
              Back to My Bookings
            </button>
          </section>
        </main>
      );
    }
    if (paymentStatus === "success") {
      return (
        <main className="payment-page">
          <section className="payment-success-card">
            <div className="payment-success-icon">
              ✓
            </div>
            <h1>Payment Successful!</h1>
            <p>
              Your payment has been completed successfully.
            </p>
            <div className="payment-success-details">
              <div>
                <span>Booking ID</span>
                <strong>{booking.bookingId}</strong>
              </div>
              <div>
                <span>Payment Method</span>
                <strong>{paymentMethod}</strong>
              </div>
              <div>
                <span>Amount Paid</span>
                <strong>₹{booking.totalPrice}</strong>
              </div>
            </div>
            <div className="payment-success-actions">
              <button
                type="button"
                className="payment-details-btn"
                onClick={() =>
                  navigate(
                    `/my-booking-details/${booking.bookingId}`
                  )
                }
              >
                View Booking
              </button>
              <button
                type="button"
                className="payment-home-btn"
                onClick={() => navigate("/")}
              >
                Back to Home
              </button>
            </div>
          </section>
        </main>
      );
    }
    return  (
      <main className="payment-page">
        <section className="payment-header">
          <p className="payment-label">
            CARGO RENTALS
          </p>
          <h1>Complete Payment</h1>
          <p>
            Securely complete your booking payment.
          </p>
        </section>
        <section className="payment-container">
          {/* LEFT SIDE - PAYMENT */}
          <div className="payment-form-section">
            <h2>Payment Method</h2>
            <div className="payment-method-options">
              <button
                type="button"
                className={
                  paymentMethod === "UPI"
                    ? "payment-method-btn payment-method-active"
                    : "payment-method-btn"
                }
                onClick={() =>
                  setPaymentMethod("UPI")
                }
              >
                <span>📱</span>
                <strong>UPI</strong>
                <small>Google Pay / PhonePe / Paytm</small>
              </button>
              <button
                type="button"
                className={
                  paymentMethod === "Card"
                    ? "payment-method-btn payment-method-active"
                    : "payment-method-btn"
                }
                onClick={() =>
                  setPaymentMethod("Card")
                }
              >
                <span>💳</span>
                <strong>Card</strong>
                <small>Credit / Debit Card</small>
              </button>
              <button
                type="button"
                className={
                  paymentMethod === "Cash"
                    ? "payment-method-btn payment-method-active"
                    : "payment-method-btn"
                }
                onClick={() =>
                  setPaymentMethod("Cash")
                }
              >
                <span>💵</span>
                <strong>Cash</strong>
                <small>Pay at rental location</small>
              </button>
            </div>
            <form
              className="payment-form"
              onSubmit={handlePayment}
            >
              {paymentMethod === "UPI" && (
                <div className="payment-input-group">
                  <label htmlFor="payment-upi">
                    UPI ID
                  </label>
                  <input
                    id="payment-upi"
                    type="text"
                    placeholder="example@upi"
                    required
                  />
                </div>
              )}
              {paymentMethod === "Card" && (
                <>
                  <div className="payment-input-group">
                    <label htmlFor="payment-card-number">
                      Card Number
                    </label>
                    <input
                      id="payment-card-number"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                    />
                  </div>
                  <div className="payment-card-row">
                    <div className="payment-input-group">
                      <label htmlFor="payment-expiry">
                        Expiry Date
                      </label>
                      <input
                        id="payment-expiry"
                        type="text"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div className="payment-input-group">
                      <label htmlFor="payment-cvv">
                        CVV
                      </label>
                      <input
                        id="payment-cvv"
                        type="password"
                        placeholder="123"
                        maxLength="3"
                        required
                      />
                    </div>
                  </div>
                </>
              )}
              {paymentMethod === "Cash" && (
                <div className="payment-cash-message">
                  <h3>Cash Payment</h3>
                  <p>
                    You can pay at the rental location
                    when you collect the vehicle.
                  </p>
                </div>
              )}
              <button
                type="submit"
                className="payment-submit-btn"
                disabled={paymentStatus === "processing"}
              >
                {paymentStatus === "processing"
                  ? "Processing Payment..."
                  : `Pay ₹${booking.totalPrice}`}
              </button>
            </form>
          </div>
          {/* RIGHT SIDE - BOOKING SUMMARY */}
          <div className="payment-summary-section">
            <h2>Booking Summary</h2>
            <div className="payment-car-summary">
              <img
                src={booking.car.image}
                alt={booking.car.name}
              />
              <div>
                <h3>{booking.car.name}</h3>
                <p>
                  {booking.car.category}
                </p>
              </div>
            </div>
            <div className="payment-summary-details">
              <div>
                <span>Booking ID</span>
                <strong>
                  {booking.bookingId}
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
              <div>
                <span>Price Per Day</span>
                <strong>
                  ₹{booking.car.price}
                </strong>
              </div>
            </div>
            <div className="payment-total">
              <span>Total Amount</span>
              <strong>
                ₹{booking.totalPrice}
              </strong>
            </div>
          </div>   
        </section>
      </main>
    );
}
export default Payment;