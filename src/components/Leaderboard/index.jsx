import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getLeaderboard } from '../../services/scores'

const LeaderboardContainer = styled.div`
  background: rgba(20, 10, 5, 0.7);
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
  width: 100%;
  max-width: 300px;
`

const LeaderboardTitle = styled.h2`
  color: #CD853F;
  text-align: center;
  margin-bottom: 15px;
  font-family: 'MedievalSharp', cursive;
  font-size: 1.2em;
`

const ScoreRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid rgba(205, 133, 63, 0.2);
  color: #CD853F;
  font-family: 'MedievalSharp', cursive;

  &:last-child {
    border-bottom: none;
  }
`

const Status = styled.span`
  color: ${props => props.passed ? '#4CAF50' : '#f44336'};
  font-weight: bold;
`

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

const Leaderboard = ({ difficulty }) => {
  const [attempts, setAttempts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAttempts = async () => {
      setLoading(true)
      const data = await getLeaderboard(difficulty)
      setAttempts(data)
      setLoading(false)
    }

    loadAttempts()
    const interval = setInterval(loadAttempts, 30000)
    
    return () => clearInterval(interval)
  }, [difficulty])

  if (loading) {
    return <LeaderboardContainer>Loading...</LeaderboardContainer>
  }

  return (
    <LeaderboardContainer>
      <LeaderboardTitle>Recent Attempts</LeaderboardTitle>
      {attempts.map((attempt) => (
        <ScoreRow key={attempt.id}>
          <span>{attempt.username} ({formatDate(attempt.created_at)})</span>
          <Status passed={attempt.passed}>
            {attempt.passed ? 'PASS' : 'FAIL'}
          </Status>
        </ScoreRow>
      ))}
    </LeaderboardContainer>
  )
}

export default Leaderboard