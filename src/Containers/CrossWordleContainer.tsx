import React, { useMemo, useState, MouseEvent  } from 'react'
import { BoardRow } from '../Components/BoardRow'
import { KeyboardDisplay } from '../Components/KeyboardDisplay';
import { PreviousGuessRow } from '../Components/PreviousGuessRow';
import { QuestionDisplayRow } from '../Components/QuestionDisplayRow';
import { apiSimulation } from '../dist/ApiSimulationData';
const choices = apiSimulation();

export const CrossWordleContainer = () => {
  // this will need to be done with an api call and needs to make a new call every time a correct submission is made
//   const questionAnswer = {
//     question: "Multiple combinations of letters.",
//     answer: ['w','o','r','d','s']
//   }

//   const answer: string[] = [...questionAnswer.answer] //['w', 'o', 'r', 'd', 's'];
 
  const initialQuestionAnswer = useMemo(() => {
    const randomIndex: number = Math.floor(Math.random() * choices.length);
    return choices[randomIndex]
  }, []);

  const [ currentAnswer, setCurrentAnswer ] = useState<string[]>(initialQuestionAnswer.answer);
  const [ currentQuestion, setCurrentQuestion ] = useState<string>(initialQuestionAnswer.question);


  const [ currentGuess , setCurrentGuess ] = useState<string[]>([...currentAnswer.map(() => '')]);
  const [ previousGuess, setPreviousGuess ] = useState<string[]>([...currentAnswer.map(() => '')]);
  const [ submitted, setSubmitted ] = useState<boolean>(false);
  const [ usedLetters, setUsedLetters ] = useState<Set<string>>(new Set());
  const [ relativeMatch, setRelativeMatch ] = useState<Set<string>>(new Set());
  const [ absoluteMatch, setAbsoluteMatch ] = useState<Set<string>>(new Set());
  const [ shake, setShake ] = useState<boolean>(false);

  const resetShake = (): void => {
    setShake(false);
  }


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
            setShake(true);
            // setSubmissionResponse('short')
            return;
        } 
    }
    // check that the word is a valid word
    if (currentGuess.join() === 'invalid') {
        setShake(true);
        // setSubmissionResponse('invalid');
        return
    }

    // check if word mathces the key
    if (currentGuess.join() === currentAnswer.join()) {
        // get new answer random question answer pair
        const randomIndex: number = Math.floor(Math.random() * choices.length);
        const questionAnswer = choices[randomIndex];
        setCurrentAnswer(questionAnswer.answer);
        setCurrentQuestion(questionAnswer.question);
        setCurrentGuess([...questionAnswer.answer.map(() => '')]);
        setPreviousGuess([...questionAnswer.answer.map(() => '')]);
        setUsedLetters(new Set());
        setAbsoluteMatch(new Set());
        setRelativeMatch(new Set())
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
        if (letter === currentAnswer[index]) {
            setAbsoluteMatch(preveState => {
                preveState.add(letter);
                return preveState;
            })
        }
        // relative match check
        if (currentAnswer.includes(letter)) {
            setRelativeMatch(prevState => {
                prevState.add(letter);
                return prevState
            })
        }
    }
    setPreviousGuess([...currentGuess])
    setCurrentGuess(currentAnswer.map(() => ''))
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
        <QuestionDisplayRow question={currentQuestion}/>
        <BoardRow answer={currentAnswer} guess={currentGuess} 
        submitted={submitted} resetSubmitted={resetSubmitted}
        shake={shake} resetShake={resetShake}
        />
        {/* need to render the previous guess, should be very similar to boardrow */}
        <PreviousGuessRow
        previousGuess={previousGuess} relativeMatch={relativeMatch} 
        absoluteMatch={absoluteMatch}
        answer={currentAnswer}
        />
        <KeyboardDisplay
        usedLetters={usedLetters} handleKeyClick={handleKeyClick} 
        handleCheck={handleCheck} handleBack={handleBack}
        relativeMatch={relativeMatch} absoluteMatch={absoluteMatch}
        />
    </main>
  )
}
