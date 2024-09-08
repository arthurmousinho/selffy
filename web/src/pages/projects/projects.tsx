import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CartesianGrid, XAxis, Area, AreaChart } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CheckCircle, DollarSign, EllipsisVertical, Folder, Pencil, Pin, Trash } from "lucide-react";

export function Projects() {

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

    const chartData2 = [
        { day: "Monday", done: 186 },
        { day: "Tuesday", done: 305 },
        { day: "Wednesday", done: 237 },
        { day: "Thursday", done: 723 },
        { day: "Friday", done: 209 },
        { day: "Saturday", done: 214 },
        { day: "Sunday", done: 150 }
    ];

    const chartConfig2 = {
        done: {
            label: "Completed Tasks: ",
            color: "#7dd3fc",
        },
    } satisfies ChartConfig

    return (
        <main className="grid grid-cols-1 gap-4">
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
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVertical size={20} className="text-muted-foreground" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mr-12 w-[150px]">
                            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 p-2">
                                <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                                    <span className="text-sm">
                                        <Folder size={20} className="text-black" />
                                    </span>
                                </div>
                                Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 p-2">
                                <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                                    <span className="text-sm">
                                        <Pin size={20} className="text-black" />
                                    </span>
                                </div>
                                Pin
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 p-2">
                                <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                                    <span className="text-sm">
                                        <Pencil size={20} className="text-black" />
                                    </span>
                                </div>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 p-2">
                                <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                                    <span className="text-sm">
                                        <Trash size={20} className="text-black" />
                                    </span>
                                </div>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent className="flex flex-row items-center gap-4">
                    <ChartContainer config={chartConfig1} className="h-[320px] w-[70%]">
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
                    <div className="flex flex-col gap-4 flex-1">
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
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="w-full h-auto flex flex-row items-start justify-between">
                    <header className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-sky-300 flex items-center justify-center rounded-xl">
                            📖
                        </div>
                        <h2 className="font-semibold">
                            DevBooks
                        </h2>
                    </header>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVertical size={20} className="text-muted-foreground" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mr-12 w-[150px]">
                            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 p-2">
                                <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                                    <span className="text-sm">
                                        <Folder size={20} className="text-black" />
                                    </span>
                                </div>
                                Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 p-2">
                                <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                                    <span className="text-sm">
                                        <Pin size={20} className="text-black" />
                                    </span>
                                </div>
                                Pin
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 p-2">
                                <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                                    <span className="text-sm">
                                        <Pencil size={20} className="text-black" />
                                    </span>
                                </div>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 p-2">
                                <div className="w-10 h-10 border flex items-center justify-center rounded-xl">
                                    <span className="text-sm">
                                        <Trash size={20} className="text-black" />
                                    </span>
                                </div>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent className="flex flex-row items-center gap-4">
                    <ChartContainer config={chartConfig2} className="h-[320px] w-[70%]">
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
                    <div className="flex flex-col gap-4 flex-1">
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
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}