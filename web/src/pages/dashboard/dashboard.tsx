import { PulsatingDot } from "@/components/global/pulsanting-dot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, DollarSign, Folder } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, Area, AreaChart } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"


export function Dashboard() {

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
        <main className="space-y-6">
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
                            <h2 className="font-semibold">Active Projects</h2>
                            <Folder size={20} className="text-primary" />
                        </header>
                        <span className="font-bold text-2xl">5 Projects</span>
                        <span className="text-sm text-muted-foreground">
                            +1 since last month
                        </span>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="flex flex-col items-start gap-2 justify-start">
                        <header className="flex flex-row items-center justify-between w-full">
                            <h2 className="font-semibold">Total Revenue</h2>
                            <DollarSign size={20} className="text-primary" />
                        </header>
                        <span className="font-bold text-2xl">R$ 12.500,00</span>
                        <span className="text-sm text-muted-foreground">
                            +R$ 3.200,00 since last month
                        </span>
                    </CardHeader>
                </Card>
            </section>
            <section className="grid grid-cols-2 gap-4">
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
            </section>
            <section>
                <div className="grid grid-cols-2 gap-4">
                    <Card>
                        <CardHeader className="w-full h-auto flex flex-row items-start justify-between">
                            <header className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-green-300 flex items-center justify-center rounded-xl">
                                    💬
                                </div>
                                <h2 className="font-semibold">
                                    MyChaty
                                </h2>
                            </header>
                            <div className="h-auto text-sm text-muted-foreground flex items-center gap-2">
                                <PulsatingDot />
                                In Progress
                            </div>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="w-full h-auto flex flex-row items-start justify-between">
                            <header className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-red-300 flex items-center justify-center rounded-xl">
                                    🕹️
                                </div>
                                <h2 className="font-semibold">
                                    Better
                                </h2>
                            </header>
                            <div className="h-auto text-sm text-muted-foreground flex items-center gap-2">
                                <PulsatingDot />
                                In Progress
                            </div>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="w-full h-auto flex flex-row items-start justify-between">
                            <header className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-orange-300 flex items-center justify-center rounded-xl">
                                    ✅
                                </div>
                                <h2 className="font-semibold">
                                    Maple
                                </h2>
                            </header>
                            <div className="h-auto text-sm text-muted-foreground flex items-center gap-2">
                                <PulsatingDot />
                                In Progress
                            </div>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="w-full h-auto flex flex-row items-start justify-between">
                            <header className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-pink-300 flex items-center justify-center rounded-xl">
                                    💊
                                </div>
                                <h2 className="font-semibold">
                                    ExamChecker
                                </h2>
                            </header>
                            <div className="h-auto text-sm text-muted-foreground flex items-center gap-2">
                                <PulsatingDot />
                                In Progress
                            </div>
                        </CardHeader>
                    </Card>
                </div>
            </section>
        </main>
    )
}