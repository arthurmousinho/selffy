import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CartesianGrid, XAxis, Area, AreaChart } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"

interface WeekProductivityCardProps {
    data: {
        Sunday: number;
        Monday: number;
        Tuesday: number;
        Wednesday: number;
        Thursday: number;
        Friday: number;
        Saturday: number;
    }
}

export function WeekProductivityCard(props: WeekProductivityCardProps) {

    const chartData2 = [
        { day: "Monday", completedTasks: props.data.Monday },
        { day: "Tuesday", completedTasks: props.data.Tuesday },
        { day: "Wednesday", completedTasks: props.data.Wednesday },
        { day: "Thursday", completedTasks: props.data.Thursday },
        { day: "Friday", completedTasks: props.data.Friday },
        { day: "Saturday", completedTasks: props.data.Saturday },
        { day: "Sunday", completedTasks: props.data.Sunday },
    ];

    const chartConfig2 = {
        completedTasks: {
            label: "Completed Tasks: ",
            color: "hsl(var(--primary))",
        },
    } satisfies ChartConfig

    return (
        <Card>
            <CardHeader>
                <CardTitle>Week Productivity</CardTitle>
                <CardDescription>
                    Tracking completed tasks throughout the week
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig2} className="h-[350px] w-full">
                    <AreaChart
                        accessibilityLayer
                        data={chartData2}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 2)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" hideLabel />}
                        />
                        <Area
                            dataKey="completedTasks"
                            type="linear"
                            fill="var(--color-completedTasks)"
                            fillOpacity={0.4}
                            stroke="var(--color-completedTasks)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}