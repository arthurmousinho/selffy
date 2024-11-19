import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ProjectBadge } from "./project-badge";

interface ProjectCardProps {
    id: string;
    title: string;
    icon: string;
    color: string;
    description: string;
    status: 'IN_PROGRESS' | 'FINISHED';
}

export function ProjectCard(props: ProjectCardProps) {
    return (
        <Link to={props.id}>
            <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                    <div
                        className="w-10 h-10 flex items-center justify-center rounded-xl text-xl"
                        style={{ backgroundColor: props.color }}
                    >
                        {props.icon}
                    </div>
                    <h2 className="font-semibold line-clamp-1">
                        {props.title}
                    </h2>
                </CardHeader>
                <CardContent>
                    <span className="text-sm text-muted-foreground leading-relaxed line-clamp-3 min-h-[70px]">
                        {props.description}
                    </span>
                </CardContent>
                <CardFooter>
                    <ProjectBadge 
                        status={props.status}
                    />
                </CardFooter>
            </Card>
        </Link>
    )
}