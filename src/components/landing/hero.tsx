'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden text-primary-foreground sm:h-[70vh]">
      {/* Background Image */}
      <Image
        src="https://picsum.photos/1600/900"
        alt="A collection of books on a shelf"
        data-ai-hint="library books"
        fill
        className="object-cover"
        priority // Load the hero image first
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="hero-content">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Your Digital School Bag
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/90 sm:text-xl">
            All your school books, tools, and learning resources in one place.
          </p>
          <div className="mt-8 flex justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">
                Get Started
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
