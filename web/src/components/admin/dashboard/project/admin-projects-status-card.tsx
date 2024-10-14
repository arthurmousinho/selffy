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

interface AdminProjectsStatusCardProps {
  inProgress: number;
  finished: number;
}

export function AdminProjectsStatusCard(props: AdminProjectsStatusCardProps) {

  const chartData = [
    { status: "InProgress", projects: props.inProgress, fill: "#93C5FD" },
    { status: "Finished", projects: props.finished, fill: "hsl(var(--primary))" },
  ]

  const chartConfig = {
    status: {
      label: "Status",
    },
    projects: {
      label: "Projects",
    },
    InProgress: {
      label: "In Progress",
    },
    Finished: {
      label: "Finished",
    },
  } satisfies ChartConfig

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="w-full h-auto flex flex-col gap-2">
        <CardTitle>Projects Status Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="status"
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
              dataKey="projects"
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
