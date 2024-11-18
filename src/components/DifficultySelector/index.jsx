import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => props.active ? '#4CAF50' : '#333'};
  color: white;
  
  &:hover {
    background-color: ${props => props.active ? '#45a049' : '#444'};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const DifficultySelector = ({ currentDifficulty, onDifficultyChange }) => {
  const difficulties = [
    { id: 'easy', label: 'Легкий' },
    { id: 'normal', label: 'Средний' },
    { id: 'hard', label: 'Сложный' }
  ];

  return (
    <Container>
      {difficulties.map(diff => (
        <Button
          key={diff.id}
          active={currentDifficulty === diff.id}
          onClick={() => onDifficultyChange(diff.id)}
        >
          {diff.label}
        </Button>
      ))}
    </Container>
  );
};

export default DifficultySelector;