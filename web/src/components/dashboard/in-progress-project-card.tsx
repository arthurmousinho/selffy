import { PulsatingDot } from "../global/pulsanting-dot";
import { Card, CardHeader } from "../ui/card";

interface InProgressProjectCardProps {
    title: string;
    icon: string;
    color: string;
}

export function InProgressProjectCard(props: InProgressProjectCardProps) {
    return (
        <Card>
            <CardHeader className="w-full h-auto flex flex-row items-start justify-between">
                <header className="flex items-center gap-2">
                    <div 
                        className="w-10 h-10 flex items-center justify-center rounded-xl"
                        style={{backgroundColor: props.color}}
                    >
                        {props.icon}
                    </div>
                    <h2 className="font-semibold">
                        {props.title}
                    </h2>
                </header>
                <div className="h-auto text-sm text-muted-foreground flex items-center gap-2">
                    <PulsatingDot />
                    In Progress
                </div>
            </CardHeader>
        </Card>
    )
}