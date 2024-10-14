import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
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

interface AdminUsersPlanCardProps {
  free: number;
  premium: number;
}

export function AdminUsersPlanCard(props: AdminUsersPlanCardProps) {
  const chartData = [
    { plan: "Free", users: props.free, fill: "#93C5FD" },
    { plan: "Premium", users: props.premium, fill: "hsl(var(--primary))" },
  ]

  const chartConfig = {
    plan: {
      label: "Plan",
    },
    users: {
      label: "Users",
    },
    Free: {
      label: "Free",
    },
    Premium: {
      label: "Premium",
    },
  } satisfies ChartConfig

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="w-full h-auto flex flex-col gap-2">
        <CardTitle>User Plan Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="plan"
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
              dataKey="users"
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
