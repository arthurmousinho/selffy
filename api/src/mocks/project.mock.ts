const getRandomColor = () => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A5', '#F5A623', '#8E44AD', '#2980B9'];
    return colors[Math.floor(Math.random() * colors.length)];
};

const getRandomIcon = () => {
    const icons = ['📱', '💻', '📊', '🎨', '🛠️', '📦', '📇'];
    return icons[Math.floor(Math.random() * icons.length)];
};

export const MOCK_PROJECTS = Array.from({ length: 30 }).map((_, index) => ({
    title: `Project ${index + 1}`,
    description: `Description for project ${index + 1}`,
    revenue: 200,
    icon: getRandomIcon(),
    color: getRandomColor(),
}));