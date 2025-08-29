'use server';
/**
 * @fileOverview An AI agent that generates a personalized wellness plan based on user profile and past wellness logs.
 *
 * - generatePersonalizedWellnessPlan - A function that generates a personalized wellness plan.
 * - GeneratePersonalizedWellnessPlanInput - The input type for the generatePersonalizedWellnessPlan function.
 * - GeneratePersonalizedWellnessPlanOutput - The return type for the generatePersonalizedWellnessPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedWellnessPlanInputSchema = z.object({
  age: z.number().describe('The user\'s age.'),
  gender: z.string().describe('The user\'s gender.'),
  wellnessGoal: z.string().describe('The user\'s wellness goal.'),
  pastWellnessLogs: z.string().describe('The user\'s past wellness logs in JSON format.'),
});
export type GeneratePersonalizedWellnessPlanInput = z.infer<typeof GeneratePersonalizedWellnessPlanInputSchema>;

const GeneratePersonalizedWellnessPlanOutputSchema = z.object({
  dietSuggestions: z.string().describe('Suggestions for diet.'),
  exerciseSuggestions: z.string().describe('Suggestions for exercise.'),
  sleepSuggestions: z.string().describe('Suggestions for sleep.'),
  mentalWellbeingSuggestions: z.string().describe('Suggestions for mental wellbeing.'),
});
export type GeneratePersonalizedWellnessPlanOutput = z.infer<typeof GeneratePersonalizedWellnessPlanOutputSchema>;

export async function generatePersonalizedWellnessPlan(input: GeneratePersonalizedWellnessPlanInput): Promise<GeneratePersonalizedWellnessPlanOutput> {
  return generatePersonalizedWellnessPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedWellnessPlanPrompt',
  input: {schema: GeneratePersonalizedWellnessPlanInputSchema},
  output: {schema: GeneratePersonalizedWellnessPlanOutputSchema},
  prompt: `You are a wellness expert. Generate a personalized wellness plan based on the user's profile and past wellness logs.

User Profile:
Age: {{{age}}}
Gender: {{{gender}}}
Wellness Goal: {{{wellnessGoal}}}

Past Wellness Logs: {{{pastWellnessLogs}}}

Provide suggestions for diet, exercise, sleep, and mental wellbeing. Return the suggestions in JSON format.

Make sure to explain each suggestion. For example, instead of "Eat more vegetables", say "Eat at least five servings of vegetables per day to ensure you get enough vitamins and minerals."

Be conversational, and include Urdu phrases like "Aaj ki health tip" to introduce wellness tips.
`,
});

const generatePersonalizedWellnessPlanFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedWellnessPlanFlow',
    inputSchema: GeneratePersonalizedWellnessPlanInputSchema,
    outputSchema: GeneratePersonalizedWellnessPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
