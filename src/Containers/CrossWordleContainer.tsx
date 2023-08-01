import React, { useMemo, useState, MouseEvent } from 'react'
import { BoardRow } from '../Components/BoardRow'
import { KeyboardDisplay } from '../Components/KeyboardDisplay';

export const CrossWordleContainer = () => {
  const answer: string[] = ['w', 'o', 'r', 'd', 's'];
  // this may need a useEffect to update whenever the answer changes

  const placeHolder: string[] = useMemo(() => {
    return answer.map(() => '');
  }, [answer]) 
  

  const [ currentGuess , setCurrentGuess ] = useState<string[]>(placeHolder);
  const [ submitted, setSubmitted ] = useState<boolean>(false);
  const [ usedLetters, setUsedLetters ] = useState<Set<string>>(new Set());
  const [ relativeMatch, setRelativeMatch ] = useState<Set<string>>(new Set());
  const [ absoluteMatch, setAbsoluteMatch ] = useState<Set<string>>(new Set());

  const handleKeyClick = (e: MouseEvent<HTMLButtonElement>) => {
    // TODO: add conditionals to add to different arrays based on the current level
    e.preventDefault();
    const target: string = e.currentTarget.id
    
    setCurrentGuess(prevState => {
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
  };

  const handleCheck = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // check that the length of the word is valid
    for (const letter of currentGuess) {
        if (letter === '') {
            // setSubmissionResponse('short')
            return;
        } 
    }
    // check that the word is a valid word
    if ( currentGuess.join() === 'invalid') {
        // setSubmissionResponse('invalid');
        return
    }

    // check if word mathces the key
    if (currentGuess.join() === answer.join()) {
        setSubmitted(true);
        // console.log('correct!');
        // setSubmissionResponse('correct')
        return;
    }
    // make submission response blank
    // setSubmissionResponse('initial');

    // loop through the current guess and set all of the sets related to use/mathces
    for (let index=0; index < currentGuess.length; index++) {
        const letter: string = currentGuess[index];
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
    setCurrentGuess(placeHolder)
   setSubmitted(true);
    // setLevel(prevLevel => prevLevel + 1);
  }

  const handleBack = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // update state to remove the last letter in the array
    setCurrentGuess(prevState => {
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

  const resetSubmitted = (): void => {
    setSubmitted(false);
  }

  return (
    <main>
        <BoardRow answer={answer} guess={currentGuess} submitted={submitted} resetSubmitted={resetSubmitted} />
        <KeyboardDisplay
        usedLetters={usedLetters} handleKeyClick={handleKeyClick} 
        handleCheck={handleCheck} handleBack={handleBack}
        relativeMatch={relativeMatch} absoluteMatch={absoluteMatch}
        />
    </main>
  )
}
