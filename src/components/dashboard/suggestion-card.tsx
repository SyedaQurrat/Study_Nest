import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { Lightbulb, Sparkles, BrainCircuit, ShieldCheck } from "lucide-react";

type SuggestionCardProps = {
  suggestions: any;
  className?: string;
};

export function SuggestionCard({ suggestions, className }: SuggestionCardProps) {
  if (!suggestions || !suggestions.plan) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="text-primary"/>
            Aaj ki Health Tip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Start logging your daily wellness to receive personalized tips!</p>
        </CardContent>
      </Card>
    );
  }

  const { plan, strategies } = suggestions;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Sparkles className="text-primary"/>
          Your Personalized Wellness Plan
        </CardTitle>
        <CardDescription>AI-powered suggestions just for you. Aaj ki health tip!</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-semibold">Diet Suggestions</h4>
          <p className="text-sm text-muted-foreground">{plan.dietSuggestions}</p>
        </div>
        <Separator />
        <div className="space-y-2">
          <h4 className="font-semibold">Exercise Suggestions</h4>
          <p className="text-sm text-muted-foreground">{plan.exerciseSuggestions}</p>
        </div>
        <Separator />
        <div className="space-y-2">
          <h4 className="font-semibold">Sleep Suggestions</h4>
          <p className="text-sm text-muted-foreground">{plan.sleepSuggestions}</p>
        </div>
         <Separator />
        <div className="space-y-2">
          <h4 className="font-semibold">Mental Wellbeing</h4>
          <p className="text-sm text-muted-foreground">{plan.mentalWellbeingSuggestions}</p>
        </div>

        {strategies && (
          <>
            <Separator />
            <div className="p-4 bg-secondary rounded-lg">
                <h3 className="font-bold text-lg flex items-center gap-2 mb-2"><BrainCircuit className="text-accent-foreground"/>Coping Strategies for Stress</h3>
                <p className="text-sm text-muted-foreground mb-4">{strategies.analysisSummary}</p>
                <ul className="space-y-2">
                {strategies.copingStrategies.map((item: any, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                        <ShieldCheck className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                        <span>
                            <strong>{item.strategy}</strong>
                            {item.resourceLink && <a href={item.resourceLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-2">[Learn More]</a>}
                        </span>
                    </li>
                ))}
                </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
