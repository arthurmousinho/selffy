import { CheckCircle } from "lucide-react";
import { Card, CardHeader } from "../ui/card";

export function CompletedTasksCard() {
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
                    97 Tasks
                </span>
                <span className="text-sm text-muted-foreground">
                    +16 since last month
                </span>
            </CardHeader>
        </Card>
    )
}