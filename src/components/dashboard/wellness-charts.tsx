'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from "recharts"
import type { WellnessLog } from "@/lib/types";
import { format } from "date-fns";

type WellnessChartsProps = {
    logs: WellnessLog[];
}

const chartConfigSleep = {
  sleep: {
    label: "Sleep (hours)",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

const chartConfigWater = {
  water: {
    label: "Water (glasses)",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

export function WellnessCharts({ logs }: WellnessChartsProps) {
    const chartData = logs
        .slice(0, 7)
        .map(log => ({
            date: format(new Date(log.date), "MMM d"),
            sleep: log.sleepHours,
            water: log.waterIntake,
        }))
        .reverse();

    if (logs.length < 2) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Wellness Trends</CardTitle>
            <CardDescription>Log at least two days to see your trends.</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">Not enough data for charts.</p>
          </CardContent>
        </Card>
      )
    }

    return (
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Sleep Pattern</CardTitle>
                    <CardDescription>Last 7 logged days</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfigSleep} className="h-[200px] w-full">
                        <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                             <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line type="monotone" dataKey="sleep" stroke={chartConfigSleep.sleep.color} strokeWidth={2} dot={true} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Water Intake</CardTitle>
                    <CardDescription>Last 7 logged days</CardDescription>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={chartConfigWater} className="h-[200px] w-full">
                        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                             <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="water" fill={chartConfigWater.water.color} radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
