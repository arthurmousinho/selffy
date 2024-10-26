import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";

interface AdminProjectsCardProps {
    total: number;
    monthlyGrowth: number;
}

export function AdminProjectsCard(props: AdminProjectsCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-col gap-2">
                <header className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                    <FolderOpen className="h-4 w-4 text-primary" />
                </header>
                <span className="text-2xl font-bold">
                    {props.total} Projects
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                    +{props.monthlyGrowth} from last month
                </span>
            </CardHeader>
        </Card>
    )
}