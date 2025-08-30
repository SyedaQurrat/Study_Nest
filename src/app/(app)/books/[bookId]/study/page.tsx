import { ChatInterface } from "@/components/chatbot/chat-interface";
import { Calculator } from "@/components/calculator/calculator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bot, CalculatorIcon, Book, Microscope } from "lucide-react";
import { sampleBooks } from "@/lib/book-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const subjectTools: Record<string, React.ReactNode> = {
  'Math': <Calculator />,
  'Physics': <Calculator />,
  'Chemistry': <Calculator />,
  'Biology': (
    <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
      <Microscope className="mb-4 h-16 w-16" />
      <h3 className="font-semibold text-foreground">Interactive Diagram</h3>
      <p className="text-sm">A tool for exploring biological diagrams would appear here.</p>
    </div>
  ),
};

const subjectToolIcons: Record<string, React.ReactNode> = {
    'Math': <CalculatorIcon className="mr-2 h-5 w-5" />,
    'Physics': <CalculatorIcon className="mr-2 h-5 w-5" />,
    'Chemistry': <CalculatorIcon className="mr-2 h-5 w-5" />,
    'Biology': <Microscope className="mr-2 h-5 w-5" />,
}

export default function StudyPage({ params }: { params: { bookId: string } }) {
  const book = sampleBooks.find(b => b.id === params.bookId);

  if (!book) {
    notFound();
  }

  const ToolComponent = subjectTools[book.subject] ?? <Calculator />;
  const ToolIcon = subjectToolIcons[book.subject] ?? <CalculatorIcon className="mr-2 h-5 w-5" />;
  const toolName = book.subject === 'Biology' ? 'Diagram' : 'Calculator';


  return (
    <div className="flex h-[calc(100vh-6rem)] w-full flex-col space-y-6">
       <div className="flex-shrink-0">
         <Button variant="outline" asChild>
            <Link href="/books">← Back to Library</Link>
         </Button>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">Study Mode: {book.title}</h1>
      </div>
      
      {/* Book Viewer Section */}
      <div className="flex flex-[2] flex-col rounded-lg border bg-card p-4">
        <div className="flex h-full items-center justify-center p-4">
            <div className="text-center text-muted-foreground">
            <Book className="mx-auto mb-4 h-12 w-12" />
            <h2 className="text-xl font-semibold text-foreground">Digital Book Viewer</h2>
            <p className="mt-1">The content for "{book.title}" would be displayed here.</p>
            <p className="mt-1 text-sm">(This is a placeholder for an embedded PDF viewer)</p>
            </div>
        </div>
      </div>
      
      {/* Tools Section */}
      <div className="grid flex-[3] grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center space-x-2 border-b p-4">
                <Bot className="h-5 w-5" />
                <CardTitle className="text-lg">AI Chatbot</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow p-4">
                 <ChatInterface />
            </CardContent>
        </Card>
        <Card className="flex flex-col">
           <CardHeader className="flex flex-row items-center space-x-2 border-b p-4">
                {ToolIcon}
                <CardTitle className="text-lg">{toolName}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow p-4">
                {ToolComponent}
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
