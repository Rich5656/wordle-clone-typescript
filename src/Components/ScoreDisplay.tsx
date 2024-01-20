import React from 'react'
import { ScoreDisplayProps } from '../Common/types';

export const ScoreDisplay = ({score}: ScoreDisplayProps) => {
  return (
    <>
        <div className='score-title'>Score</div>
        <div className='score'>{score}</div>
    </>
  )
}
