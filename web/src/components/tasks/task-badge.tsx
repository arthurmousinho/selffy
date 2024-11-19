import { Flame, Snail, TriangleAlert } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


interface BadgeProps {
    priority: "LOW" | "MEDIUM" | "HIGH"
}

export function TaskBadge(props: BadgeProps) {
    const priorityMap = {
        HIGH: {
            color: "bg-red-200",
            icon: <Flame size={20} className="text-red-500" />,
            text: "High Priority",
        },
        MEDIUM: {
            color: "bg-amber-100",
            icon: <TriangleAlert size={20} className="text-amber-500" />,
            text: "Medium Priority",
        },
        LOW: {
            color: "bg-sky-200",
            icon: <Snail size={20} className="text-sky-500" />,
            text: "Low Priority",
        },
    };

    const { color, icon, text } = priorityMap[props.priority];

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className={`w-10 h-10 flex items-center justify-center gap-2 rounded-xl ${color}`}>
                        {icon}
                    </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={5}>
                    <p>{text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
