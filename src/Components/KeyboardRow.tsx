import React, {MouseEvent} from 'react'

type KeyboardRowProps = {
    keyline: string[];
    handleKeyClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const KeyboardRow = ({keyline, handleKeyClick}:KeyboardRowProps ) => {
  return (
    <div className='keyboard-row'>
        {keyline.map(key => <button id={key} onClick={handleKeyClick}>{key}</button>)}
    </div>
  )
}
