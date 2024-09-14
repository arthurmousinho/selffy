import { Folder } from "lucide-react";
import { Card, CardHeader } from "../ui/card";

export function ActiveProjectsCard() {
    return (
        <Card>
            <CardHeader className="flex flex-col items-start gap-2 justify-start">
                <header className="flex flex-row items-center justify-between w-full">
                    <h2 className="font-semibold">Active Projects</h2>
                    <Folder size={20} className="text-primary" />
                </header>
                <span className="font-bold text-2xl">5 Projects</span>
                <span className="text-sm text-muted-foreground">
                    +1 since last month
                </span>
            </CardHeader>
        </Card>
    )
}