import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cars from "../../Data/Cars";
import "./AdminCars.css";

const AdminCars = () => {
    const navigate = useNavigate();
    const [editingCarId, setEditingCarId] = useState(null);
    const handleEditCar = (car) => {
      setEditingCarId(car.id);
      setCarData({
        name: car.name,
        category: car.category,
        price: car.price,
        image: car.image,
        seats: car.seats,
        transmission: car.transmission,
        fuel: car.fuel,
        rating: car.rating
      });
    };
    const [adminCars, setAdminCars] = useState(() => {
    const savedCars = localStorage.getItem("cargoCars");
    if (savedCars) {
      return JSON.parse(savedCars);
    }
    localStorage.setItem("cargoCars", JSON.stringify(cars));
    return cars;
    });
    const [carData, setCarData] = useState({
      name: "",
      category: "SUV",
      price: "",
      image: "",
      seats: "",
      transmission: "Automatic",
      fuel: "Petrol",
      rating: "5"
    });
    const handleCarChange = (event) => {
      const { name, value } = event.target;
      setCarData({
        ...carData,
        [name]: value
      });
    };
    const handleSaveCar = (event) => {
        event.preventDefault();
        const name = carData.name.trim();
        const price = Number(carData.price);
        const seats = Number(carData.seats);
      
        if (name.length < 2) {
          alert("Please enter a valid car name.");
          return;
        }
        if (price <= 0) {
          alert("Please enter a valid price.");
          return;
        }
        if (!carData.image.trim()) {
          alert("Please enter a car image path.");
          return;
        }
        if (seats < 1 || seats > 10) {
          alert("Seats must be between 5 and 12.");
          return;
        }
        // EDIT EXISTING CAR
        if (editingCarId !== null) {
          const updatedCars = adminCars.map((car) => {
            if (car.id === editingCarId) {
              return {
                ...car,
                name: name,
                category: carData.category,
                price: price,
                image: carData.image,
                seats: seats,
                transmission: carData.transmission,
                fuel: carData.fuel,
                rating: Number(carData.rating)
              };
            }
            return car;
          });
          setAdminCars(updatedCars);
          localStorage.setItem(
            "cargoCars",
            JSON.stringify(updatedCars)
          );
          alert("Car updated successfully!");
          setEditingCarId(null);
        }
        // ADD NEW CAR
        else {
          const newCar = {
            id: Date.now(),
            name: name,
            category: carData.category,
            price: price,
            image: carData.image,
            seats: seats,
            transmission: carData.transmission,
            fuel: carData.fuel,
            rating: Number(carData.rating)
          };
          const updatedCars = [...adminCars, newCar];
          setAdminCars(updatedCars);
          localStorage.setItem(
            "cargoCars",
            JSON.stringify(updatedCars)
          );
          alert("Car added successfully!");
        }
        // RESET FORM
        setCarData({
          name: "",
          category: "SUV",
          price: "",
          image: "",
          seats: 5,
          transmission: "Automatic",
          fuel: "Petrol",
          rating: 4.5
        });
      };
    const handleDeleteCar = (carId) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this car?"
      );
      if (!confirmDelete) return;
      const updatedCars = adminCars.filter(
        (car) => car.id !== carId
      );
      setAdminCars(updatedCars);
      localStorage.setItem(
        "cargoCars",
        JSON.stringify(updatedCars)
      );
    };
  return (
    <main className="admin-cars-page">
      <section className="admin-cars-header">
        <p className="admin-cars-label">ADMIN PANEL</p>
        <h1>Car Management</h1>
        <p>
          Add and manage the cars available on the CarGo platform.
        </p>
      </section>
      <section className="admin-cars-add-section">
        <h2>
          {editingCarId !== null ? "Edit Car" : "Add New Car"}
        </h2>
        <form
          className="admin-cars-form"
          onSubmit={handleSaveCar}
        >
          <div className="admin-cars-form-group">
            <label>Car Name</label>
            <input
              type="text"
              name="name"
              placeholder="Example: BMW X5"
              value={carData.name}
              onChange={handleCarChange}
            />
          </div>
          <div className="admin-cars-form-group">
            <label>Category</label>
            <select
              name="category"
              value={carData.category}
              onChange={handleCarChange}
            >
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Luxury">Luxury</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <div className="admin-cars-form-group">
            <label>Price Per Day</label>
            <input
              type="number"
              name="price"
              placeholder="5000"
              value={carData.price}
              onChange={handleCarChange}
            />
          </div>
          <div className="admin-cars-form-group">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              placeholder="/assets/bmw.jpg"
              value={carData.image}
              onChange={handleCarChange}
            />
          </div>
          <div className="admin-cars-form-group">
            <label>Seats</label>
            <input
              type="number"
              name="seats"
              placeholder="5"
              min="5"
              max="12"
              value={carData.seats}
              onChange={handleCarChange}
            />
          </div>
          <div className="admin-cars-form-group">
            <label>Transmission</label>
            <select
              name="transmission"
              value={carData.transmission}
              onChange={handleCarChange}
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div className="admin-cars-form-group">
            <label>Fuel</label>
            <select
              name="fuel"
              value={carData.fuel}
              onChange={handleCarChange}
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="admin-cars-form-group">
            <label>Rating</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              step="0.1"
              value={carData.rating}
              onChange={handleCarChange}
            />
          </div>
          <button
            type="submit"
            className="admin-cars-save-btn">
            {editingCarId !== null ? "Update Car" : "Add Car"}
          </button>
          {editingCarId !== null && (
          <button
            type="button"
            className="admin-cars-cancel-edit-btn"
            onClick={() => {
              setEditingCarId(null);
              setCarData({
                name: "",
                category: "SUV",
                price: "",
                image: "",
                seats: 5,
                transmission: "Automatic",
                fuel: "Petrol",
                rating: 4.5
              });
            }}>
            Cancel
          </button>
        )}
        </form>
      </section>
      <section className="admin-cars-list-section">
        <div className="admin-cars-list-header">
          <div>
            <h2>Available Cars</h2>
            <p>
              Total Cars: <strong>{adminCars.length}</strong>
            </p>
          </div>
          <button
            type="button"
            className="admin-cars-back-btn"
            onClick={() => navigate("/admin")}
          >
            ← Admin Dashboard
          </button>
        </div>
        <div className="admin-cars-grid">
          {adminCars.map((car) => (
            <article
              className="admin-cars-card"
              key={car.id}
            >
              <div className="admin-cars-image-wrapper">
                <img
                  src={car.image}
                  alt={car.name}
                  className="admin-cars-image"
                />
              </div>
              <div className="admin-cars-card-content">
                <p className="admin-cars-category">
                  {car.category}
                </p>
                <h3>{car.name}</h3>
                <p className="admin-cars-details">
                  ⭐ {car.rating} &nbsp; | &nbsp;
                  {car.seats} Seats &nbsp; | &nbsp;
                  {car.transmission}
                </p>
                <div className="admin-cars-card-bottom">
                  <strong>
                    ₹{car.price} / day
                  </strong>
                  <button
                    type="button"
                    className="admin-cars-edit-btn"
                    onClick={() => handleEditCar(car)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="admin-cars-delete-btn"
                    onClick={() =>
                      handleDeleteCar(car.id)
                    }>
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default AdminCars;