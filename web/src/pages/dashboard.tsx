import { PulsatingDot } from "@/components/global/pulsantingDot";
import { Card, CardHeader } from "@/components/ui/card";

export function Dashboard() {
    return (
        <main className="grid grid-cols-2 gap-4">
            <Card>
                <CardHeader className="w-full h-auto flex flex-row items-start justify-between">
                    <header className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-green-300 flex items-center justify-center rounded-xl">
                            💬
                        </div>
                        <h2 className="font-semibold">
                            MyChaty
                        </h2>
                    </header>
                    <div className="h-auto text-sm text-muted-foreground flex items-center gap-2">
                        <PulsatingDot />
                        In Progress
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader className="w-full h-auto flex flex-row items-start justify-between">
                    <header className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-red-300 flex items-center justify-center rounded-xl">
                            🕹️
                        </div>
                        <h2 className="font-semibold">
                            Better
                        </h2>
                    </header>
                    <div className="h-auto text-sm text-muted-foreground flex items-center gap-2">
                        <PulsatingDot />
                        In Progress
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader className="w-full h-auto flex flex-row items-start justify-between">
                    <header className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-orange-300 flex items-center justify-center rounded-xl">
                            ✅
                        </div>
                        <h2 className="font-semibold">
                            Maple
                        </h2>
                    </header>
                    <div className="h-auto text-sm text-muted-foreground flex items-center gap-2">
                        <PulsatingDot />
                        In Progress
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader className="w-full h-auto flex flex-row items-start justify-between">
                    <header className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-pink-300 flex items-center justify-center rounded-xl">
                            💊
                        </div>
                        <h2 className="font-semibold">
                            ExamChecker
                        </h2>
                    </header>
                    <div className="h-auto text-sm text-muted-foreground flex items-center gap-2">
                        <PulsatingDot />
                        In Progress
                    </div>
                </CardHeader>
            </Card>
        </main>
    )
}