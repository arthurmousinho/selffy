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

        const mockResponse = {
            data: mockTasks,
            meta: {
                page: 1,
                totalPages: 1,
                limit: 10,
                total: 2,
            },
        };

        (taskRepository.findManyByTitle as jest.Mock).mockResolvedValue(mockResponse);

        const result = await searchTasksByTitleUseCase.execute({
            title: 'Task',
            page: 1,
            limit: 10,
        });

        expect(result.data).toEqual(mockTasks);
        expect(result.meta.total).toBe(2);
        expect(result.meta.page).toBe(1);
    });

    it('should return an empty array if no tasks match the title', async () => {
        const mockResponse = {
            data: [],
            meta: {
                page: 1,
                totalPages: 0,
                limit: 10,
                total: 0,
            },
        };

        (taskRepository.findManyByTitle as jest.Mock).mockResolvedValue(mockResponse);

        const result = await searchTasksByTitleUseCase.execute({
            title: 'Non-existent task',
            page: 1,
            limit: 10,
        });

        expect(taskRepository.findManyByTitle).toHaveBeenCalledWith({
            title: 'Non-existent task',
            page: 1,
            limit: 10,
        });
        expect(result.data).toEqual([]);
        expect(result.meta.total).toBe(0);
    });

    it('should throw an error if repository fails', async () => {
        (taskRepository.findManyByTitle as jest.Mock).mockRejectedValue(new Error('Database error'));

        await expect(searchTasksByTitleUseCase.execute({
            title: 'Task',
            page: 1,
            limit: 10,
        })).rejects.toThrow('Database error');
    });

});
