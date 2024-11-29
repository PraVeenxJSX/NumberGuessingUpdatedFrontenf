import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './components/Game';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/NavBar';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
