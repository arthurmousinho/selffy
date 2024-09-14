import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"

export function ProjectRankingCard() {

    const chartData1 = [
        { team: "MyChaty", done: 186, pending: 80 },
        { team: "ExamChecker", done: 305, pending: 200 },
        { team: "DevBooks", done: 205, pending: 200 },
    ];

    const chartConfig1 = {
        done: {
            label: "Done",
            color: "hsl(var(--primary))",
        },
        pending: {
            label: "Pending",
            color: "#93C5FD",
        }
    } satisfies ChartConfig;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Projects Ranking</CardTitle>
                <CardDescription>
                    Showing project performance based on completed and pending tasks
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig1} className="h-[350px] w-full">
                    <BarChart accessibilityLayer data={chartData1}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="team"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="pending" fill="var(--color-pending)" radius={4} />
                        <Bar dataKey="done" fill="var(--color-done)" radius={4} />
                        <ChartLegend content={<ChartLegendContent />} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}