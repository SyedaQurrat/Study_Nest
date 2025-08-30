import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CallToAction() {
  return (
    <section id="cta" className="bg-primary py-20 text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to Elevate Your Learning?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
          Join thousands of students across Pakistan who are learning smarter, not harder.
        </p>
        <div className="mt-8">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">
              Get Started for Free
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
