import { useEffect, useState } from "react"
import cars from "../../Data/Cars"
import "./Favorites.css"
import { Link } from "react-router-dom"

const Favorites = () => {
   let [favoriteCars,setFavoriteCars] = useState([])
    useEffect(() => {
        const savedFavorites =
        JSON.parse(localStorage.getItem("cargoFavorites" || []))

        const favoriteCarList = cars.filter((car) => 
        savedFavorites.includes(Number(car.id))
    )
        setFavoriteCars(favoriteCarList)
    },[])
  return (
    <main className="favorites-page">
      <div className="favorites-header">
        <p className="favorites-small-title">
          YOUR COLLECTION
        </p>
        <h1>Favorite Cars ❤️</h1>
        <p>Cars you saved for later.</p>
      </div>
      {favoriteCars.length === 0 ? (
        <div className="favorites-empty">
          <h2>No Favorite Cars</h2>
          <p>You haven't added any cars to your favorites yet.</p>
          <Link to="/" className="favorites-browse-btn"> Browse Cars </Link>
        </div>
      ) : (
        <div className="favorites-car-grid">
          {favoriteCars.map((car) => (
            <div
              className="favorites-car-card"
              key={car.id}>
              <img
                src={car.image} alt={car.name}
                className="favorites-car-image"
              />
              <div className="favorites-car-content">
                <h2>{car.name}</h2>
                <p className="favorites-car-category"> {car.category} </p>
                <p className="favorites-car-price">
                  ₹{car.price} / day </p>
                <Link
                  to={`/cars/${car.id}`}
                  className="favorites-details-btn">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Favorites