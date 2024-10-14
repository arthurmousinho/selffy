import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";


interface AdminTasksPrioritiesCardProps {
    total: number;
    high: number;
    medium: number;
    low: number;
}

export function AdminTasksPrioritiesCard(props: AdminTasksPrioritiesCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tasks Priorities Distribuition</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <div className="w-full">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">High</span>
                                <span className="text-sm text-muted-foreground">{props.high} tasks</span>
                            </div>
                            <Progress value={(props.high / props.total) * 100} className="mt-2" />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-full">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Medium</span>
                                <span className="text-sm text-muted-foreground">{props.medium} tasks</span>
                            </div>
                            <Progress value={(props.medium / props.total) * 100} className="mt-2" />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-full">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Low</span>
                                <span className="text-sm text-muted-foreground">{props.low} tasks</span>
                            </div>
                            <Progress value={(props.low / props.total) * 100} className="mt-2" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}