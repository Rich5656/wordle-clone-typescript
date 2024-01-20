import React, { useState, useEffect, MouseEvent, useMemo } from 'react'
import { BoardRow } from '../Components/BoardRow'
import { KeyboardDisplay } from '../Components/KeyboardDisplay';
import { PreviousGuessRow } from '../Components/PreviousGuessRow';
//import { QuestionDisplayRow } from '../Components/QuestionDisplayRow';
import { apiSimulationAnagramAttack } from '../Common/utils';
import { AnagramAttackContainerProps } from '../Common/types';

const choices = apiSimulationAnagramAttack();


export const AnagramAttackContainer = ({handleScoreUpdate, minutes, seconds}: AnagramAttackContainerProps) => {
    const answerPair = useMemo(() => {
        const randomIndex: number = Math.floor(Math.random() * choices.length);
        return choices[randomIndex]
      }, []);

    // the method of setting this answer will be different for anagram attack
    const [ currentAnswer, setCurrentAnswer ] = useState<string[]>(answerPair.answer);
    // question should not be included on anagram attack
    // const [ currentQuestion, setCurrentQuestion ] = useState<string>(initialQuestionAnswer.question);
  
  
    const [ currentGuess, setCurrentGuess ] = useState<string[]>([...currentAnswer.map(() => '')]);
    const [ previousGuess, setPreviousGuess ] = useState<string[]>([...currentAnswer.map(() => '')]);
    const [ submitted, setSubmitted ] = useState<boolean>(false);
    const [ usedLetters, setUsedLetters ] = useState<Set<string>>(new Set());
    const [ relativeMatch, setRelativeMatch ] = useState<Set<string>>(new Set());
    const [ absoluteMatch, setAbsoluteMatch ] = useState<Set<string>>(new Set());
    const [ submissionType, setSubmissionType ] = useState<string>('initial')
  
    useEffect(() => {
        setSubmissionType('initial')
      }, [seconds]);
    
      const handleKeyClick = (e: MouseEvent<HTMLButtonElement>) => {
        // TODO: add conditionals to add to different arrays based on the current level
        e.preventDefault();
        // setShake(0);
        setSubmissionType('initial')
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
                // setShake(prevState => prevState + 1);
                setSubmissionType('shake');
                return;
            } 
        }
        // check that the word is a valid word
        if (currentGuess.join() === 'invalid') {
            // setShake(0);
            return
        }
    
        // check if word mathces the key
        if (currentGuess.join() === currentAnswer.join()) {
            // get new answer random question answer pair
            // const randomIndex: number = Math.floor(Math.random() * choices.length);
            // const questionAnswer = choices[randomIndex];
            setSubmissionType('correct');
            handleScoreUpdate(100);
            setCurrentAnswer(answerPair.answer);
            // setCurrentQuestion(questionAnswer.question);
            setCurrentGuess([...answerPair.answer.map(() => '')]);
            setPreviousGuess([...answerPair.answer.map(() => '')]);
            setUsedLetters(new Set());
            setAbsoluteMatch(new Set());
            setRelativeMatch(new Set())
            setSubmitted(true);
            // setSubmissionResponse('correct')
            return;
        }
    
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
        setSubmissionType('wrong')
        handleScoreUpdate(-20);
        setPreviousGuess([...currentGuess])
        setCurrentGuess(currentAnswer.map(() => ''))
        setSubmitted(true);
        // setLevel(prevLevel => prevLevel + 1);
      }
    
      const handleBack = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // setShake(0);
        setSubmissionType('initial')
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
    <>
        {/* <QuestionDisplayRow question={currentQuestion}/> */}
        <BoardRow answer={currentAnswer} guess={currentGuess} 
        submitted={submitted} resetSubmitted={resetSubmitted}
        submissionType={submissionType}
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
    </>
  )
}

export {}
