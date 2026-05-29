import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import MyBookings from './pages/MyBookings';
import FlightsPage from './pages/FlightsPage';
import FlightDetailsPage from './pages/FlightDetailsPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminFlights from './pages/admin/AdminFlights';
import CreateFlight from './pages/admin/CreateFlight';
import EditFlight from './pages/admin/EditFlight';
import AdminBookings from './pages/admin/AdminBookings';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {
        location.pathname !== "/login" &&

        location.pathname !== "/admin/login" &&

        !location.pathname.startsWith("/admin")

        &&

        <Navbar />

      }
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/flights' element={<FlightsPage />} />
        <Route path='/flights/:id' element={<FlightDetailsPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/booking/:id' element={<BookingPage />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/flights'element={<AdminFlights/>}/>
        <Route path='/admin/create-flight' element={<CreateFlight/>}/>
        <Route path="/admin/edit-flight/:id"element={<EditFlight/>}/>
        <Route path='/admin/bookings'element={<AdminBookings/>}/>
      </Routes>
    </div>
  );
}

export default App;
