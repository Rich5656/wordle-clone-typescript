import React from 'react'

interface PreviousGuessProps {
    previousGuess: string[];
    relativeMatch: Set<string>;
    absoluteMatch: Set<string>;
    answer: string[];
}

export const PreviousGuessRow = ({previousGuess, relativeMatch, absoluteMatch, answer}: PreviousGuessProps) => {
    const previousGuessRowContent = () => {
        return previousGuess.map((letter, index) => {
            // resetSubmitted();
            if (letter === answer[index]) {
                return <div className="previous-guess absolute-text"><p>{letter}</p></div>
             }
            if (answer.includes(letter)) {
                return <div className="previous-guess relative-text"><p>{letter}</p></div>
            }
            return <div className="previous-guess"><p>{letter}</p></div>
        })
    }
  return (
    <div className='playing-board-row'>
        {previousGuessRowContent()}
    </div>
  )
}