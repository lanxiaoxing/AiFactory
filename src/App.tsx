import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import './styles/global.css';


const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:pageName" element={<Home />} />
          </Routes>
        </main>
        {/* <Footer /> */}
        <div className="watermark-logo">
          <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
            <text 
              x="50%" 
              y="55%" 
              dominantBaseline="middle" 
              textAnchor="middle" 
              fill="currentColor" 
              fontSize="32" 
              fontWeight="900" 
              fontFamily="-apple-system, BlinkMacSystemFont, Arial, sans-serif"
              letterSpacing="2"
            >
              WPC
            </text>
          </svg>
        </div>
      </div>
    </Router>
  );
};

export default App;