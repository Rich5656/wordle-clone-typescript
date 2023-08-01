import React from 'react'

interface SubmissionResponseDisplayProps {
    submissionResponse: string;
}

export const SubmissionResponseDisplay = ({submissionResponse}: SubmissionResponseDisplayProps) => {
  // TODO: conditonally render out any issues or success messages 
  const renderSubmissionResponse: () => JSX.Element = () => {
    if (submissionResponse === 'correct') {
        return <p className='submission-response-text'>You got it!</p>
    }
    if (submissionResponse === 'short') {
        return <p className='submission-response-text'>Too short! Make sure to use all available tiles.</p>
    }
    return <p className='submission-response-text empty'></p>
  };
  console.log(renderSubmissionResponse())

  return (
    <div className='submission-response-area'>{renderSubmissionResponse()}</div>
  )
}
