import { makePlan } from '@test/factories/plan.factory';

describe('Plan', () => {
    
    it('should create a plan with provided properties', () => {
        const plan = makePlan();

        expect(plan).toBeTruthy();
        expect(plan.getName()).toBe('test');
        expect(plan.getDescription()).toBe('test');
        expect(plan.getPrice()).toBe(100);
        expect(plan.getCreatedAt()).toBeInstanceOf(Date);
        expect(plan.getUpdatedAt()).toBeInstanceOf(Date);
    });

    it('should generate an ID if not provided', () => {
        const plan = makePlan();

        expect(plan.getId()).toBeDefined();
        expect(plan.getId()).toHaveLength(36); 
    });

    it('should update the name, description, and price', () => {
        const plan = makePlan();

        plan.setName('Premium Plan');
        plan.setDescription('A premium subscription plan');
        plan.setPrice(200);

        expect(plan.getName()).toBe('Premium Plan');
        expect(plan.getDescription()).toBe('A premium subscription plan');
        expect(plan.getPrice()).toBe(200);
    });

    it('should update the updatedAt property', () => {
        const plan = makePlan();
        const initialUpdatedAt = plan.getUpdatedAt();

        jest.advanceTimersByTime(1000); 
        plan.update();

        expect(plan.getUpdatedAt()).not.toEqual(initialUpdatedAt);
        expect(plan.getUpdatedAt()).toBeInstanceOf(Date);
    });

});