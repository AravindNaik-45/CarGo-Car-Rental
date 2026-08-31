import "./Booking.css"
import { useParams } from "react-router-dom"
import { useState } from "react"
import cars from "../../Data/Cars"
const Booking = () => {
    const {id} = useParams()
    const selectedCar = cars.find(
    (car) => car.id ===Number(id)
    )
    const [bookingData,setBookingData] = useState({
        name:"",
        email:"",
        phone:"",
        location:"",
        pickupDate:"",
        returnDate:"",
    })
    const handleBookingChange = (event) => {

    const { name, value } = event.target;

    setBookingData({
      ...bookingData,
      [name]: value
    });
  };
    const handleBookingSubmit =(event)=> {
        event.preventDefault();
        console.log("Booking Details:", bookingData)
        alert("Booking submitted successfully!");
    }
    if(!selectedCar) {
        return (
            <div className="booking-not-found">
                <h2>Car not Found</h2>
                <p>The selected car does not exist</p>
            </div>
        );
    }
  return (
    <main className="booking-page">
      <section className="booking-header">
        <p className="booking-label">CARGO RENTALS</p>
        <h1>Complete Your Booking</h1>
        <p>Fill in your details to reserve your car.</p>
      </section>
      <section className="booking-layout">
        {/* Selected Car */}
        <div className="booking-car-section">
          <h2>Selected Car</h2>
          <div className="booking-car-card">
            <div className="booking-car-image-box">
              <img
                src={`${selectedCar.image}`}
                alt={selectedCar.name}/>
            </div>
            <div className="booking-car-information">
              <h3> {selectedCar.name} </h3>
              <p>{selectedCar.category}</p>
              <p>⭐ {selectedCar.rating}</p>
              <div className="booking-car-price">
                ₹{selectedCar.price}
                <span> / day</span>
              </div>
            </div>
          </div>
        </div>
        {/* Booking Form */}
        <div className="booking-form-section">
          <h2> Booking Information </h2>
          <form  className="booking-form"  onSubmit={handleBookingSubmit}>
            {/* Customer Information */}
            <div className="booking-form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={bookingData.name}
                onChange={handleBookingChange}
                required/>
            </div>
            <div className="booking-form-group">
              <label> Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={bookingData.email}
                onChange={handleBookingChange}
                required/>
            </div>
            <div className="booking-form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={bookingData.phone}
                onChange={handleBookingChange}
                required/>
            </div>
            {/* Rental Information */}
            <div className="booking-form-group">
              <label>Pickup Location</label>
              <input
                type="text"
                name="location"
                placeholder="Enter pickup location"
                value={bookingData.location}
                onChange={handleBookingChange}
                required/>
            </div>
            <div className="booking-date-row">
              <div className="booking-form-group">
                <label> Pickup Date</label>
                <input
                  type="date"
                  name="pickupDate"
                  value={bookingData.pickupDate}
                  onChange={handleBookingChange}
                  required/>
              </div>
              <div className="booking-form-group">
                <label>Return Date</label>
                <input
                  type="date"
                  name="returnDate"
                  value={bookingData.returnDate}
                  onChange={handleBookingChange}
                  required/>
              </div>
            </div>
            <button type="submit" className="booking-submit-btn">
              Confirm Booking
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
export default Booking