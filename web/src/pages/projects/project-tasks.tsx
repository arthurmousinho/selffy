import { getTasksByProjectId } from "@/hooks/use-task";
import { useParams } from "react-router-dom";
import { TaskCard } from "@/components/tasks/task-card";


export function ProjectTasks() {

    const projectIdFromRoute = useParams().id;    

    const { data } = getTasksByProjectId(projectIdFromRoute || '')

    return (
        <main className="grid grid-cols-3 gap-4">
            {data?.tasks.map(task => (
                <TaskCard 
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    status={task.status}
                    priority={task.priority}
                    dueDate={task.dueDate}
                />
            ))}
        </main>
    )
}