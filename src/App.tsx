import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CrossWordleContainer } from './Containers/CrossWordleContainer';
import { useState } from 'react';
// import { PlayingBoardContainer } from './Containers/PlayingBoardContainer';


function App() {
  const [ score, setScore ] = useState<number>(0)

  const handleScoreUpdate = (points: number) => {
    setScore(prevState => prevState + points);
  }

  return (
    <div className="App">
      {/* <PlayingBoardContainer /> */}
      <CrossWordleContainer score={score} handleScoreUpdate={handleScoreUpdate} />
    </div>
  );
}

export default App;
