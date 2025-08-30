import { ChatInterface } from "@/components/chatbot/chat-interface";
import { Calculator } from "@/components/calculator/calculator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, CalculatorIcon, Book } from "lucide-react";
import { sampleBooks } from "../../../../../lib/book-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function StudyPage({ params }: { params: { bookId: string } }) {
  const book = sampleBooks.find(b => b.id === params.bookId);

  if (!book) {
    notFound();
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] w-full flex-col">
       <div className="mb-4">
         <Button variant="outline" asChild>
            <Link href="/books">← Back to Library</Link>
         </Button>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">Study Mode: {book.title}</h1>
        <p className="text-muted-foreground">
          Use the tools below to help you study effectively.
        </p>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col rounded-lg border bg-card">
           <div className="flex h-full items-center justify-center p-8">
              <div className="text-center text-muted-foreground">
                <Book className="mx-auto mb-4 h-16 w-16" />
                <h2 className="text-xl font-semibold text-foreground">Digital Book Viewer</h2>
                <p>The content for "{book.title}" would be displayed here.</p>
                <p className="mt-2 text-sm">(This is a placeholder for the PDF viewer integration)</p>
                 <Button asChild className="mt-4">
                    <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer">
                        Open PDF in New Tab
                    </a>
                </Button>
              </div>
           </div>
        </div>
        <div className="flex flex-col">
            <Tabs defaultValue="chatbot" className="flex h-full w-full flex-col">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chatbot">
                    <Bot className="mr-2" /> AI Chatbot
                </TabsTrigger>
                <TabsTrigger value="calculator">
                    <CalculatorIcon className="mr-2" /> Calculator
                </TabsTrigger>
              </TabsList>
              <TabsContent value="chatbot" className="flex-grow">
                <div className="flex h-full flex-col rounded-b-lg border border-t-0 bg-card p-4">
                    <ChatInterface />
                </div>
              </TabsContent>
              <TabsContent value="calculator" className="flex-grow">
                <div className="flex h-full flex-col rounded-b-lg border border-t-0 bg-card p-4">
                    <Calculator />
                </div>
              </TabsContent>
            </Tabs>
        </div>
      </div>
    </div>
  )
}
