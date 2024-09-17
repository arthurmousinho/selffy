import { ProjectTasksTable } from "@/components/projects/project-tasks-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { CheckCircle, DollarSign, HandCoinsIcon, Pen, Pin, Trash } from "lucide-react";
import { CartesianGrid, XAxis, Area, AreaChart, Bar, BarChart, Rectangle } from "recharts";

export function ProjectDashboard() {

    const chartData1 = [
        { day: "Monday", done: 186 },
        { day: "Tuesday", done: 305 },
        { day: "Wednesday", done: 237 },
        { day: "Thursday", done: 73 },
        { day: "Friday", done: 209 },
        { day: "Saturday", done: 214 },
        { day: "Sunday", done: 150 }
    ];

    const chartConfig1 = {
        done: {
            label: "Completed Tasks: ",
            color: "#86efac",
        },
    } satisfies ChartConfig

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
        <main className="space-y-4">
            <Card>
                <CardHeader className="w-full h-auto flex flex-row items-center justify-between">
                    <header className="flex items-center gap-2">
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-300">
                            💬
                        </div>
                        <h2 className="font-semibold">
                            MyChaty
                        </h2>
                    </header>
                    <div className="space-x-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button variant={'outline'} className="flex items-center text-muted-foreground">
                                        <Pin size={20} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Pin</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button variant={'outline'} className="flex items-center text-muted-foreground">
                                        <Pen size={20} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Edit</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button variant={'outline'} className="flex items-center text-muted-foreground">
                                        <Trash size={20} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Delete</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </CardHeader>
            </Card>
            <section className="grid grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-col items-start gap-2 justify-start">
                        <header className="flex flex-row items-center justify-between w-full">
                            <h2 className="font-semibold">
                                Completed Tasks
                            </h2>
                            <CheckCircle size={20} className="text-primary" />
                        </header>
                        <span className="font-bold text-2xl">
                            97 Tasks
                        </span>
                        <span className="text-sm text-muted-foreground">
                            +16 since last month
                        </span>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="flex flex-col items-start gap-2 justify-start">
                        <header className="flex flex-row items-center justify-between w-full">
                            <h2 className="font-semibold">Revenue</h2>
                            <DollarSign size={20} className="text-primary" />
                        </header>
                        <span className="font-bold text-2xl">R$ 12.500,00</span>
                        <span className="text-sm text-muted-foreground">
                            +R$ 3.200,00 since last month
                        </span>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="flex flex-col items-start gap-2 justify-start">
                        <header className="flex flex-row items-center justify-between w-full">
                            <h2 className="font-semibold">Cost</h2>
                            <HandCoinsIcon size={20} className="text-primary" />
                        </header>
                        <span className="font-bold text-2xl">R$ 2.500,00</span>
                        <span className="text-sm text-muted-foreground">
                            Total profit: R$ 9.800,00
                        </span>
                    </CardHeader>
                </Card>
            </section>
            <section className="grid grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Week Productivity</CardTitle>
                        <CardDescription>
                            Tracking completed tasks throughout the week
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig1}>
                            <AreaChart
                                accessibilityLayer
                                data={chartData1}
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
                <Card>
                    <CardHeader>
                        <CardTitle>Tasks Distribution</CardTitle>
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
            </section>
            <ProjectTasksTable />
        </main>
    )
}