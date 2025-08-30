'use client'

import { useAuth } from '@/hooks/use-auth'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowRight, BookCopy, MessageCircle, Calculator } from 'lucide-react'

export default function DashboardPage() {
  const { userProfile } = useAuth();

  const quickLinks = [
    {
      title: 'Browse Books',
      description: 'Find textbooks and materials for your class.',
      href: '/books',
      icon: BookCopy,
    },
    {
      title: 'AI Chatbot',
      description: 'Get instant help with your questions.',
      href: '/chatbot',
      icon: MessageCircle,
    },
    {
      title: 'Calculator',
      description: 'Solve complex equations with ease.',
      href: '/calculator',
      icon: Calculator,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {userProfile?.name?.split(' ')[0] || 'Student'}!
        </h1>
        <p className="text-muted-foreground">
          You are enrolled in: <span className="font-semibold text-foreground">{userProfile?.classLevel}</span>.
          Let's get learning!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map((link) => (
           <Card key={link.href} className="group transition-all hover:shadow-md hover:-translate-y-1">
            <Link href={link.href} className="block h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">{link.title}</CardTitle>
                <link.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{link.description}</p>
                <div className="mt-4 flex items-center text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  <span>Go to {link.title.split(' ')[0]}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
