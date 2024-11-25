import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { getUserProjects, ProjectProps } from "@/hooks/use-project";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Projects() {

    const [page, setPage] = useState(1);
    const [data, setData] = useState<ProjectProps[]>([]);

    const query = getUserProjects(page, 10);

    useEffect(() => {
        const newProjects = query?.data?.projects || [];
        setData(prev => [...prev, ...newProjects]);
    }, [query?.data]);

    return (
        <main className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4">
                <Link to={'new'}>
                    <Button className="w-full h-full border-dashed border-spacing-3 border-2 text-md font-medium flex flex-col gap-4 text-muted-foreground" variant={'outline'}>
                        <Plus />
                        Create Project
                    </Button>
                </Link>
                {data.map((project: ProjectProps) => (
                    <ProjectCard
                        {...project}
                    />
                ))}
            </div>
            <footer className="flex w-full justify-center">
                <Button
                    variant={'outline'}
                    onClick={() => setPage(page + 1)}
                    disabled={query?.data?.meta.page === query?.data?.meta.totalPages}
                    className="bg-transparent text-muted-foreground"
                >
                    Load more projects
                </Button>
            </footer>
        </main>
    )
}