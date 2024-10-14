import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersRound } from "lucide-react";

interface AdminUsersCardProps {
    total: number;
}

export function AdminUsersCard(props: AdminUsersCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-col gap-4">
                <header className="flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <UsersRound className="h-4 w-4 text-primary" />
                </header>
                <span className="text-2xl font-bold">
                    {props.total} Users
                </span>
            </CardHeader>
        </Card>
    )
}