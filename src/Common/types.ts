import { MouseEvent } from 'react';

export interface BoardRowProps {
    guess: string[];
    submitted: boolean;
    answer: string[];
    resetSubmitted: () => void;
    submissionType: string;
}

export interface CountdownDisplayProps {
    minutes: number;
    seconds: number;
}

export interface KeyboardDisplayProps {
    handleKeyClick: (e: MouseEvent<HTMLButtonElement>) => void;
    handleCheck: (e: MouseEvent<HTMLButtonElement>) => void;
    handleBack: (e: MouseEvent<HTMLButtonElement>) => void;
    usedLetters: Set<string>;
    relativeMatch: Set<string>;
    absoluteMatch: Set<string>;
}

export interface PreviousGuessProps {
    previousGuess: string[];
    relativeMatch: Set<string>;
    absoluteMatch: Set<string>;
    answer: string[];
}

export interface ScoreDisplayProps {
    score: number;
}

export interface SubmissionResponseDisplayProps {
    submissionResponse: string;
}

export interface QuestionDisplayRowProps {
    question: string;
}

export interface CrossWordleContainerProps {
    handleScoreUpdate: (points: number) => void;
    minutes: number;
    seconds: number;
}

export interface AnagramAttackContainerProps {
    handleScoreUpdate: (points: number) => void;
    minutes: number;
    seconds: number;
}

export type KeyboardRowProps = {
    keyline: string[];
    handleKeyClick: (e: MouseEvent<HTMLButtonElement>) => void;
    usedLetters: Set<string>;
    relativeMatch: Set<string>;
    absoluteMatch: Set<string>;
}



