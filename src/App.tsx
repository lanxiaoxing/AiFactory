import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import { initGA, pageview } from './utils/analytics';
import { trackVisit } from './utils/localAnalytics';
import './styles/global.css';

// 页面跟踪组件
const PageTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // 初始化 GA
    initGA();
  }, []);

  useEffect(() => {
    // 跟踪页面浏览 (GA 和本地统计)
    pageview(location.pathname + location.search);
    trackVisit(location.pathname + location.search);
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
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;