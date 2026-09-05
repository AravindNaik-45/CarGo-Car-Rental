import { BrowserRouter,Routes,Route } from 'react-router-dom'
import NavBar from './Components/Navbar/NavBar'
import Footer from './Components/Footer/Footer'
import Home from './Pages/Home/Home'
import CarDetails from './Pages/CarDetails/CarDetails'
import Booking from './Pages/Booking/Booking'
import BookingConformation from './Pages/BookingConformation/BookingConformation'
import MyBooking from './Pages/MyBookings/MyBooking'
import Favorites from './Pages/Favourite/Favorites'
const App = () => {
  return (
    <BrowserRouter>
        <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cars/:id' element={<CarDetails/>}/>
      <Route path='/booking/:id' element={<Booking/>}/>
      <Route path='/booking-confirmation' element={<BookingConformation/>}/>
      <Route path='/my-bookings' element={<MyBooking/>}/>
      <Route path='/favorites' element={<Favorites/>}></Route>
    </Routes>
        <Footer/>
    </BrowserRouter>
  )
}
export default App