import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ProjectBadge } from "./project-badge";
import { Pin } from "lucide-react";

interface ProjectCardProps {
    id: string;
    title: string;
    icon: string;
    color: string;
    description: string;
    status: 'IN_PROGRESS' | 'FINISHED';
    isPinned: boolean;
}

export function ProjectCard(props: ProjectCardProps) {
    return (
        <Link to={props.id}>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <header className="flex flex-row items-center gap-2">
                        <div
                            className="w-10 h-10 flex items-center justify-center rounded-xl text-xl"
                            style={{ backgroundColor: props.color }}
                        >
                            {props.icon}
                        </div>
                        <h2 className="font-semibold line-clamp-1">
                            {props.title}
                        </h2>
                    </header>
                    {
                        props.isPinned && (
                            <Pin 
                                className="text-muted-foreground"
                                size={20}
                                style={{margin: 0}}
                            />
                        )
                    }
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