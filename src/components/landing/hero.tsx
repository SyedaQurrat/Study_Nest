'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';

export function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[400px] overflow-hidden bg-primary text-primary-foreground sm:h-[80vh] sm:min-h-[600px]">
      <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="hero-content">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            StudyNest
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg opacity-90 sm:text-xl">
            One App for All Your Studies. Your complete learning companion for
            success in Pakistan.
          </p>
          <div className="mt-8 flex justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
