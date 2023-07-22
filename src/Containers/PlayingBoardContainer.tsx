import React, { useState, MouseEvent } from 'react';
import { BoardRow } from '../Components/BoardRow';
import { KeyboardDisplay } from '../Components/KeyboardDisplay';

type GuessSetterMap = {
    first: React.Dispatch<React.SetStateAction<string[]>>;
    second: React.Dispatch<React.SetStateAction<string[]>>;
    third: React.Dispatch<React.SetStateAction<string[]>>;
    fourth: React.Dispatch<React.SetStateAction<string[]>>;
    fifth: React.Dispatch<React.SetStateAction<string[]>>;
    sixth: React.Dispatch<React.SetStateAction<string[]>>;
}

export const PlayingBoardContainer = () => {
  const answer: string[] = ['w', 'o', 'r', 'd', 's'];
  const [ firstGuess , setFirstGuess ] = useState<string[]>(['','','','','']);
  const [ secondGuess , setSecondGuess ] = useState<string[]>(['','','','','']);
  const [ thirdGuess , setThirdGuess ] = useState<string[]>(['','','','','']);
  const [ fourthGuess , setFourthGuess ] = useState<string[]>(['','','','','']);
  const [ fifthGuess , setFifthGuess ] = useState<string[]>(['','','','','']);
  const [ sixthGuess , setSixthGuess ] = useState<string[]>(['','','','','']);


  console.log(firstGuess)
//   const guessSetterMap: GuessSetterMap = {
//     first: setFirstGuess,
//     second: setSecondGuess,
//     third: setThirdGuess,
//     fourth: setFourthGuess,
//     fifth: setFifthGuess,
//     sixth: setSixthGuess,
//   }

  const handleGuessChange = () => {
  }

  const handleKeyClick = (e: MouseEvent<HTMLButtonElement>) => {
    // TODO: add conditionals to add to different arrays based on the current level
    e.preventDefault();
    const target: string = e.currentTarget.id
    // if (firstGuess.length === 5) return;
    setFirstGuess(prevState => {
        prevState.forEach((letter, index) => {
            if (letter === '') {
                // console.log(e.currentTarget)
                prevState[index] = target;
                return;
            }
        });
        return [...prevState];
    });
  }

  return (
    <main>
        {/* TODO: boardrow will need to accept props */}
        <BoardRow  guess={firstGuess} handleGuessChange={handleGuessChange} />
        <BoardRow guess={secondGuess} handleGuessChange={handleGuessChange}/>
        <BoardRow guess={thirdGuess} handleGuessChange={handleGuessChange}/>
        <BoardRow guess={fourthGuess} handleGuessChange={handleGuessChange}/>
        <BoardRow guess={fifthGuess} handleGuessChange={handleGuessChange}/>
        <BoardRow guess={sixthGuess} handleGuessChange={handleGuessChange}/>
        <KeyboardDisplay handleKeyClick={handleKeyClick}/>
    </main>
  )
}
