import { ChatInterface } from "@/components/chatbot/chat-interface";

export default function ChatbotPage() {
  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col">
       <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">AI Chatbot</h1>
        <p className="text-muted-foreground">
          Your personal AI tutor for Math, Physics, and Chemistry.
        </p>
      </div>
      <ChatInterface />
    </div>
  )
}
