import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import SkillCheckGame from './SkillCheckGame';

const Canvas = styled.canvas`
  border: 2px solid #333;
  border-radius: 50%;
  background-color: #2a2a2a;
`;

const DIFFICULTY_SETTINGS = {
  easy: {
    speed: 0.06,
    targetSize: 0.15 // 15% от круга
  },
  normal: {
    speed: 0.075,
    targetSize: 0.12 // 12% от круга
  },
  hard: {
    speed: 0.08,
    targetSize: 0.10 // 10% от круга
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