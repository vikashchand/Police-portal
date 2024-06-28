import './App.css';
import Registration from './Pages/Registration/Registration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import NotFound from './Pages/NotFound';


import ResetPassword from './Pages/Login/ResetPassword';
import SideeNav from './components/SideeNav';




function App() {
  return (
    <Router>
      <div className="App">
      
      <Routes>
      <Route path="/" element={<Registration />} />
      <Route path="/login" element={<Login />} />
     
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/home/*" element={<Home />} />
      
   
      <Route path="*" element={<NotFound />} /> {/* Add a catch-all route */}

  
    </Routes>
    
      </div>
    </Router>
  );
}

export default App;
