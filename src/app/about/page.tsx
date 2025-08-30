import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpen, Target, Users } from 'lucide-react';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Ahmed Khan',
    role: 'Founder & CEO',
    avatar: 'AK',
    imageUrl: 'https://picsum.photos/200/200',
    dataAiHint: 'man portrait',
    bio: 'Ahmed is a passionate educator and technologist dedicated to revolutionizing the learning landscape in Pakistan.',
  },
  {
    name: 'Fatima Ali',
    role: 'Lead Developer',
    avatar: 'FA',
    imageUrl: 'https://picsum.photos/200/200',
    dataAiHint: 'woman portrait',
    bio: 'Fatima is the architectural mastermind behind the StudyNest platform, ensuring a seamless and robust user experience.',
  },
  {
    name: 'Zainab Rehman',
    role: 'AI & Curriculum Specialist',
    avatar: 'ZR',
    imageUrl: 'https://picsum.photos/200/200',
    dataAiHint: 'female professional',
    bio: 'Zainab integrates cutting-edge AI with the national curriculum to provide students with the most effective learning tools.',
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              About StudyNest
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl">
              Our mission is to empower every student in Pakistan with accessible, high-quality digital learning tools to achieve academic excellence.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                  Our Story
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  StudyNest was born from a simple idea: education should have no boundaries. We saw students across Pakistan struggling with access to quality resources, expensive tuition, and a one-size-fits-all learning model.
                </p>
                <p className="mt-4 text-lg text-muted-foreground">
                  We decided to build a platform that wasn't just another app, but a comprehensive learning companion. A nest where students could find everything they need—from digital textbooks and smart calculators to an AI tutor available 24/7—all tailored to the Pakistani curriculum.
                </p>
              </div>
              <div>
                <Image
                  src="https://picsum.photos/600/400"
                  alt="Students collaborating"
                  width={600}
                  height={400}
                  data-ai-hint="students learning"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission and Vision Section */}
        <section className="bg-muted py-20 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 p-3">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide an integrated and personalized learning experience that is affordable, accessible, and aligned with the specific needs of students in Pakistan, from middle school to university.
                </p>
              </div>
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 p-3">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
                <p className="text-muted-foreground">
                  To be the leading digital education platform in Pakistan, fostering a new generation of learners who are confident, knowledgeable, and ready to shape the future.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section id="team" className="py-20 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Meet the Team
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The passionate individuals dedicated to making learning better for you.
              </p>
            </div>
            <div className="mx-auto mt-16 grid grid-cols-1 gap-12 text-center md:grid-cols-3">
              {teamMembers.map((member) => (
                <div key={member.name}>
                  <Avatar className="mx-auto h-32 w-32">
                    <AvatarImage src={member.imageUrl} alt={member.name} data-ai-hint={member.dataAiHint} />
                    <AvatarFallback>{member.avatar}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-6 text-xl font-bold">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                  <p className="mt-2 text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}