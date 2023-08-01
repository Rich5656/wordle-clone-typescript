import React, { useState, MouseEvent } from 'react';
import { BoardRow } from '../Components/BoardRow';
import { KeyboardDisplay } from '../Components/KeyboardDisplay';
import { SubmissionResponseDisplay } from '../Components/SubmissionResponseDisplay';


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
  const [ relativeMatch, setRelativeMatch ] = useState<Set<string>>(new Set());
  const [ absoluteMatch, setAbsoluteMatch ] = useState<Set<string>>(new Set());

  const [ submissionResponse, setSubmissionResponse ] = useState<string>('initial');
  
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
            setSubmissionResponse('short')
            return;
        } 
    }
    // check that the word is a valid word
    if ( guessMap[level].join() === 'invalid') {
        setSubmissionResponse('invalid');
        return
    }

    // check if word mathces the key
    if (guessMap[level].join() === answer.join()) {
        submissionSetterMap[level](true);
        // console.log('correct!');
        setSubmissionResponse('correct')
        return;
    }
    // make submission response blank
    setSubmissionResponse('initial');

    // loop through the current guess and set all of the sets related to use/mathces
    for (let index=0; index < guessMap[level].length; index++) {
        const letter: string = guessMap[level][index];
        setUsedLetters(prevState => {
            prevState.add(letter);
            return prevState;
        })
        // check for absolute match
        if (letter === answer[index]) {
            setAbsoluteMatch(preveState => {
                preveState.add(letter);
                return preveState;
            })
        }
        // relative match check
        if (answer.includes(letter)) {
            setRelativeMatch(prevState => {
                prevState.add(letter);
                return prevState
            })
        }
    }
    submissionSetterMap[level](true);
    setLevel(prevLevel => prevLevel + 1);
  }

  const handleBack = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // update state to remove the last letter in the array
    guessSetterMap[level](prevState => {
        if (prevState[prevState.length - 1] !== '') {
            prevState[prevState.length - 1] = '';
            return [...prevState]
        }
        for (let i=0; i<prevState.length; i++) {
            
            if (prevState[i] === '' && i !== 0) {
                // console.log(e.currentTarget)
                prevState[i-1] = '';
                break;
            }
        }
        // console.log(prevState)
        return [...prevState];
    });
    
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
        <SubmissionResponseDisplay submissionResponse={submissionResponse}/>
        <KeyboardDisplay 
        usedLetters={usedLetters} handleKeyClick={handleKeyClick} 
        handleCheck={handleCheck} handleBack={handleBack}
        relativeMatch={relativeMatch} absoluteMatch={absoluteMatch}
        />
    </main>
  )
}
