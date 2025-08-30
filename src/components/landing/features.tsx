import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Bot, FileText, Calculator } from 'lucide-react';

const features = [
  {
    icon: <BookCopy className="h-8 w-8 text-primary" />,
    title: 'Digital Books Library',
    description: 'Access all your course textbooks and notes in one place, anytime, anywhere.',
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: 'AI Tutor Chatbot',
    description: 'Get instant help 24/7 with complex topics from our intelligent AI-powered tutor.',
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: 'Assignment System',
    description: 'Never miss a deadline. Submit and track all your assignments effortlessly.',
  },
  {
    icon: <Calculator className="h-8 w-8 text-primary" />,
    title: 'Built-in Calculators',
    description: 'From simple math to scientific equations, use our handy in-app calculators.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Succeed
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            StudyNest packs powerful tools to help you excel in your studies, from 6th grade to university.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
                <CardDescription className="mt-2">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
