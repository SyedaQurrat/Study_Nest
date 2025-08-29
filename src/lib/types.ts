import type { Timestamp } from 'firebase/firestore';

export type UserProfile = {
  uid: string;
  email: string;
  name:string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  wellnessGoal: string;
};

export type WellnessLog = {
  id: string; // Firestore document ID
  userId: string;
  date: string; // ISO string e.g., "2024-05-21"
  sleepHours: number;
  waterIntake: number;
  meals: string;
  mood: 'happy' | 'neutral' | 'sad' | 'stressed';
  steps: number;
  createdAt: Timestamp;
};

export type WellnessLogInServer = Omit<WellnessLog, 'id'>;

export type WellnessLogFormValues = {
  date: Date;
  sleepHours: number;
  waterIntake: number;
  meals: string;
  mood: 'happy' | 'neutral' | 'sad' | 'stressed';
  steps: number;
};
