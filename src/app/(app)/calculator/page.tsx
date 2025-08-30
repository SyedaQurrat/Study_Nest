import { Calculator } from "@/components/calculator/calculator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CalculatorPage() {
  return (
    <div className="flex flex-col items-center justify-center">
       <div className="w-full max-w-md">
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Simple Calculator</h1>
            <p className="text-muted-foreground">
            For your quick math operations.
            </p>
        </div>
        <Card className="shadow-lg">
            <CardContent className="p-4">
                <Calculator />
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
