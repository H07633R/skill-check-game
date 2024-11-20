import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import GamePage from './pages/GamePage';

function App() {
  useEffect(() => {
    // Проверяем, запущено ли приложение в Telegram
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
    }
  }, []);

  return (
    <HashRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/game" element={<GamePage />} />
        <Route path="/game/:difficulty" element={<GamePage />} />
        <Route path="/" element={<Navigate to="/game/normal" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;