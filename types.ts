export enum AppStage {
  IDENTITY = 'IDENTITY',
  DENIED = 'DENIED',
  WELCOME = 'WELCOME',
  REASONS = 'REASONS', // New interactive card section
  JOURNEY = 'JOURNEY', // New vertical scroll section
  LETTER = 'LETTER',   // Love letter section
  QUESTION = 'QUESTION',
  SUCCESS = 'SUCCESS',
}

export interface FloatingHeart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
}