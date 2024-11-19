import { ProjectProps } from "@/hooks/use-project"
import { Badge } from "../ui/badge";

interface ProjectBadgeProps {
    status: ProjectProps['status'];
}

export function ProjectBadge(props: ProjectBadgeProps) {
    return (
        <>
            {
                props.status === 'FINISHED' ? (
                    <Badge variant={'outline'} className=" bg-slate-50 text-slate-400">
                        Finished
                    </Badge>
                ) : (
                    <Badge variant={'secondary'} className=" bg-green-50 text-green-400">
                        In Progress
                    </Badge>
                )
            }
        </>
    )
}