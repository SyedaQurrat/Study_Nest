'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting activities based on the user's mood.
 *
 * - suggestActivitiesForMood - A function that suggests activities based on the user's mood.
 * - SuggestActivitiesForMoodInput - The input type for the suggestActivitiesForMood function.
 * - SuggestActivitiesForMoodOutput - The return type for the suggestActivitiesForMood function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestActivitiesForMoodInputSchema = z.object({
  mood: z.enum(['happy', 'neutral', 'sad', 'stressed']).describe('The user\'s current mood.'),
});

export type SuggestActivitiesForMoodInput = z.infer<typeof SuggestActivitiesForMoodInputSchema>;

const SuggestActivitiesForMoodOutputSchema = z.object({
  suggestedActivities: z.array(
    z.string().describe('A suggested activity to improve the user\'s mood.')
  ).describe('An array of activities suggested based on mood.'),
});

export type SuggestActivitiesForMoodOutput = z.infer<typeof SuggestActivitiesForMoodOutputSchema>;

export async function suggestActivitiesForMood(
  input: SuggestActivitiesForMoodInput
): Promise<SuggestActivitiesForMoodOutput> {
  return suggestActivitiesForMoodFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestActivitiesForMoodPrompt',
  input: {schema: SuggestActivitiesForMoodInputSchema},
  output: {schema: SuggestActivitiesForMoodOutputSchema},
  prompt: `You are a wellness assistant. Suggest activities based on the user\'s mood.

  Mood: {{{mood}}}

  Based on the user\'s mood, suggest activities to improve their mood.
  If the mood is stressed, suggest activities like guided meditations or breathing exercises.
  Be concise and specific.
  `,
});

const suggestActivitiesForMoodFlow = ai.defineFlow(
  {
    name: 'suggestActivitiesForMoodFlow',
    inputSchema: SuggestActivitiesForMoodInputSchema,
    outputSchema: SuggestActivitiesForMoodOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
