import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format-currency";
import { DollarSign } from "lucide-react";

interface AdminCostsValueCardProps {
    total: number;
}

export function AdminCostsValueCard(props: AdminCostsValueCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-col gap-4">
                <header className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">Total Costs Value</CardTitle>
                    <DollarSign className="h-4 w-4 text-primary" />
                </header>
                <span className="text-2xl font-bold text-red-500">
                    {formatCurrency(props.total)}
                </span>
            </CardHeader>
        </Card>
    )
}