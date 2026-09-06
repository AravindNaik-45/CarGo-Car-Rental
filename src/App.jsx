import { BrowserRouter,Routes,Route } from 'react-router-dom'
import NavBar from './Components/Navbar/NavBar'
import Footer from './Components/Footer/Footer'
import Home from './Pages/Home/Home'
import CarDetails from './Pages/CarDetails/CarDetails'
import Booking from './Pages/Booking/Booking'
import BookingConformation from './Pages/BookingConformation/BookingConformation'
import MyBooking from './Pages/MyBookings/MyBooking'
import Favorites from './Pages/Favourite/Favorites'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
const App = () => {
  return (
    <BrowserRouter>
        <NavBar/>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/cars/:id' element={<CarDetails/>}/>
      <Route path='/booking/:id' element={<Booking/>}/>
      <Route path='/booking-confirmation' element={<BookingConformation/>}/>
      <Route path='/my-bookings' element={<MyBooking/>}/>
      <Route path='/favorites' element={<Favorites/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
        <Footer/>
    </BrowserRouter>
  )
}
export default App