import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";


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
                    <h2 className="font-semibold">
                        {props.title}
                    </h2>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                    {props.description}
                </CardContent>
                <CardFooter>
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
                </CardFooter>
            </Card>
        </Link>
    )
}