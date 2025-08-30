import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Download } from "lucide-react";

// In a real application, this data would be fetched from Firestore,
// with links pointing to PDFs in Firebase Storage.
const sampleBooks = [
  {
    id: 'math-6',
    title: '6th Grade Mathematics',
    description: 'A comprehensive guide to 6th-grade math concepts, from fractions to geometry.',
    coverUrl: 'https://picsum.photos/400/500',
    dataAiHint: 'book cover',
    pdfUrl: '#', // Dummy link
  },
  {
    id: 'phy-7',
    title: '7th Grade Physics Explorer',
    description: 'Discover the world of motion, forces, and energy with engaging examples.',
    coverUrl: 'https://picsum.photos/400/500',
    dataAiHint: 'science textbook',
    pdfUrl: '#', // Dummy link
  },
  {
    id: 'chem-8',
    title: '8th Grade Chemistry',
    description: 'An introduction to atoms, molecules, and chemical reactions.',
    coverUrl: 'https://picsum.photos/400/500',
    dataAiHint: 'chemistry book',
    pdfUrl: '#', // Dummy link
  },
  {
    id: 'uni-calculus',
    title: 'University Calculus I',
    description: 'Fundamental concepts of differential and integral calculus for university students.',
    coverUrl: 'https://picsum.photos/400/500',
    dataAiHint: 'math textbook',
    pdfUrl: '#', // Dummy link
  },
]

export default function BooksPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Books Library</h1>
        <p className="text-muted-foreground">
          Find your course materials and start reading.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sampleBooks.map((book) => (
          <Card key={book.id} className="flex flex-col overflow-hidden">
            <CardHeader className="p-0">
               <Image
                  src={book.coverUrl}
                  alt={`Cover of ${book.title}`}
                  width={400}
                  height={500}
                  data-ai-hint={book.dataAiHint}
                  className="aspect-[4/5] w-full object-cover"
                />
            </CardHeader>
            <CardContent className="flex flex-1 flex-col p-4">
              <CardTitle className="text-lg font-semibold">{book.title}</CardTitle>
              <CardDescription className="mt-1 flex-1 text-sm">{book.description}</CardDescription>
              <Button asChild className="mt-4 w-full">
                <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2" />
                  Read PDF
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
