import React, {MouseEvent} from 'react'

type KeyboardRowProps = {
    keyline: string[];
    handleKeyClick: (e: MouseEvent<HTMLButtonElement>) => void;
    usedLetters: Set<string>;
}

export const KeyboardRow = ({keyline, handleKeyClick, usedLetters}:KeyboardRowProps ) => {
  return (
    <div className='keyboard-row'>
        {/* TODO: us conditionals to style the button as relative, absolute, not-present */}
        {keyline.map(key => { 
            if (usedLetters.has(key)) {
                return <button className='generic-key used' id={key} onClick={handleKeyClick}>{key}</button>
            }
            return <button className='generic-key' id={key} onClick={handleKeyClick}>{key}</button>
        })}
    </div>
  )
}
