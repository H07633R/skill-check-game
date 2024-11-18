import React from 'react';
import styled from 'styled-components';

const ScoreContainer = styled.div`
  font-size: 24px;
  color: #CD853F;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: rgba(20, 10, 5, 0.7);
  border-radius: 8px;
  text-align: center;
  font-family: 'MedievalSharp', cursive;
  text-shadow: 0 0 5px rgba(139, 69, 19, 0.5);
  border: 1px solid #8B4513;
`;

const Score = ({ current, required }) => (
  <ScoreContainer>
    Попадания: {typeof current === 'number' ? current : 0}/{required}
  </ScoreContainer>
);

export default Score;