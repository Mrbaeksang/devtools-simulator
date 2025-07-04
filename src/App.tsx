import React, { useEffect, useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import WebsitePreview from './components/WebsitePreview';
import DevToolsSimulator from './components/DevToolsSimulator';
import './App.css';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check system color scheme
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    
    // Set initial value
    setIsDarkMode(mediaQuery.matches);
    
    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <AppProvider>
      <div className={`app-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        <header className="app-header">
          <h1>DevTools 실습/튜토리얼 시뮬레이터</h1>
          <p className="subtitle">Chrome DevTools의 핵심 기능을 자유롭게 탐색하고 학습해보세요</p>
        </header>
        
        <main className="main-content">
          <div className="preview-container">
            <WebsitePreview />
          </div>
          
          <div className="devtools-container">
            <DevToolsSimulator />
          </div>
        </main>
        
        <footer className="app-footer">
          <p> 2023 DevTools 학습 시뮬레이터 | 초보 개발자를 위한 실습 도구</p>
        </footer>
      </div>
    </AppProvider>
  );
};

export default App;
