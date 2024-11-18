import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import GamePage from './pages/GamePage';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/game" element={<GamePage />} />
        <Route path="/game/:difficulty" element={<GamePage />} />
        <Route path="/" element={<Navigate to="/game/normal" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;