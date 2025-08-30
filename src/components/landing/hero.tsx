import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-500 to-purple-600 py-20 text-white sm:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          StudyNest
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100 sm:text-xl">
          One App for All Your Studies. Your complete learning companion for
          success in Pakistan.
        </p>
        <div className="mt-8 flex justify-center">
          <Button size="lg" asChild>
            <Link href="/signup">
              Get Started Free
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
