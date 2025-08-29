'use server';
/**
 * @fileOverview This file defines a Genkit flow for analyzing mood entries over time and providing personalized coping strategies.
 *
 * - analyzeMoodAndProvideCopingStrategies - A function that analyzes mood entries and provides coping strategies.
 * - AnalyzeMoodAndProvideCopingStrategiesInput - The input type for the analyzeMoodAndProvideCopingStrategies function.
 * - AnalyzeMoodAndProvideCopingStrategiesOutput - The return type for the analyzeMoodAndProvideCopingStrategies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMoodAndProvideCopingStrategiesInputSchema = z.object({
  moodEntries: z.array(
    z.object({
      date: z.string().describe('The date of the mood entry.'),
      mood: z.enum(['happy', 'neutral', 'sad', 'stressed']).describe('The mood recorded in the entry.'),
      details: z.string().optional().describe('Additional details about the mood (optional).'),
    })
  ).describe('An array of mood entries over time.'),
  wellnessGoal: z.string().describe('The wellness goal of the user.'),
});

export type AnalyzeMoodAndProvideCopingStrategiesInput = z.infer<typeof AnalyzeMoodAndProvideCopingStrategiesInputSchema>;

const AnalyzeMoodAndProvideCopingStrategiesOutputSchema = z.object({
  analysisSummary: z.string().describe('A summary of the mood trends and patterns.'),
  copingStrategies: z.array(
    z.object({
      strategy: z.string().describe('A specific coping strategy suggestion.'),
      resourceLink: z.string().optional().describe('A link to a resource providing more information about the strategy (optional).'),
    })
  ).describe('An array of personalized coping strategies and resources.'),
});

export type AnalyzeMoodAndProvideCopingStrategiesOutput = z.infer<typeof AnalyzeMoodAndProvideCopingStrategiesOutputSchema>;

export async function analyzeMoodAndProvideCopingStrategies(
  input: AnalyzeMoodAndProvideCopingStrategiesInput
): Promise<AnalyzeMoodAndProvideCopingStrategiesOutput> {
  return analyzeMoodAndProvideCopingStrategiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMoodAndProvideCopingStrategiesPrompt',
  input: {schema: AnalyzeMoodAndProvideCopingStrategiesInputSchema},
  output: {schema: AnalyzeMoodAndProvideCopingStrategiesOutputSchema},
  prompt: `You are a wellness assistant analyzing mood entries and providing personalized coping strategies.

  Analyze the following mood entries over time, taking into account the user's wellness goal: {{{wellnessGoal}}}.

  Mood Entries:
  {{#each moodEntries}}
  - Date: {{date}}, Mood: {{mood}}{{#if details}}, Details: {{details}}{{/if}}
  {{/each}}

  Provide a summary of the mood trends and patterns in the analysisSummary field.
  Then provide personalized coping strategies and resources to help manage stress, anxiety, or other negative emotions in the copingStrategies field.
  Include resource links where possible.
  Be concise and specific.
  `,
});

const analyzeMoodAndProvideCopingStrategiesFlow = ai.defineFlow(
  {
    name: 'analyzeMoodAndProvideCopingStrategiesFlow',
    inputSchema: AnalyzeMoodAndProvideCopingStrategiesInputSchema,
    outputSchema: AnalyzeMoodAndProvideCopingStrategiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
