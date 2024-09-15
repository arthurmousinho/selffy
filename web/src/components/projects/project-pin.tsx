import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface ProjectPinProps {
    id: string;
    title: string;
    icon: string;
    color: string;
}

export function ProjectPin(props: ProjectPinProps) {
    return (
        <Link to={`projects/${props.id}`}>
            <Button
                className="h-12 px-3 w-full flex items-center justify-start gap-4"
                variant={'ghost'}
            >
                <div
                    className="w-10 h-10 flex items-center justify-center rounded-xl"
                    style={{ backgroundColor: props.color }}
                >
                    <span className="text-xl">
                        {props.icon}
                    </span>
                </div>
                <h2>
                    {props.title}
                </h2>
            </Button>
        </Link>
    )
}