import React, { useEffect, MouseEvent } from 'react';
import './App.css';
import { CrossWordleContainer } from './Containers/CrossWordleContainer';
import { useCountdown } from './Components/useCountdown';
import { useState } from 'react';
import { ScoreDisplay } from './Components/ScoreDisplay';
import { CountdownDisplay } from './Components/CountdownDisplay';
import { AnagramAttackContainer } from './Containers/AnagramAttackContainer';

// import { PlayingBoardContainer } from './Containers/PlayingBoardContainer';


function App() {
  const [begin, setBegin] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('intro')
  const [score, setScore] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [minutes, seconds] = useCountdown(status);
  const [gameType, setGameType] = useState<string>();

  const handleBegin = (e: MouseEvent<HTMLButtonElement>) => {
    setGameType(e.currentTarget.name);
    if (userName !== "") {
      setBegin(true);
      setStatus('begin');
    }
  }

  const handleScoreUpdate = (points: number) => {
    setScore(prevState => prevState + points);
  }

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      setBegin(false);
      setStatus('end');
    }
  })
  
  const setPageView = () => {
    if (status === 'intro') {
      return (
        <div className='page-intro-area'>
          <div>User Info:</div>
          <input className='user-information' value={userName} type='text' onChange={(e) => setUserName(e.target.value)}></input>
          <button className='begin-button' name='trivia' onClick={handleBegin}>Trivia</button>
          <button className='begin-button' name='anagramAttack' onClick={handleBegin}>Anagram Attack</button>
        </div>
      );
    }
    if (status === 'begin') {
      return (
        <main>
        {/* <PlayingBoardContainer /> */}
          <div className="game-information">
            <CountdownDisplay minutes={minutes} seconds={seconds}/>
            <ScoreDisplay score={score} />
          </div>
          
          {(gameType === "trivia") ? 
          <CrossWordleContainer handleScoreUpdate={handleScoreUpdate}
            minutes={minutes} seconds={seconds}
          /> :
          <AnagramAttackContainer handleScoreUpdate={handleScoreUpdate}
          minutes={minutes} seconds={seconds} />
          }
        </main>
      )
    }

    if (status === 'end') {
      return (
        <div className='leaderboard'>
          <div>Leaders:</div>
          <ul className='scores-list'>
            <li className='user-score'>
              <div>{score}</div>
              <div>{userName}</div>
            </li>
          </ul>
        </div>
      )
    }
  }

  return (
    <div className="App">
      {setPageView()}
    </div>
  );
}

export default App;
