import React from 'react'

interface ScoreDisplayProps {
    score: number;
}

export const ScoreDisplay = ({score}: ScoreDisplayProps) => {
  return (
    <>
        <div className='score-title'>Score</div>
        <div className='score'>{score}</div>
    </>
  )
}
