import { makeCost } from "@test/factories/cost.factory";

describe('Cost', () => {

    it('should create a cost with provided properties', () => {
        const cost = makeCost();
        
        expect(cost).toBeTruthy();
    });

    it('should generate an ID if not provided', () => {
        const cost = makeCost();

        expect(cost.getId()).toBeDefined();
        expect(cost.getId()).toHaveLength(36); 
    });

    it('should update the title and value', () => {
        const cost = makeCost();

        cost.setTitle('New Office Rent');
        cost.setValue(2000);

        expect(cost.getTitle()).toBe('New Office Rent');
        expect(cost.getValue()).toBe(2000);
    });

    it('should update the updatedAt property', () => {
        const cost = makeCost();
        const initialUpdatedAt = cost.getUpdatedAt();

        jest.advanceTimersByTime(1000); 
        cost.update();

        expect(cost.getUpdatedAt()).not.toEqual(initialUpdatedAt);
        expect(cost.getUpdatedAt()).toBeInstanceOf(Date);
    });

});