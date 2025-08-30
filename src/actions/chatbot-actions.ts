'use server';

import { answerStudentQuery } from '@/ai/flows/ai-chatbot-for-queries';

export async function getAiChatbotResponse(query: string) {
  try {
    const response = await answerStudentQuery({ query });
    return response.answer;
  } catch (error) {
    console.error('Error getting AI chatbot response:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}
