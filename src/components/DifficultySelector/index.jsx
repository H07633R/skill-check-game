import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  font-family: 'MedievalSharp', cursive;
  font-weight: bold;
  background: ${props => props.active ? 
    'linear-gradient(to bottom, #8B4513, #654321)' : 
    'linear-gradient(to bottom, #2a1810, #1a1008)'};
  color: ${props => props.active ? '#FFD700' : '#CD853F'};
  border: 1px solid #8B4513;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;

  &:hover {
    background: ${props => props.active ? 
      'linear-gradient(to bottom, #9B5523, #755331)' : 
      'linear-gradient(to bottom, #3a2820, #2a1810)'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const DifficultySelector = ({ currentDifficulty, onDifficultyChange }) => {
  const difficulties = [
    { id: 'easy', label: 'Easy' },
    { id: 'normal', label: 'Medium' },
    { id: 'hard', label: 'Hard' },
    { id: 'extreme', label: 'Extreme' }
  ];

  return (
    <Container>
      {difficulties.map(diff => (
        <Button
          key={diff.id}
          active={currentDifficulty === diff.id}
          difficulty={diff.id}
          onClick={() => onDifficultyChange(diff.id)}
        >
          {diff.label}
        </Button>
      ))}
    </Container>
  );
};

export default DifficultySelector;