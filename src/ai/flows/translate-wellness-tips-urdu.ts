'use server';
/**
 * @fileOverview This file defines a Genkit flow to translate wellness tips from English to Urdu.
 *
 * - translateWellnessTipsToUrdu - A function that takes English wellness tips as input and returns the Urdu translation.
 * - TranslateWellnessTipsToUrduInput - The input type for the translateWellnessTipsToUrdu function.
 * - TranslateWellnessTipsToUrduOutput - The return type for the translateWellnessTipsToUrdu function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateWellnessTipsToUrduInputSchema = z.object({
  englishTip: z.string().describe('The wellness tip in English.'),
});
export type TranslateWellnessTipsToUrduInput = z.infer<typeof TranslateWellnessTipsToUrduInputSchema>;

const TranslateWellnessTipsToUrduOutputSchema = z.object({
  urduTip: z.string().describe('The wellness tip translated to Urdu.'),
});
export type TranslateWellnessTipsToUrduOutput = z.infer<typeof TranslateWellnessTipsToUrduOutputSchema>;

export async function translateWellnessTipsToUrdu(input: TranslateWellnessTipsToUrduInput): Promise<TranslateWellnessTipsToUrduOutput> {
  return translateWellnessTipsToUrduFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateWellnessTipsToUrduPrompt',
  input: {schema: TranslateWellnessTipsToUrduInputSchema},
  output: {schema: TranslateWellnessTipsToUrduOutputSchema},
  prompt: `Translate the following English wellness tip to Urdu:\n\n{{englishTip}}`,
});

const translateWellnessTipsToUrduFlow = ai.defineFlow(
  {
    name: 'translateWellnessTipsToUrduFlow',
    inputSchema: TranslateWellnessTipsToUrduInputSchema,
    outputSchema: TranslateWellnessTipsToUrduOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
