import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GameCanvas from '../components/Game/GameCanvas';
import DifficultySelector from '../components/DifficultySelector';
import Score from '../components/Score';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1a;
  padding: 20px;
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const StartButton = styled.button`
  padding: 12px 24px;
  font-size: 18px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const GamePage = () => {
  const { difficulty = 'normal' } = useParams();
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [isSpaceEnabled, setIsSpaceEnabled] = useState(true);
  const [gameRef, setGameRef] = useState(null);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setScore(0);
    setIsSpaceEnabled(true);
  }, []);

  const handleHit = useCallback(() => {
    if (!gameRef?.checkHit()) {
      alert('Мимо! Начните сначала.');
      handleReset();
      return;
    }

    setScore(prev => prev + 1);
    setIsSpaceEnabled(false);
    
    setTimeout(() => {
      setIsSpaceEnabled(true);
    }, 750);

    if (score + 1 >= 3) {
      setTimeout(() => {
        alert('Поздравляем! Вы выиграли!');
        handleReset();
      }, 100);
    }
  }, [gameRef, score, handleReset]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && isRunning && isSpaceEnabled) {
        e.preventDefault();
        handleHit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, isSpaceEnabled, handleHit]);

  const handleStart = () => {
    setScore(0);
    setIsRunning(true);
    setIsSpaceEnabled(true);
  };

  const handleDifficultyChange = (newDifficulty) => {
    navigate(`/game/${newDifficulty}`);
    handleReset();
  };

  return (
    <PageContainer>
      <GameContainer>
        {!isRunning && (
          <DifficultySelector 
            currentDifficulty={difficulty} 
            onDifficultyChange={handleDifficultyChange}
          />
        )}
        <Score current={score} required={3} />
        <GameCanvas
          isRunning={isRunning}
          difficulty={difficulty}
          setGameRef={setGameRef}
        />
        {!isRunning && (
          <StartButton onClick={handleStart}>
            Начать игру
          </StartButton>
        )}
      </GameContainer>
    </PageContainer>
  );
};

export default GamePage;