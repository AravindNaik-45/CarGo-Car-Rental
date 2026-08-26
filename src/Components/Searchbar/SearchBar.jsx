import React, { useState } from 'react'
import "./SearchBar.css"
let SearchBar = () => {
    let [location,setLocation] = useState("");
    let [pickupDate,setPickupDate]= useState("");
    let [returnDate,setReturnDate]= useState("");

    const handleSearch = () => {
        console.log("Location: " +location);
        console.log("Pickup Date: " +pickupDate);
        console.log("Return Date: " +returnDate);  
    }

  return (
    <div className='search-box'>
        <div className='search-field'>
            <label>
                📍 Pin-up Location
            </label>
            <input type="text" placeholder='Enter City' value={location} onChange={(event) => setLocation(event.target.value)}/>
        </div>

        <div className='search-field'>
            <label>
                📅 Pin-up Date
            </label>
            <input type="date" placeholder='Enter City' value={pickupDate} onChange={(event) => setPickupDate(event.target.value)}/>
        </div>

        <div className='search-field'>
            <label>
                📅 Return Date
            </label>
            <input type="date" placeholder='Enter City' value={returnDate} onChange={(event) => setReturnDate(event.target.value)}/>
        </div>
        <button className='search-btn' onClick={handleSearch}>Search Cars</button>
    </div>
  )
}

export default SearchBar