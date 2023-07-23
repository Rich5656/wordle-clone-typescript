import React, {MouseEvent} from 'react'
import { KeyboardRow } from './KeyboardRow'

interface KeyboardDisplayProps {
    handleKeyClick: (e: MouseEvent<HTMLButtonElement>) => void;
    handleCheck: (e: MouseEvent<HTMLButtonElement>) => void
}

const keyLine1: string[] = ['q','w','e','r','t','y','u','i','o','p'];
const keyLine2: string[] = ['a','s','d','f','g','h','j','k','l'];
const keyLine3: string[] = ['z','x','c','v','b','n','m'];

export const KeyboardDisplay = ({handleKeyClick, handleCheck}: KeyboardDisplayProps) => {
  return (
    <div>
        <KeyboardRow keyline={keyLine1} handleKeyClick={handleKeyClick}/>
        <KeyboardRow keyline={keyLine2} handleKeyClick={handleKeyClick}/>
        <KeyboardRow keyline={keyLine3} handleKeyClick={handleKeyClick}/>
        <button onClick={handleCheck}>Submit</button>
    </div>
  )
}
