import { DollarSign } from "lucide-react";
import { Card, CardHeader } from "../ui/card";

export function TotalRevenueCard() {
    return (
        <Card>
            <CardHeader className="flex flex-col items-start gap-2 justify-start">
                <header className="flex flex-row items-center justify-between w-full">
                    <h2 className="font-semibold">Total Revenue</h2>
                    <DollarSign size={20} className="text-primary" />
                </header>
                <span className="font-bold text-2xl">R$ 12.500,00</span>
                <span className="text-sm text-muted-foreground">
                    +R$ 3.200,00 since last month
                </span>
            </CardHeader>
        </Card>
    )
}