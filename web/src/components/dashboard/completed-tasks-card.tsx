import { CheckCircle } from "lucide-react";
import { Card, CardHeader } from "../ui/card";
import NumberTicker from "../ui/number-ticker";

interface CompletedTasksCardProps {
    count: number;
    growth: number;
}

export function CompletedTasksCard(props: CompletedTasksCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-col items-start gap-2 justify-start">
                <header className="flex flex-row items-center justify-between w-full">
                    <h2 className="font-semibold">
                        Completed Tasks
                    </h2>
                    <CheckCircle size={20} className="text-primary" />
                </header>
                <span className="font-bold text-2xl">
                    <NumberTicker value={props.count} direction="up" /> Tasks
                </span>
                <span className="text-sm text-muted-foreground">
                    +{props.growth} since last month
                </span>
            </CardHeader>
        </Card>
    )
}