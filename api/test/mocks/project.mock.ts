import { ProjectStatus } from "src/domain/entities/project/project.entity";

function getRandomColor() {
    const colors = [
        '#fca5a5',
        '#7dd3fc',
        '#fcd34d',
        '#f9a8d4',
        '#86efac',
        '#fda4af',
        '#d8b4fe',
        '#fdba74',
        '#93c5fd'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

function getRandomIcon() {
    const icons = ['📱', '💻', '📊', '🎨', '🛠️', '📦', '📇'];
    return icons[Math.floor(Math.random() * icons.length)];
};

function getRandomStatus() {
    const statuses = ['IN_PROGRESS', 'FINISHED'];
    return statuses[Math.floor(Math.random() * statuses.length)] as ProjectStatus;
};

export const MOCK_PROJECTS = Array.from({ length: 30 }).map((_, index) => ({
    title: `Project ${index + 1}`,
    description: `Description for project ${index + 1}`,
    revenue: 200,
    icon: getRandomIcon(),
    color: getRandomColor(),
    status: getRandomStatus(),
}));