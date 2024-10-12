import { SearchTasksByTitleUseCase } from './search-tasks-by-title.usecase';
import { TaskRepository } from '@application/repositories/task.repository';

describe('SearchTasksByTitleUseCase', () => {
    
    let searchTasksByTitleUseCase: SearchTasksByTitleUseCase;
    let taskRepository: TaskRepository;

    beforeEach(() => {
        taskRepository = {
            findManyByTitle: jest.fn(), 
        } as unknown as TaskRepository;

        searchTasksByTitleUseCase = new SearchTasksByTitleUseCase(taskRepository);
    });

    it('should return tasks that match the title', async () => {
        const mockTasks = [
            { id: '1', title: 'Task 1', description: 'First task' },
            { id: '2', title: 'Task 2', description: 'Second task' },
        ];

        (taskRepository.findManyByTitle as jest.Mock).mockResolvedValue(mockTasks);
        const result = await searchTasksByTitleUseCase.execute('Task');

        expect(taskRepository.findManyByTitle).toHaveBeenCalledWith('Task');
        expect(result).toEqual(mockTasks);
    });

    it('should return an empty array if no tasks match the title', async () => {
        (taskRepository.findManyByTitle as jest.Mock).mockResolvedValue([]);

        const result = await searchTasksByTitleUseCase.execute('Non-existent task');

        expect(taskRepository.findManyByTitle).toHaveBeenCalledWith('Non-existent task');
        expect(result).toEqual([]);
    });

    it('should throw an error if repository fails', async () => {
        (taskRepository.findManyByTitle as jest.Mock).mockRejectedValue(new Error('Database error'));

        await expect(searchTasksByTitleUseCase.execute('Task')).rejects.toThrow('Database error');
    });

});