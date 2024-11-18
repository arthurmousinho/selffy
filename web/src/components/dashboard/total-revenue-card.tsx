import { DollarSign } from "lucide-react";
import { Card, CardHeader } from "../ui/card";
import { formatCurrency } from "@/utils/format-currency";

interface TotalRevenueCardProps {
    total: number;
}

export function TotalRevenueCard(props: TotalRevenueCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-col items-start gap-2 justify-start">
                <header className="flex flex-row items-center justify-between w-full">
                    <h2 className="font-semibold">Total Revenue</h2>
                    <DollarSign size={20} className="text-primary" />
                </header>
                <span className="font-bold text-2xl">
                    {formatCurrency(props.total)}
                </span>
                <span className="text-sm text-muted-foreground">
                    +R$ 3.200,00 since last month
                </span>
            </CardHeader>
        </Card>
    )
}