import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { HandCoins } from "lucide-react";

interface AdminCostsCardProps {
    total: number;
}

export function AdminCostsCard(props: AdminCostsCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-col gap-4">
                <header className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">Total Costs</CardTitle>
                    <HandCoins className="h-4 w-4 text-primary" />
                </header>
                <span className="text-2xl font-bold">
                    {props.total} Costs
                </span>
            </CardHeader>
        </Card>
    )
}