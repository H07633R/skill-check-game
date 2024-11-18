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
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%);
    opacity: 0.2;
    z-index: 0;
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
  min-width: 350px;
  
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
`;

const Title = styled.h1`
  color: #CD853F;
  text-shadow: 0 0 10px rgba(139, 69, 19, 0.5);
  margin-bottom: 20px;
  font-family: 'MedievalSharp', cursive;
  text-transform: uppercase;
  letter-spacing: 2px;
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
      alert('Взлом не удался!');
      handleReset();
      return;
    }

    const newScore = score + 1;
    
    if (newScore >= 3) {
      setIsRunning(false);
      setScore(newScore);
      setTimeout(() => {
        alert('Успешный взлом!');
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

  return (
    <PageContainer>
      <BackgroundOverlay />
      <GameContainer>
        <Title>Lock Picker's Trial</Title>
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