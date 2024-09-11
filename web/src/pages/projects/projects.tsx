import { ProjectCard } from "@/components/projects/project-card";

export function Projects() {

    const projects = [
        { title: "MyChaty", icon: "💬", color: "#86efac" },
        { title: "ExamChecker", icon: "💊", color: "#f9a8d4" },
        { title: "DevBooks", icon: "📚", color: "#93c5fd" },
        { title: "Better", icon: "🕹️", color: "#facc15" },
        { title: "Maple", icon: "✅", color: "#a5b4fc" },
    ];

    return (
        <main className="grid grid-cols-1 gap-4">
            {
                projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        icon={project.icon}
                        color={project.color}
                    />
                ))
            }
        </main>
    )
}