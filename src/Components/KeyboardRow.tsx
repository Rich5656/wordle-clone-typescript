import React, {MouseEvent} from 'react'
import { KeyboardRowProps } from '../Common/types'


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
