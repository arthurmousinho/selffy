import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCheck } from "lucide-react";

interface AdminTasksCardProps {
    total: number;
    monthlyGrowth: number;
}

export function AdminTasksCard(props: AdminTasksCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-col gap-2">
                <header className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                    <CheckCheck className="h-4 w-4 text-primary" />
                </header>
                <span className="text-2xl font-bold">
                    {props.total} Tasks
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                    +{props.monthlyGrowth} from last month
                </span>
            </CardHeader>
        </Card>
    )
}