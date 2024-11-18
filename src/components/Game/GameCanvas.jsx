import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import SkillCheckGame from './SkillCheckGame';

const Canvas = styled.canvas`
  border: 2px solid #8B4513;
  border-radius: 50%;
  background-color: #2a1810;
  box-shadow: 
    0 0 15px rgba(139, 69, 19, 0.3),
    inset 0 0 15px rgba(139, 69, 19, 0.2);
`;

const DIFFICULTY_SETTINGS = {
  easy: {
    speed: 0.05,
    targetSize: 0.15 
  },
  normal: {
    speed: 0.07,
    targetSize: 0.13
  },
  hard: {
    speed: 0.09,
    targetSize: 0.11
  },
  extreme: {
    speed: 0.10,    
    targetSize: 0.09
  }
};

const GameCanvas = ({ isRunning, difficulty, setGameRef }) => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!gameRef.current) {
      gameRef.current = new SkillCheckGame(
        canvas, 
        DIFFICULTY_SETTINGS[difficulty].speed,
        DIFFICULTY_SETTINGS[difficulty].targetSize
      );
      setGameRef(gameRef.current);
    }
  }, [difficulty, setGameRef]);

  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.setDifficulty(
        DIFFICULTY_SETTINGS[difficulty].speed,
        DIFFICULTY_SETTINGS[difficulty].targetSize
      );
    }
  }, [difficulty]);

  useEffect(() => {
    if (gameRef.current) {
      if (isRunning) {
        gameRef.current.start();
      } else {
        gameRef.current.stop();
      }
    }
  }, [isRunning]);

  return <Canvas ref={canvasRef} width={300} height={300} />;
};

export default GameCanvas;