import React from 'react'

interface CountdownDisplayProps {
    minutes: number;
    seconds: number;
}


export const CountdownDisplay = ({minutes, seconds}: CountdownDisplayProps) => {
  return (
    <>
        <div className='countdown-title'>Time</div>
        <div className='countdown'>{`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</div>
    </>
  )
}
