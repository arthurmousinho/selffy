import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format-currency";
import { DollarSign } from "lucide-react";

interface AdminProjectsRevenueCardProps {
    revenue: number;
}

export function AdminProjectsRevenueCard(props: AdminProjectsRevenueCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-col gap-4">
                <header className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">Total Projects Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-primary" />
                </header>
                <span className="text-2xl font-bold text-green-500">
                    {formatCurrency(props.revenue)}
                </span>
            </CardHeader>
        </Card>
    )
}