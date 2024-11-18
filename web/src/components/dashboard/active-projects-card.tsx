import { Folder } from "lucide-react";
import { Card, CardHeader } from "../ui/card";
import NumberTicker from "../ui/number-ticker";

interface ActiveProjectsCardProps {
    count: number;
}

export function ActiveProjectsCard(props: ActiveProjectsCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-col items-start gap-2 justify-start">
                <header className="flex flex-row items-center justify-between w-full">
                    <h2 className="font-semibold">Active Projects</h2>
                    <Folder size={20} className="text-primary" />
                </header>
                <span className="font-bold text-2xl">
                    <NumberTicker value={props.count} direction="up" /> Projects
                </span>
                <span className="text-sm text-muted-foreground">
                    +1 since last month
                </span>
            </CardHeader>
        </Card>
    )
}