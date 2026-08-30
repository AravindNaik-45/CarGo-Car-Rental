import { BrowserRouter,Routes,Route } from 'react-router-dom'
import NavBar from './Components/Navbar/NavBar'
import Footer from './Components/Footer/Footer'
import Home from './Pages/Home/Home'
import CarDetails from './Pages/CarDetails/CarDetails'
const App = () => {
  return (
    <BrowserRouter>
        <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cars/:id' element={<CarDetails/>}/>
    </Routes>
        <Footer/>
    </BrowserRouter>
  )
}
export default App