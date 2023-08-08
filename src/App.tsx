import React, { useEffect } from 'react';
import './App.css';
import { CrossWordleContainer } from './Containers/CrossWordleContainer';
import { useCountdown } from './Components/useCountdown';
import { useState } from 'react';
import { ScoreDisplay } from './Components/ScoreDisplay';
import { CountdownDisplay } from './Components/CountdownDisplay';
// import { PlayingBoardContainer } from './Containers/PlayingBoardContainer';


function App() {
  const [ begin, setBegin ] = useState(false);
  const [ score, setScore ] = useState<number>(0)
  const [ minutes, seconds ] = useCountdown(begin);
  
  const handleBegin = () => {
    setBegin(true);
  }

  const handleScoreUpdate = (points: number) => {
    setScore(prevState => prevState + points);
  }

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      setBegin(false);
    }
  }) 

  return (
    <div className="App">
      {(begin === false)
        ?
        <div className='begin-button-area'>
          <button className='begin-button' onClick={handleBegin}>Begin</button>
        </div>
        :
        <main>
        {/* <PlayingBoardContainer /> */}
          <div className="game-information">
            <CountdownDisplay minutes={minutes} seconds={seconds}/>
            <ScoreDisplay score={score} />
          </div>

          <CrossWordleContainer handleScoreUpdate={handleScoreUpdate}
            minutes={minutes} seconds={seconds}
          />
        </main>
      
      }
    </div>
  );
}

export default App;
