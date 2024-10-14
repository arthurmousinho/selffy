import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface AdminTasksStatusCardProps {
    total: number;
    pending: number;
    completed: number;
}

export function AdminTasksStatusCard(props: AdminTasksStatusCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tasks Status Distribuition</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <div className="w-full">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Pending</span>
                                <span className="text-sm text-muted-foreground">{props.pending} tasks</span>
                            </div>
                            <Progress value={(props.pending / props.total) * 100} className="mt-2" />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-full">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Completed</span>
                                <span className="text-sm text-muted-foreground">{props.completed} tasks</span>
                            </div>
                            <Progress value={(props.completed / props.total) * 100} className="mt-2" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}