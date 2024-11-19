import { DollarSign } from "lucide-react";
import { Card, CardHeader } from "../ui/card";
import NumberTicker from "../ui/number-ticker";
import { formatCurrency } from "@/utils/format-currency";

interface TotalRevenueCardProps {
    total: number;
    profit: number;
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
                    <NumberTicker 
                        value={props.total}
                        currency={true}
                        decimalPlaces={2}
                        direction="up"
                    />
                </span>
                <span className="text-sm text-muted-foreground">
                    Total profit: {formatCurrency(props.profit)}
                </span>
            </CardHeader>
        </Card>
    )
}