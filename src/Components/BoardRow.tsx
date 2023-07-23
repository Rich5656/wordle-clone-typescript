import React from 'react'

interface BoardRowProps {
    guess: string[];
    submitted: boolean;
    answer: string[];
}

export const BoardRow = ({ guess, submitted, answer }: BoardRowProps) => {
  const boardRowContent = (guess: string[], submitted: boolean) => {
    if (submitted === false) {
        return guess.map((letter) => <div className="tile"><p>{letter}</p></div>)
    } else {
        // TODO: fill in the logic for relative and absolute match styling
        console.log('submitted')
        return guess.map((letter, index) => {
            if (answer[index] === letter) {
                return <div className='tile absolute-match'><p>{letter}</p></div>
            }
            if (answer.includes(letter)) {
                return <div className='tile relative-match'><p>{letter}</p></div>
            }
            return <div className='tile'><p>{letter}</p></div>
        })
    }
  } 

  return (
    <div className="playing-board-row">
        {/* TODO: pass a tuple to props that can be mapped to these tiles */}
        {/* {guess.map(letter => <div className="tile"><p>{letter}</p></div>)} */}
        {boardRowContent(guess, submitted)}
        {/* <div className="tile"><p>W</p></div>
        <div className="tile"><p>O</p></div>
        <div className="tile"><p>R</p></div>
        <div className="tile"><p>D</p></div>
        <div className="tile"><p>S</p></div> */}
    </div>
  )
}
