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

    if (props.priority === 'HIGH') {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <div className="w-10 h-10 flex items-center justify-center gap-2 rounded-xl bg-red-200">
                            <Flame size={20} className="text-red-500" />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        <p>High Priority</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }

    if (props.priority === 'MEDIUM') {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <div className="w-10 h-10 flex items-center justify-center gap-2 rounded-xl bg-amber-100">
                            <TriangleAlert size={20} className="text-amber-500" />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        <p>Medium Priority</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }

    if (props.priority === 'LOW') {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <div className="w-10 h-10 flex items-center justify-center gap-2 rounded-xl bg-sky-200">
                            <Snail size={20} className="text-sky-500" />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        <p>Low Priority</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        )
    }

}