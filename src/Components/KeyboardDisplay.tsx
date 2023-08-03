import React, {MouseEvent} from 'react'
import { KeyboardRow } from './KeyboardRow'

interface KeyboardDisplayProps {
    handleKeyClick: (e: MouseEvent<HTMLButtonElement>) => void;
    handleCheck: (e: MouseEvent<HTMLButtonElement>) => void;
    handleBack: (e: MouseEvent<HTMLButtonElement>) => void;
    usedLetters: Set<string>;
    relativeMatch: Set<string>;
    absoluteMatch: Set<string>;
}

const keyLine1: string[] = ['q','w','e','r','t','y','u','i','o','p'];
const keyLine2: string[] = ['a','s','d','f','g','h','j','k','l'];
const keyLine3: string[] = ['z','x','c','v','b','n','m'];

export const KeyboardDisplay = ({handleKeyClick, handleCheck, handleBack, usedLetters, relativeMatch, absoluteMatch}: KeyboardDisplayProps) => {
  return (
    <div>
        <KeyboardRow 
        usedLetters={usedLetters} relativeMatch={relativeMatch} absoluteMatch={absoluteMatch} 
        keyline={keyLine1} handleKeyClick={handleKeyClick}
        />
        <KeyboardRow 
        usedLetters={usedLetters} relativeMatch={relativeMatch} absoluteMatch={absoluteMatch}
        keyline={keyLine2} handleKeyClick={handleKeyClick}
        />
        <KeyboardRow usedLetters={usedLetters} relativeMatch={relativeMatch} absoluteMatch={absoluteMatch}
        keyline={keyLine3} handleKeyClick={handleKeyClick}
        />
        <button className="keyboard-actions generic-key" onClick={handleBack}>Back</button>
        <button className='keyboard-actions generic-key' onClick={handleCheck}>Submit</button>
    </div>
  )
}
