import { Card } from '@/components/ui/card';
import { GraduationCap, BookOpenCheck, Bot } from 'lucide-react';

const steps = [
  {
    icon: <GraduationCap className="h-10 w-10 text-primary" />,
    title: 'Select Your Class',
    description: 'Sign up and choose your grade, from 6th class to university level, to get personalized content.',
  },
  {
    icon: <BookOpenCheck className="h-10 w-10 text-primary" />,
    title: 'Access Resources',
    description: 'Instantly get your digital textbooks, view assignments, and use powerful study tools.',
  },
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: 'Get AI Help',
    description: 'Whenever you\'re stuck, our AI Tutor is ready to explain concepts and solve problems 24/7.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get Started in 3 Simple Steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Learning on StudyNest is easy and intuitive. Here's how to begin your journey.
          </p>
        </div>
        <div className="relative mt-16">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1 w-2/3 bg-gray-200 hidden md:block" aria-hidden="true"></div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
                <div key={index} className="relative">
                    <Card className="p-8 text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-8 ring-background">
                        {step.icon}
                        </div>
                        <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                        <p className="mt-2 text-muted-foreground">{step.description}</p>
                    </Card>
                </div>
            ))}
            </div>
        </div>
      </div>
    </section>
  );
}
