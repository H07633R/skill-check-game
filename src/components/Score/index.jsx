import React from 'react';
import styled from 'styled-components';

const ScoreContainer = styled.div`
  font-size: 24px;
  color: white;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  text-align: center;
`;

const Score = ({ current, required }) => (
  <ScoreContainer>
    Попадания: {typeof current === 'number' ? current : 0}/{required}
  </ScoreContainer>
);

export default Score;