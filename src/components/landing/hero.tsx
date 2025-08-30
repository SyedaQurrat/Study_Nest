'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function Hero() {
  const root = useRef(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline()
        .to('.hero-bg', {
          scale: 1,
          duration: 1.5,
          ease: 'power3.inOut',
        })
        .fromTo(
          '.hero-content > *',
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
          },
          '-=1'
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[60vh] min-h-[400px] overflow-hidden text-white sm:h-[80vh] sm:min-h-[600px]">
       <div className="absolute inset-0 z-[-1] bg-black">
        <Image
          src="https://picsum.photos/1600/900"
          alt="Students studying together"
          fill
          priority
          data-ai-hint="happy students learning"
          className="hero-bg scale-110 object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="hero-content">
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
      </div>
    </section>
  );
}
