
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BookOpenCheck } from "lucide-react";
import Link from "next/link";
import { sampleBooks } from "@/lib/book-data";


export default function BooksPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Books Library</h1>
        <p className="text-muted-foreground">
          Find your course materials and start your study session.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {sampleBooks.map((book) => (
          <Card key={book.id} className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]">
            <div className="flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="flex-shrink-0">
                <Image
                    src={book.coverUrl}
                    alt={`Cover of ${book.title}`}
                    width={150}
                    height={200}
                    data-ai-hint={book.dataAiHint}
                    className="h-full w-full object-cover md:h-[200px] md:w-[150px]"
                />
              </div>

              {/* Content Section */}
              <div className="flex flex-1 flex-col p-6">
                  <CardTitle className="text-xl font-semibold">{book.title}</CardTitle>
                  <p className="mt-1 text-sm text-primary">{book.subject}</p>
                  <CardDescription className="mt-2 flex-grow text-sm">{book.description}</CardDescription>
                  <div className="mt-4 flex justify-end">
                      <Button asChild>
                        <Link href={`/books/${book.id}/study`}>
                          <BookOpenCheck className="mr-2" />
                          Start Studying
                        </Link>
                      </Button>
                  </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
