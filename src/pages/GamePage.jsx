import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GameCanvas from '../components/Game/GameCanvas';
import DifficultySelector from '../components/DifficultySelector';
import Score from '../components/Score';
import { BackgroundOverlay } from '../styles/BackgroundStyles';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #1a1008;
  padding: 20px;
  position: relative;
  
  /* Мобильные стили применяются только на экранах <= 768px */
  @media (max-width: 768px) {
    min-height: -webkit-fill-available;
    touch-action: manipulation;
    user-select: none;
    padding: 10px;
  }
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;
  z-index: 3;
  padding: 30px;
  background: rgba(20, 10, 5, 0.7);
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(139, 69, 19, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #8B4513, #654321);
    border-radius: 16px;
    z-index: -1;
    opacity: 0.3;
  }

  /* Мобильные стили */
  @media (max-width: 768px) {
    padding: 20px;
    width: 90%;
    max-width: 350px;
  }
`;

const Title = styled.h1`
  color: #CD853F;
  text-shadow: 0 0 10px rgba(139, 69, 19, 0.5);
  margin-bottom: 20px;
  font-family: 'MedievalSharp', cursive;
  text-transform: uppercase;
  letter-spacing: 2px;

  /* Мобильные стили */
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 15px;
  }
`;

const StartButton = styled.button`
  padding: 12px 30px;
  font-size: 18px;
  font-family: 'MedievalSharp', cursive;
  background: linear-gradient(to bottom, #8B4513, #654321);
  color: #FFD700;
  border: 2px solid #CD853F;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.2),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);

  &:hover {
    background: linear-gradient(to bottom, #9B5523, #755331);
    transform: translateY(-2px);
    box-shadow: 
      0 4px 8px rgba(0, 0, 0, 0.3),
      inset 0 1px 1px rgba(255, 255, 255, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 
      0 1px 2px rgba(0, 0, 0, 0.2),
      inset 0 1px 1px rgba(0, 0, 0, 0.1);
  }

  /* Мобильные стили */
  @media (max-width: 768px) {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
`;

const GamePage = () => {
  const { difficulty = 'normal' } = useParams();
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameRef, setGameRef] = useState(null);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setScore(0);
  }, []);

  const handleHit = useCallback(() => {
    if (!gameRef?.checkHit()) {
      const alertInstance = alert('Взлом не удался!');
      if (window.innerWidth > 768) {
        const handleAlertKeyDown = (e) => {
          if (e.code === 'Space') {
            e.preventDefault();
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur();
            }
            window.removeEventListener('keydown', handleAlertKeyDown);
          }
        };
        window.addEventListener('keydown', handleAlertKeyDown);
      }
      handleReset();
      return;
    }

    const newScore = score + 1;
    
    if (newScore >= 3) {
      setIsRunning(false);
      setScore(newScore);
      setTimeout(() => {
        const alertInstance = alert('Успешный взлом!');
        if (window.innerWidth > 768) {
          const handleAlertKeyDown = (e) => {
            if (e.code === 'Space') {
              e.preventDefault();
              if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
              }
              window.removeEventListener('keydown', handleAlertKeyDown);
            }
          };
          window.addEventListener('keydown', handleAlertKeyDown);
        }
        handleReset();
      }, 100);
      return;
    }

    gameRef.moveTarget();
    setScore(newScore);
    
  }, [gameRef, score, handleReset]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && isRunning) {
        e.preventDefault();
        handleHit();
      }
      if (e.code === 'Space' && !isRunning && window.innerWidth > 768) {
        e.preventDefault();
        handleStart();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, handleHit]);

  const handleStart = () => {
    setScore(0);
    setIsRunning(true);
  };

  const handleDifficultyChange = (newDifficulty) => {
    navigate(`/game/${newDifficulty}`);
    handleReset();
  };

  const handleAction = useCallback(() => {
    if (isRunning) {
      handleHit();
    }
  }, [isRunning, handleHit]);

  const handleTouchStart = (e) => {
    e.preventDefault();
    if (isRunning) {
      handleAction();
    }
  };

  const handleStartTouchStart = (e) => {
    e.preventDefault();
    handleStart();
  };

  return (
    <PageContainer 
      onTouchStart={handleTouchStart}
      onTouchEnd={(e) => e.preventDefault()}
    >
      <BackgroundOverlay />
      <GameContainer>
        <Title>Sleight of Hand</Title>
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
          <StartButton 
            onClick={handleStart}
            onTouchStart={handleStartTouchStart}
            onTouchEnd={(e) => e.preventDefault()}
          >
            Start
          </StartButton>
        )}
      </GameContainer>
    </PageContainer>
  );
};

export default GamePage;
