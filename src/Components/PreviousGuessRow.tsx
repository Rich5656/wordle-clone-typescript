import React from 'react'

interface PreviousGuessProps {
    previousGuess: string[];
    relativeMatch: Set<string>;
    absoluteMatch: Set<string>;
}

export const PreviousGuessRow = ({previousGuess, relativeMatch, absoluteMatch}: PreviousGuessProps) => {
    const previousGuessRowContent = () => {
        return previousGuess.map((letter) => {
            // resetSubmitted();
            if (absoluteMatch.has(letter)) {
                return <div className="previous-guess absolute-match"><p>{letter}</p></div>
             }
            if (relativeMatch.has(letter)) {
                return <div className="previous-guess relative-match"><p>{letter}</p></div>
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
