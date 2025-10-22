import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import { initGA, pageview } from './utils/analytics';
import './styles/global.css';

// 页面跟踪组件
const PageTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // 初始化 GA
    initGA();
  }, []);

  useEffect(() => {
    // 跟踪页面浏览
    pageview(location.pathname + location.search);
  }, [location]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <PageTracker />
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:pageName" element={<Home />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;