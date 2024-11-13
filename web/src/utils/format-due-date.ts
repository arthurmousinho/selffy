export function formatDueDate(dueDate: Date): string {
    // Ex: Wed 22/03/2023
    
    const date = new Date(dueDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });

    return `${dayOfWeek} ${day}/${month}/${year}`;
}