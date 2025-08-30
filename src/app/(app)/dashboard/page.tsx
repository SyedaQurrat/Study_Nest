
'use client'

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowRight, BookCopy, MessageCircle, Calculator, Search, PlusCircle, BookOpenCheck } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { sampleBooks } from '@/lib/book-data';
import Image from 'next/image';

type Book = typeof sampleBooks[0];

export default function DashboardPage() {
  const { userProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState({ title: '', subject: '' });
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [searched, setSearched] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchQuery(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const { title, subject } = searchQuery;
    const filteredBooks = sampleBooks.filter(book => 
      book.title.toLowerCase().includes(title.toLowerCase()) &&
      book.subject.toLowerCase().includes(subject.toLowerCase())
    );
    setSearchResults(filteredBooks);
    setSearched(true);
  };

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

       <Card className="transition-shadow duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle>Search for a Book</CardTitle>
          <CardDescription>Find books by title or subject.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
             <Input
                name="title"
                placeholder="Book Name..."
                value={searchQuery.title}
                onChange={handleInputChange}
                className="w-full bg-background text-base"
              />
               <Input
                name="subject"
                placeholder="Subject..."
                value={searchQuery.subject}
                onChange={handleInputChange}
                className="w-full bg-background text-base"
              />
          </div>
           <div className="flex justify-end">
            <Button onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" />
                Search
            </Button>
           </div>
        </CardContent>
       </Card>

      {searched && (
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Search Results</h2>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {searchResults.map(book => (
                <Card key={book.id} className="overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
                  <Image
                    src={book.coverUrl}
                    alt={`Cover of ${book.title}`}
                    width={400}
                    height={300}
                    data-ai-hint={book.dataAiHint}
                    className="h-48 w-full object-cover"
                  />
                  <CardContent className="p-4">
                    <CardTitle className="text-md font-semibold leading-snug tracking-tight">{book.title}</CardTitle>
                    <p className="mt-1 text-sm text-primary">{book.subject}</p>
                    <CardDescription className="mt-2 text-xs line-clamp-2">{book.description}</CardDescription>
                    <Button className="mt-4 w-full">
                       <PlusCircle className="mr-2 h-4 w-4" />
                       Add to Library
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No books found matching your criteria. Try a different search.</p>
          )}
        </div>
      )}

    </div>
  )
}
