import React from 'react';
import { QuestionDisplayRowProps } from '../Common/types';

export const QuestionDisplayRow = ({ question }: QuestionDisplayRowProps) => {
  return (
    <div>
        <p className="question-display">
            {`Q. ${question}`}
        </p>
    </div>
  )
}
