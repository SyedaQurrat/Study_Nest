import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmed Khan',
    class: '10th Grade, Karachi',
    quote: "StudyNest's AI tutor is amazing! It helped me understand complex physics problems I was struggling with for weeks.",
    avatar: 'AK',
  },
  {
    name: 'Fatima Ali',
    class: 'University Student, Lahore',
    quote: "Having all my university books in one app is a game-changer. I can study on the go, and the assignment tracker keeps me organized.",
    avatar: 'FA',
  },
  {
    name: 'Zainab Rehman',
    class: '8th Grade, Islamabad',
    quote: 'The calculators and digital library are so useful for my homework. I use StudyNest every single day!',
    avatar: 'ZR',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by Students Across Pakistan
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Don't just take our word for it. Here's what learners are saying.
          </p>
        </div>
        <div className="mx-auto mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Avatar>
                    <AvatarImage src={`https://avatar.vercel.sh/${testimonial.name.replace(' ', '')}.png`} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.class}</p>
                  </div>
                </div>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <blockquote className="mt-4 border-l-2 border-primary pl-4 italic text-muted-foreground">
                  "{testimonial.quote}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
