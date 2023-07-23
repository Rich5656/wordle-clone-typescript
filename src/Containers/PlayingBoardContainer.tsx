import React, { useState, MouseEvent } from 'react';
import { BoardRow } from '../Components/BoardRow';
import { KeyboardDisplay } from '../Components/KeyboardDisplay';

interface GuessSetterMap {
    [position: number]: React.Dispatch<React.SetStateAction<string[]>>;
}

export const PlayingBoardContainer = () => {
  const answer: string[] = ['w', 'o', 'r', 'd', 's'];
  const [ firstGuess , setFirstGuess ] = useState<string[]>(['','','','','']);
  const [ secondGuess , setSecondGuess ] = useState<string[]>(['','','','','']);
  const [ thirdGuess , setThirdGuess ] = useState<string[]>(['','','','','']);
  const [ fourthGuess , setFourthGuess ] = useState<string[]>(['','','','','']);
  const [ fifthGuess , setFifthGuess ] = useState<string[]>(['','','','','']);
  const [ sixthGuess , setSixthGuess ] = useState<string[]>(['','','','','']);
  const [ level, setLevel ] = useState<number>(1);
  console.log(level)

  const guessSetterMap: GuessSetterMap = {
    1: setFirstGuess,
    2: setSecondGuess,
    3: setThirdGuess,
    4: setFourthGuess,
    5: setFifthGuess,
    6: setSixthGuess,
  }

  const handleKeyClick = (e: MouseEvent<HTMLButtonElement>) => {
    // TODO: add conditionals to add to different arrays based on the current level
    e.preventDefault();
    const target: string = e.currentTarget.id
    
    // Use the map to invoke correct setter then itterate to find th first available spot
    guessSetterMap[level](prevState => {
        for (let i=0; i<prevState.length; i++) {
            if (prevState[i] === '') {
                // console.log(e.currentTarget)
                prevState[i] = target;
                break;
            }
        }
        console.log(prevState)
        return [...prevState];
    });
  }

  const handleCheck = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // check that the length of the word is valid
    // check that the word is a valid word
    // check if word mathces the key
    // if all of these are false update the level to level 2 and apply needed styling to the tiles
    setLevel(prevLevel => prevLevel + 1);
  }

  return (
    <main>
        {/* TODO: boardrow will need to accept props */}
        <BoardRow  guess={firstGuess} />
        <BoardRow guess={secondGuess} />
        <BoardRow guess={thirdGuess} />
        <BoardRow guess={fourthGuess} />
        <BoardRow guess={fifthGuess} />
        <BoardRow guess={sixthGuess} />
        <KeyboardDisplay handleKeyClick={handleKeyClick} handleCheck={handleCheck}/>
    </main>
  )
}
