import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CartesianGrid, XAxis, Area, AreaChart } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"

export function WeekProductivityCard() {

    const chartData2 = [
        { day: "Monday", done: 186 },
        { day: "Tuesday", done: 305 },
        { day: "Wednesday", done: 237 },
        { day: "Thursday", done: 73 },
        { day: "Friday", done: 209 },
        { day: "Saturday", done: 214 },
        { day: "Sunday", done: 150 }
    ];

    const chartConfig2 = {
        done: {
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
                            dataKey="done"
                            type="linear"
                            fill="var(--color-done)"
                            fillOpacity={0.4}
                            stroke="var(--color-done)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}