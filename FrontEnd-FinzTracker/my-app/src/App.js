import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home.jsx'
import Login from './components/login/Login.jsx';
import Signup from './components/signup/Signup.jsx';
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
