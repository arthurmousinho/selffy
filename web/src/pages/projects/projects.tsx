import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { getUserProjects, ProjectProps } from "@/hooks/use-project";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Projects() {

    const [limit, setLimit] = useState(10);

    const query = getUserProjects(1, limit);

    async function handleLoadMore() {
        setLimit(limit + 5);
    }

    return (
        <main className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4">
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
            </div>
            {query?.data && query.data.projects.length >= 10 && (
                <footer className="w-full flex justify-center">
                    <Button
                        variant={'outline'}
                        onClick={handleLoadMore}
                        disabled={query?.data?.meta.page === query?.data?.meta.totalPages}
                        className="border-primary bg-transparent text-primary"
                    >
                        Load more projects
                    </Button>
                </footer>
            )}
        </main>
    )
}