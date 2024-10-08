import { UsersRound } from "lucide-react";
import { RadialBarChart, PolarRadiusAxis, Label, RadialBar } from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

interface AdminDashboardProjectsCardProps {
    total: number;
    free: number;
    premium: number;
}

export function AdminDashboardUsersCard(props: AdminDashboardProjectsCardProps) {
    
    const chartData = [
        { free: props.free, premium: props.premium }
    ]

    const chartConfig = {
        free: {
            label: "Free",
            color: "hsl(var(--chart-1))",
        },
        premium: {
            label: "Premium",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig

    return (
        <Card>
            <CardHeader className="w-full h-auto flex flex-col gap-2">
                <header className="flex flex-row items-center justify-between w-full">
                    <h2 className="font-semibold">
                        Users
                    </h2>
                    <UsersRound size={20} className="text-primary" />
                </header>
            </CardHeader>
            <CardContent className="pb-0 h-[150px]">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        endAngle={180}
                        innerRadius={80}
                        outerRadius={130}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }: any) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 16}
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {props.total}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 4}
                                                    className="fill-muted-foreground"
                                                >
                                                    Users
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                        <RadialBar
                            dataKey="free"
                            stackId="a"
                            cornerRadius={5}
                            fill="var(--color-free)"
                            className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                            dataKey="premium"
                            fill="var(--color-premium)"
                            stackId="a"
                            cornerRadius={5}
                            className="stroke-transparent stroke-2"
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

