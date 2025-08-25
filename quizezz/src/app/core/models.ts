export interface Option {
  // option id
  id: string;

  // text shown on the option 
  text: string;

  // whether this option is the correct answer
  correct: boolean;
}

export interface Question {
  // question id
  id: string;

  // question text shown to the player
  text: string;

  // list of answer options in display order
  options: Option[];
}

export interface QuizSettings {
  //  time limit per question in seconds
  timePerQuestion: number;
}

export interface Quiz {
  //  quiz id
  id: string;

  // title shown on the quiz header 
  title: string;

  // configuration for runtime behavior
  settings: QuizSettings;

  // ordered list of questions to play
  questions: Question[];
}

export interface ScoreEntry {
  // plyaer name
  name: string;

  // final numeric score
  score: number;

  // unix epoch time in milliseconds when the score was recorded
  when: number;
}

// feedback state after answering a question
export type FeedbackKind = 'correct' | 'wrong' | null;

// high-level game lifecycle status
export type Status = 'idle' | 'playing' | 'done';
