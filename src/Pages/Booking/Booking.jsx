import "./Booking.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import cars from "../../Data/Cars";
function Booking() {
  const { id } = useParams();
  const selectedCar = cars.find((car) => car.id === Number(id));
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    pickupDate: "",
    returnDate: ""});
  const handleBookingChange = (event) => {
    const { name, value } = event.target;
    setBookingData({...bookingData,[name]: value});
  };
  // Calculate rental days
  let rentalDays = 0;
  if (bookingData.pickupDate && bookingData.returnDate) {
    const pickup = new Date(bookingData.pickupDate);
    const returnDate = new Date(bookingData.returnDate);
    const difference = returnDate - pickup;
    rentalDays = difference / (1000 * 60 * 60 * 24);
  }
  // Calculate total price
  const totalPrice = rentalDays > 0 ? rentalDays * selectedCar.price: 0;
  const handleBookingSubmit = (event) => {
    event.preventDefault();
    if (rentalDays <= 0) {
      alert("Return date must be after pickup date.");
      return;
    }
    console.log( "Booking Details:", bookingData);
    console.log( "Rental Days:",rentalDays);
    console.log( "Total Price:", totalPrice);
    alert("Booking submitted successfully!");
  };
  if (!selectedCar) {
    return (
      <div className="booking-not-found">
        <h2> Car Not Found </h2>
        <p> The selected car does not exist.</p>
      </div>
    );
  }
  return (
    <main className="booking-page">
      {/* Header */}
      <section className="booking-header">
        <p className="booking-label"> CARGO RENTALS</p>
        <h1> Complete Your Booking </h1>
        <p> Fill in your details to reserve your car. </p>
      </section>
      <section className="booking-layout">
        {/* Selected Car */}
        <div className="booking-car-section">
          <h2> Selected Car </h2>
          <div className="booking-car-card">
            <div className="booking-car-image-box">
              <img src={`${selectedCar.image}`} alt={selectedCar.name}/>
            </div>
            <div className="booking-car-information">
              <h3>{selectedCar.name}</h3>
              <p> {selectedCar.category}</p>
              <p>⭐ {selectedCar.rating} </p>
              <div className="booking-car-price">
                ₹{selectedCar.price}
                <span> / day </span>
              </div>
            </div>
          </div>
        </div>
        {/* Booking Form */}
        <div className="booking-form-section">
          <h2> Booking Information</h2>
          <form className="booking-form" onSubmit={handleBookingSubmit}>
            {/* Full Name */}
            <div className="booking-form-group">
              <label> Full Name </label>
              <input type="text" name="name" placeholder="Enter your full name" value={bookingData.name} onChange={handleBookingChange} required />
            </div>
            {/* Email */}
            <div className="booking-form-group">
              <label> Email Address</label>
              <input type="email" name="email" placeholder="Enter your email" value={bookingData.email} onChange={handleBookingChange} required/>
            </div>
            {/* Phone */}
            <div className="booking-form-group">
              <label> Phone Number </label>
              <input type="tel" name="phone" placeholder="Enter your phone number" value={bookingData.phone} onChange={handleBookingChange} required/>
            </div>
            {/* Location */}
            <div className="booking-form-group">
              <label> Pickup Location </label>
              <input type="text" name="location"  placeholder="Enter pickup location" value={bookingData.location} onChange={handleBookingChange} required />
            </div>
            {/* Dates */}
            <div className="booking-date-row">
              <div className="booking-form-group">
                <label> Pickup Date </label>
                <input type="date" name="pickupDate" value={bookingData.pickupDate} onChange={handleBookingChange} required />
              </div>
              <div className="booking-form-group">
                <label>Return Date</label>
                <input type="date" name="returnDate" value={bookingData.returnDate} onChange={handleBookingChange} required />
              </div>
            </div>
            {/* Booking Summary */}
            <div className="booking-summary">
              <h3>Booking Summary</h3>
              <div className="booking-summary-row">
                <span> Price per day</span>
                <strong> ₹{selectedCar.price} </strong>
              </div>
              <div className="booking-summary-row">
                <span> Rental Days </span>
                <strong>{rentalDays > 0 ? rentalDays : 0}</strong>
              </div>
              <div className="booking-summary-total">
                <span>Total Price</span>
                <strong>₹{totalPrice}</strong>
              </div>
            </div>
            {/* Submit */}
            <button type="submit" className="booking-submit-btn">Confirm Booking
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
export default Booking;