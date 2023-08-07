import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CrossWordleContainer } from './Containers/CrossWordleContainer';
import { useCountdown } from './Components/useCountdown';
import { useState, useEffect } from 'react';
// import { PlayingBoardContainer } from './Containers/PlayingBoardContainer';


function App() {
  // const [countDown, setCountDown] = useState<number>(5 * 60 * 1000);
  const [ score, setScore ] = useState<number>(0)
  const [ minutes, seconds ] = useCountdown();
  

  const handleScoreUpdate = (points: number) => {
    setScore(prevState => prevState + points);
  }

  return (
    <div className="App">
      {/* <PlayingBoardContainer /> */}
      <CrossWordleContainer score={score} handleScoreUpdate={handleScoreUpdate}
        minutes={minutes} seconds={seconds}
      />
    </div>
  );
}

export default App;
