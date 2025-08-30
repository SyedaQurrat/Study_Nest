'use client'

import { useAuth } from '@/hooks/use-auth'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowRight, BookCopy, MessageCircle, Calculator, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const { userProfile } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {userProfile?.name?.split(' ')[0] || 'Student'}!
        </h1>
        <p className="text-muted-foreground">
          Find your books and start learning.
        </p>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Search for a Book</CardTitle>
          <CardDescription>Find books by title, author, or publish date.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
             <Input
                placeholder="Book Name..."
                className="w-full bg-card text-base"
              />
               <Input
                placeholder="Author Name..."
                className="w-full bg-card text-base"
              />
               <Input
                placeholder="Publish Date..."
                className="w-full bg-card text-base"
              />
          </div>
           <div className="flex justify-end">
            <Button>
                <Search className="mr-2 h-4 w-4" />
                Search
            </Button>
           </div>
        </CardContent>
       </Card>

    </div>
  )
}
