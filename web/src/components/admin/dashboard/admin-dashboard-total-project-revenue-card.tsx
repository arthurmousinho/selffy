import { Card, CardHeader } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format-currency";
import { DollarSign } from "lucide-react";

interface AdminDashboardTotalProjectRevenueCardProps {
    totalRevenue: number;
}

export function AdminDashboardTotalProjectRevenueCard(props: AdminDashboardTotalProjectRevenueCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-col items-start gap-2 justify-start">
                <header className="flex flex-row items-center justify-between w-full">
                    <h2 className="font-semibold">Total Projects Revenue</h2>
                    <DollarSign size={20} className="text-primary" />
                </header>
                <span className="font-bold text-2xl">
                    {formatCurrency(props.totalRevenue)}
                </span>
            </CardHeader>
        </Card>
    );
}