import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import UserSkills from './pages/UserSkills';
import { Toaster } from 'sonner';
import Navbar from './assets/layout/Navbar';

function App() {

  return (
    <main>
      <Router>
        <Toaster richColors position="top-center" theme='dark' />
        <Navbar isAuthenticated={false} username={""} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<UserSkills />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
