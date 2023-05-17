import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './screens/Navbar';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DashBoard from './screens/DashBoard';
import AdScreen from './screens/AdScreen';

function App() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  return (
    <>
    <Navbar />
    <Routes>
        <Route path="/" index element={<HomeScreen />} />
        <Route
          path="/DashBoard"
          element={
            user ? <DashBoard /> : navigate('/Login')
          }
        />
        <Route
          path="/PostAd"
          element={
            user ? <AdScreen /> : navigate('/Login')
          }
        />
      <Route path="/Login" element={<LoginScreen />} />
    </Routes>
    </>
  );
}

export default App;
