import { useState } from 'react'
import "./SearchBar.css"
function SearchBar  ({onSearch})  {
    const [location,setLocation] = useState("");
    const [pickupDate,setPickupDate]= useState("");
    const [returnDate,setReturnDate]= useState("");

    const handleSearch = () => {
        if(!location || !pickupDate || !returnDate){
            alert("Please fill all fields");
            return;
        }
        if(pickupDate > returnDate){
            alert("Return date must be after Pickup date")
            return;
        }
        const data = {
            location : location,
            pickupDate : pickupDate,
            returnDate : returnDate
        }; 
        onSearch(data);
    };

  return (
    <div className='search-box'>
        <div className='search-field'>
            <label>📍 Pin-up Location</label>
            <input type="text" placeholder='Enter City' value={location} onChange={(event) => setLocation(event.target.value)}/>
        </div>

        <div className='search-field'>
            <label>
                📅 Pin-up Date
            </label>
            <input type="date" value={pickupDate} onChange={(event) => setPickupDate(event.target.value)}/>
        </div>

        <div className='search-field'>
            <label>
                📅 Return Date
            </label>
            <input type="date" value={returnDate} onChange={(event) => setReturnDate(event.target.value)}/>
        </div>
        <button className='search-btn' onClick={handleSearch}>Search Cars</button>
    </div>
  )
}

export default SearchBar