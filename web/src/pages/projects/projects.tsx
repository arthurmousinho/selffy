import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { getUserProjects, ProjectProps } from "@/hooks/use-project";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export function Projects() {
    const query = getUserProjects(1, 10);

    return (
        <main className="grid grid-cols-3 gap-4">
            <Link to={'new'}>
                <Button className="w-full h-full border-dashed border-spacing-3 border-2 text-md font-medium flex flex-col gap-4 text-muted-foreground" variant={'outline'}>
                    <Plus />
                    Create Project
                </Button>
            </Link>
            {query?.data?.projects.map((project: ProjectProps) => (
                <ProjectCard
                    {...project}
                />
            ))}
        </main>
    )
}