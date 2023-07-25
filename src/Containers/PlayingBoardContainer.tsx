import React, { useState, MouseEvent } from 'react';
import { BoardRow } from '../Components/BoardRow';
import { KeyboardDisplay } from '../Components/KeyboardDisplay';


interface GuessSetterMap {
    [position: number]: React.Dispatch<React.SetStateAction<string[]>>;
}

interface SubmissionSetterMap {
    [position: number]: React.Dispatch<React.SetStateAction<boolean>>
}

interface GuessMap {
    [position: number]: string[];
}


export const PlayingBoardContainer = () => {
  const answer: string[] = ['w', 'o', 'r', 'd', 's'];
  const [ firstGuess , setFirstGuess ] = useState<string[]>(['','','','','']);
  const [ firstSubmitted, setFristSubmitted ] = useState<boolean>(false);

  const [ secondGuess , setSecondGuess ] = useState<string[]>(['','','','','']);
  const [ secondSubmitted, setSecondSubmitted ] = useState<boolean>(false);

  const [ thirdGuess , setThirdGuess ] = useState<string[]>(['','','','','']);
  const [ thirdSubmitted, setThirdSubmitted ] = useState<boolean>(false);

  const [ fourthGuess , setFourthGuess ] = useState<string[]>(['','','','','']);
  const [ fourthSubmitted, setFourthSubmitted ] = useState<boolean>(false);

  const [ fifthGuess , setFifthGuess ] = useState<string[]>(['','','','','']);
  const [ fifthSubmitted, setFifthSubmitted ] = useState<boolean>(false);

  const [ sixthGuess , setSixthGuess ] = useState<string[]>(['','','','','']);
  const [ sixthSubmitted, setSixthSubmitted ] = useState<boolean>(false);

  const [ level, setLevel ] = useState<number>(1);

  const [ usedLetters, setUsedLetters ] = useState<Set<string>>(new Set());
  
  const guessMap: GuessMap = {
    1: firstGuess,
    2: secondGuess,
    3: thirdGuess,
    4: fourthGuess,
    5: fifthGuess,
    6: sixthGuess,
  }

  const guessSetterMap: GuessSetterMap = {
    1: setFirstGuess,
    2: setSecondGuess,
    3: setThirdGuess,
    4: setFourthGuess,
    5: setFifthGuess,
    6: setSixthGuess,
  }

  const submissionSetterMap: SubmissionSetterMap = {
    1: setFristSubmitted,
    2: setSecondSubmitted,
    3: setThirdSubmitted,
    4: setFourthSubmitted,
    5: setFifthSubmitted,
    6: setSixthSubmitted,
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
    for (const letter of guessMap[level]) {
        if (letter === '') {
            console.log('too short')
            return;
        } 
    }
    // check that the word is a valid word
    // check if word mathces the key
    if (guessMap[level].join() === answer.join()) {
        submissionSetterMap[level](true);
        console.log('correct!');
        return;
    }
    // if all of these are false update the level to level 2 and apply needed styling to the tiles based on absolute and relative match
    setUsedLetters(prevState => {
        const newState = new Set(prevState);
        for (const letter of guessMap[level]) {
            newState.add(letter);
        }
        return newState;
    });
    submissionSetterMap[level](true);
    setLevel(prevLevel => prevLevel + 1);
  }

  return (
    <main>
        {/* TODO: boardrow will need to accept props */}
        <BoardRow  guess={firstGuess} submitted={firstSubmitted} answer={answer}/>
        <BoardRow guess={secondGuess} submitted={secondSubmitted} answer={answer}/>
        <BoardRow guess={thirdGuess} submitted={thirdSubmitted} answer={answer}/>
        <BoardRow guess={fourthGuess} submitted={fourthSubmitted} answer={answer}/>
        <BoardRow guess={fifthGuess} submitted={fifthSubmitted} answer={answer}/>
        <BoardRow guess={sixthGuess} submitted={sixthSubmitted} answer={answer}/>
        <KeyboardDisplay usedLetters={usedLetters} handleKeyClick={handleKeyClick} handleCheck={handleCheck}/>
    </main>
  )
}
