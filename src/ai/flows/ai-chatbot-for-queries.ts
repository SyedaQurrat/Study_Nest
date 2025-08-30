'use server';
/**
 * @fileOverview This file defines a Genkit flow for answering student queries in math, physics, and chemistry.
 *
 * - answerStudentQuery - A function that answers student queries.
 * - AnswerStudentQueryInput - The input type for the answerStudentQuery function.
 * - AnswerStudentQueryOutput - The return type for the answerStudentQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerStudentQueryInputSchema = z.object({
  query: z.string().describe('The student\'s question related to math, physics, or chemistry.'),
});

export type AnswerStudentQueryInput = z.infer<typeof AnswerStudentQueryInputSchema>;

const AnswerStudentQueryOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the student\'s question.'),
});

export type AnswerStudentQueryOutput = z.infer<typeof AnswerStudentQueryOutputSchema>;

export async function answerStudentQuery(
  input: AnswerStudentQueryInput
): Promise<AnswerStudentQueryOutput> {
  return answerStudentQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerStudentQueryPrompt',
  input: {schema: AnswerStudentQueryInputSchema},
  output: {schema: AnswerStudentQueryOutputSchema},
  prompt: `You are an AI chatbot designed to answer student queries in math, physics, and chemistry.

  Question: {{{query}}}

  Provide a clear, accurate, and helpful answer to the student\'s question. Use examples where appropriate.
  If you cannot answer the question, state that you cannot answer the question.
  `,
});

const answerStudentQueryFlow = ai.defineFlow(
  {
    name: 'answerStudentQueryFlow',
    inputSchema: AnswerStudentQueryInputSchema,
    outputSchema: AnswerStudentQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
