
import './App.css';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import OneboxPage from './components/OneboxPage';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  return (
    <>
    
    <Router>
    <ThemeSwitcher></ThemeSwitcher>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/google-login" element={<OneboxPage />} />
      </Routes>
    </Router>
    
    </>
  );
}

export default App;
