import {Navigate,Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage';
import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="main-container">
      <Navbar/>
      <Routes>
          <Route path="/" element={<Homepage/>}/>
          {/* <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/> */}
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
