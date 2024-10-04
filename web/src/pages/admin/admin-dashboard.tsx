import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, FolderOpen, UsersRound } from "lucide-react";
import { CartesianGrid, XAxis, Area, AreaChart, Bar, BarChart } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"
import { getAdminDashboard } from "@/hooks/use-dashboard";
import { formatCurrency } from "@/utils/format-currency";

export function AdminDashboard() {

    const usersData = [
        { month: "January", users: 150 },
        { month: "February", users: 180 },
        { month: "March", users: 220 },
        { month: "April", users: 300 },
        { month: "May", users: 250 },
        { month: "June", users: 400 },
        { month: "July", users: 350 },
        { month: "August", users: 500 },
        { month: "September", users: 450 },
        { month: "October", users: 600 },
        { month: "November", users: 750 },
        { month: "December", users: 1200 }
    ];

    const usersChartConfig = {
        users: {
            label: "Users: ",
            color: "hsl(var(--primary))",
        },
    } satisfies ChartConfig

    const plansData = [
        { month: "January", free: 180, paid: 70 },
        { month: "February", free: 200, paid: 80 },
        { month: "March", free: 190, paid: 75 },
        { month: "April", free: 210, paid: 85 },
        { month: "May", free: 220, paid: 90 },
        { month: "June", free: 230, paid: 100 },
        { month: "July", free: 240, paid: 95 },
        { month: "August", free: 250, paid: 105 },
        { month: "September", free: 260, paid: 110 },
        { month: "October", free: 270, paid: 115 },
        { month: "November", free: 280, paid: 120 },
        { month: "December", free: 290, paid: 125 }
    ];

    const plansChatConfig = {
        free: {
            label: "Free Plan",
            color: "#93C5FD",
        },
        paid: {
            label: "Paid Plan",
            color: "hsl(var(--primary))",
        }
    } satisfies ChartConfig;


    const { data } = getAdminDashboard();

    return (
        <main className="space-y-6">
            <section className="grid grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-col items-start gap-2 justify-start">
                        <header className="flex flex-row items-center justify-between w-full">
                            <h2 className="font-semibold">
                                Total Users
                            </h2>
                            <UsersRound size={20} className="text-primary" />
                        </header>
                        <span className="font-bold text-2xl">
                            {data?.usersCount} Users
                        </span>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="flex flex-col items-start gap-2 justify-start">
                        <header className="flex flex-row items-center justify-between w-full">
                            <h2 className="font-semibold">Total Projects</h2>
                            <FolderOpen size={20} className="text-primary" />
                        </header>
                        <span className="font-bold text-2xl">
                            {data?.projectsCount} Projects
                        </span>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="flex flex-col items-start gap-2 justify-start">
                        <header className="flex flex-row items-center justify-between w-full">
                            <h2 className="font-semibold">Total Revenue</h2>
                            <DollarSign size={20} className="text-primary" />
                        </header>
                        <span className="font-bold text-2xl">
                            {formatCurrency(data?.totalRevenue || 0)}
                        </span>
                    </CardHeader>
                </Card>
            </section>
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly User Growth</CardTitle>
                        <CardDescription>
                            Tracking users amount throughout the month
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={usersChartConfig} className="h-[350px] w-full">
                            <AreaChart
                                accessibilityLayer
                                data={usersData}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" hideLabel />}
                                />
                                <Area
                                    dataKey="users"
                                    type="linear"
                                    fill="var(--color-users)"
                                    fillOpacity={0.4}
                                    stroke="var(--color-users)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </section>
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly User Plan Overview</CardTitle>
                        <CardDescription>
                            Tracking user plan distributions, comparing free and paid subscriptions across each month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={plansChatConfig} className="h-[350px] w-full">
                            <BarChart accessibilityLayer data={plansData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="free" fill="var(--color-free)" radius={4} />
                                <Bar dataKey="paid" fill="var(--color-paid)" radius={4} />
                                <ChartLegend content={<ChartLegendContent />} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </section>
        </main>
    )
}