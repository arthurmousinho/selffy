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

interface ProjectRankingCardProps {
    ranking: {
        title: string;
        completedTasks: number;
        pendingTasks: number;
    }[]
}

export function ProjectRankingCard(props: ProjectRankingCardProps) {

    const chartData1 = [
        {
            projectTitle: props.ranking[0]?.title || "",
            completedTasks: props.ranking[0]?.completedTasks || 0,
            pendingTasks: props.ranking[0]?.pendingTasks || 0
        },
        {
            projectTitle: props.ranking[1]?.title || "",
            completedTasks: props.ranking[1]?.completedTasks || 0,
            pendingTasks: props.ranking[1]?.pendingTasks || 0
        },
        {
            projectTitle: props.ranking[2]?.title || "",
            completedTasks: props.ranking[2]?.completedTasks || 0,
            pendingTasks: props.ranking[2]?.pendingTasks || 0
        }
    ];

    const chartConfig1 = {
        completedTasks: {
            label: "Completed",
            color: "hsl(var(--primary))",
        },
        pendingTasks: {
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
                            dataKey="projectTitle"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="pendingTasks" fill="var(--color-pendingTasks)" radius={4} />
                        <Bar dataKey="completedTasks" fill="var(--color-completedTasks)" radius={4} />
                        <ChartLegend content={<ChartLegendContent />} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
