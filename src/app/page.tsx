import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { Comparison } from '@/components/landing/comparison';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Screenshots } from '@/components/landing/screenshots';
import { Testimonials } from '@/components/landing/testimonials';
import { CallToAction } from '@/components/landing/cta';
import { Footer } from '@/components/landing/footer';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Comparison />
        <HowItWorks />
        <Screenshots />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
