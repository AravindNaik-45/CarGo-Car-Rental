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
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Profile from './Pages/Profile/Profile'
import BookingDetails from './Pages/BookingDetails/BookingDetails'
import Payment from './Pages/Payment/Payment'
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard'
import AdminCars from './Pages/AdminCars/AdminCars'
const App = () => {
  return (
    <BrowserRouter>
        <NavBar/>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/cars/:id' element={<CarDetails/>}/>
      <Route path='/booking/:id' element={
        <ProtectedRoute>
        <Booking/>
        </ProtectedRoute>
        }/>
      <Route path='/booking-confirmation' element={
        <ProtectedRoute>
          <BookingConformation/>
        </ProtectedRoute>
          }/>
      <Route path='/my-bookings' element={
        <ProtectedRoute>
        <MyBooking/>
        </ProtectedRoute>
        }/>
      <Route path='/favorites' element={
        <ProtectedRoute>
          <Favorites/>
        </ProtectedRoute>
        }/>
      <Route path='/register' element={<Register/>}/>
      {/* NEW PROFILE ROUTE */}
      <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>}/>
      <Route path="/my-booking-details/:bookingId" element={
         <ProtectedRoute>
           <BookingDetails />
         </ProtectedRoute>
       }/>
       <Route path="/payment/:bookingId" element={
         <ProtectedRoute>
           <Payment />
         </ProtectedRoute>
       }/>
       <Route path="/admin" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/cars" element={
        <ProtectedRoute>
          <AdminCars />
        </ProtectedRoute>
      } />
      </Routes>
        <Footer/>
    </BrowserRouter>
  )
}
export default App