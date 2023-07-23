import React from 'react'

interface BoardRowProps {
    guess: string[];
}

export const BoardRow = ({ guess }: BoardRowProps) => {
  return (
    <div className="playing-board-row">
        {/* TODO: pass a tuple to props that can be mapped to these tiles */}
        {guess.map(letter => <div className="tile"><p>{letter}</p></div>)}
        {/* <div className="tile"><p>W</p></div>
        <div className="tile"><p>O</p></div>
        <div className="tile"><p>R</p></div>
        <div className="tile"><p>D</p></div>
        <div className="tile"><p>S</p></div> */}
    </div>
  )
}
