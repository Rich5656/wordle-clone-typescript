import React, {MouseEvent} from 'react'

type KeyboardRowProps = {
    keyline: string[];
    handleKeyClick: (e: MouseEvent<HTMLButtonElement>) => void;
    usedLetters: Set<string>;
    relativeMatch: Set<string>;
    absoluteMatch: Set<string>;
}

export const KeyboardRow = ({keyline, handleKeyClick, usedLetters, relativeMatch, absoluteMatch}:KeyboardRowProps ) => {
  const renderKeys: () => JSX.Element[] = () => {
    return keyline.map(key => {
        if (absoluteMatch.has(key)) {
            return <button className='generic-key absolute-match' id={key} onClick={handleKeyClick}>{key}</button>
        }
        if (relativeMatch.has(key)) {
            return <button className='generic-key relative-match' id={key} onClick={handleKeyClick}>{key}</button>
        } 
        if (usedLetters.has(key)) {
            return <button className='generic-key used' id={key} onClick={handleKeyClick}>{key}</button>
        }
        return <button className='generic-key' id={key} onClick={handleKeyClick}>{key}</button>
    })
  }

  return (
    <div className='keyboard-row'>
        {renderKeys()}
    </div>
  )
}
