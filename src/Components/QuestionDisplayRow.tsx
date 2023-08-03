import React from 'react'

interface QuestionDisplayRowProps {
    question: string;
}

export const QuestionDisplayRow = ({ question }: QuestionDisplayRowProps) => {
  return (
    <div>
        <p className="question-display">
            {`Q. ${question}`}
        </p>
    </div>
  )
}
