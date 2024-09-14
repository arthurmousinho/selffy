import { HighPriorityTasks } from "@/components/tasks/high-priority-tasks";
import { MediumPriorityTasks } from "@/components/tasks/medium-priority-tasks";
import { LowPriorityTasks } from "@/components/tasks/low-priority-tasks";

export function Priorities() {
    return (
        <main className="space-y-4">
            <HighPriorityTasks />
            <MediumPriorityTasks />
            <LowPriorityTasks />
        </main>
    )
}