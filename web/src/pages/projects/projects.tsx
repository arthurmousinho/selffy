import { NewProjectDialog } from "@/components/admin/project/new-project-dialog";
import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { getUserProjects, ProjectProps } from "@/hooks/use-project";
import { Plus } from "lucide-react";

export function Projects() {

    const query = getUserProjects(1, 10)

    return (
        <main className="grid grid-cols-3 gap-4">
            <NewProjectDialog adminMode={false}>
                <Button className="h-full border-dashed border-spacing-3 border-2 text-md font-medium flex flex-col gap-4 text-muted-foreground" variant={'outline'}>
                    <Plus />
                    Create Project
                </Button>
            </NewProjectDialog>
            {
                query?.data?.projects.map((project: ProjectProps) => (
                    <ProjectCard
                        key={project.id}
                        id={project.id}
                        title={project.title}
                        icon={project.icon}
                        color={project.color}
                        description={project.description}
                        status={project.status}
                    />
                ))
            }
        </main>
    )
}