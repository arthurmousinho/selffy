import { PulsatingDot } from "../global/pulsanting-dot";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Rectangle,
    XAxis
} from "recharts"

interface InProgressProjectCardProps {
    title: string;
    icon: string;
    color: string;
}

export function InProgressProjectCard(props: InProgressProjectCardProps) {

    const chartData = [
        { priority: "HIGH", tasksAmount: 187, fill: "#fecaca" },
        { priority: "MEDIUM", tasksAmount: 200, fill: "#fde68a" },
        { priority: "LOW", tasksAmount: 275, fill: "#bae6fd" }
    ]

    const chartConfig = {
        priority: {
            label: "Priority",
        },
        tasksAmount: {
            label: "Tasks",
        },
        HIGH: {
            label: "High",
            color: "#fecaca",
        },
        MEDIUM: {
            label: "Medium",
            color: "#fde68a",
        },
        LOW: {
            label: "Low",
            color: "#a5f3fc",
        }
    } satisfies ChartConfig

    return (
        <Card>
            <CardHeader className="w-full h-auto flex flex-col gap-2">
                <header className="flex flex-row justify-between w-full">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-10 h-10 flex items-center justify-center rounded-xl"
                            style={{ backgroundColor: props.color }}
                        >
                            {props.icon}
                        </div>
                        <h2 className="font-semibold">
                            {props.title}
                        </h2>
                    </div>
                    <div className="h-auto text-sm text-muted-foreground flex items-center gap-2">
                        <PulsatingDot />
                        In Progress
                    </div>
                </header>
                <CardDescription>
                    Pending tasks across different priority levels
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="priority"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig]?.label
                            }
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="tasksAmount"
                            strokeWidth={2}
                            radius={8}
                            activeIndex={2}
                            activeBar={({ ...props }) => {
                                return (
                                    <Rectangle
                                        {...props}
                                        fillOpacity={0.8}
                                        stroke={props.payload.fill}
                                        strokeDasharray={4}
                                        strokeDashoffset={4}
                                    />
                                )
                            }}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}