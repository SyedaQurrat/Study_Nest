'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing personalized wellness suggestions based on daily log data and wellness goals.
 *
 * - getPersonalizedWellnessSuggestions - A function that generates personalized wellness suggestions.
 * - GetPersonalizedWellnessSuggestionsInput - The input type for the getPersonalizedWellnessSuggestions function.
 * - GetPersonalizedWellnessSuggestionsOutput - The return type for the getPersonalizedWellnessSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetPersonalizedWellnessSuggestionsInputSchema = z.object({
  sleepHours: z.number().describe('The number of hours of sleep the user got.'),
  waterIntake: z.number().describe('The amount of water the user drank in glasses.'),
  mood: z.enum(['happy', 'neutral', 'sad', 'stressed']).describe('The user\'s mood.'),
  wellnessGoal: z.string().describe('The user\'s wellness goal.'),
});

export type GetPersonalizedWellnessSuggestionsInput = z.infer<typeof GetPersonalizedWellnessSuggestionsInputSchema>;

const GetPersonalizedWellnessSuggestionsOutputSchema = z.object({
  suggestion: z.string().describe('A personalized wellness suggestion.'),
});

export type GetPersonalizedWellnessSuggestionsOutput = z.infer<typeof GetPersonalizedWellnessSuggestionsOutputSchema>;

export async function getPersonalizedWellnessSuggestions(
  input: GetPersonalizedWellnessSuggestionsInput
): Promise<GetPersonalizedWellnessSuggestionsOutput> {
  return getPersonalizedWellnessSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getPersonalizedWellnessSuggestionsPrompt',
  input: {schema: GetPersonalizedWellnessSuggestionsInputSchema},
  output: {schema: GetPersonalizedWellnessSuggestionsOutputSchema},
  prompt: `You are a wellness assistant providing personalized wellness suggestions based on the user's daily log data and wellness goals.

  Wellness Goal: {{{wellnessGoal}}}
  Sleep Hours: {{{sleepHours}}}
  Water Intake: {{{waterIntake}}}
  Mood: {{{mood}}}

  Provide a concise and specific wellness suggestion to help the user improve their overall well-being.
  If sleepHours is less than 6, suggest "Try to sleep earlier tonight."
  If waterIntake is less than 8, suggest "Drink at least 8 glasses of water daily."
  If mood is stressed, suggest "Do 5 minutes breathing exercise."
  Be conversational, and include Urdu phrases like "Aaj ki health tip" to introduce wellness tips.
  `,
});

const getPersonalizedWellnessSuggestionsFlow = ai.defineFlow(
  {
    name: 'getPersonalizedWellnessSuggestionsFlow',
    inputSchema: GetPersonalizedWellnessSuggestionsInputSchema,
    outputSchema: GetPersonalizedWellnessSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
