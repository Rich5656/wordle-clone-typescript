import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CrossWordleContainer } from './Containers/CrossWordleContainer';
// import { PlayingBoardContainer } from './Containers/PlayingBoardContainer';

function App() {
  return (
    <div className="App">
      {/* <PlayingBoardContainer /> */}
      <CrossWordleContainer />
    </div>
  );
}

export default App;
