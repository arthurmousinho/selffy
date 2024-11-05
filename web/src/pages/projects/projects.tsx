import { NewProjectDialog } from "@/components/admin/project/new-project-dialog";
import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getUserProjects, ProjectProps } from "@/hooks/use-project";
import { Folder, Plus } from "lucide-react";

export function Projects() {

    const query = getUserProjects(1,10)

    return (
        <main className="grid grid-cols-1 gap-4">
            <Card className="flex flex-row items-center justify-between">
                <CardHeader className="w-full h-auto flex flex-row items-center justify-between">
                    <header className="flex items-center gap-2">
                        <div className="w-10 h-10 flex border items-center justify-center rounded-xl">
                            <span className="text-sm">
                                <Folder size={20} className="text-black" />
                            </span>
                        </div>
                        <h2 className="font-semibold">
                            Projects
                        </h2>
                    </header>
                </CardHeader>
                <CardContent className="py-0 flex flex-row items-center gap-2">
                    <Input
                        placeholder="Search..."
                        className="w-[250px]"
                        type="search"
                    />
                    <NewProjectDialog adminMode={false}>
                        <Button>
                            <Plus />
                            Create Project
                        </Button>
                    </NewProjectDialog>
                </CardContent>
            </Card>
            {
                query?.data?.projects.map((project: ProjectProps, index: number) => (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        icon={project.icon}
                        color={project.color}
                        revenue={project.revenue}
                    />
                ))
            } 
        </main>
    )
}