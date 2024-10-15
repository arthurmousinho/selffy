import { GetRolesInsightsUseCase } from "./get-roles-insights.usecase";
import { CountRolesByUserTypeUseCase } from "../count-roles-by-user-type/count-roles-by-user-type.usecase";
import { CountRolesUseCase } from "../count-roles/count-roles.usecase";
import { InMemoryRoleRepository } from "@test/repositories/in-memory-role.repository";
import { RoleRepository } from "@application/repositories/role.repository";

describe('GetRolesInsightsUseCase', () => {
    let getRolesInsightsUseCase: GetRolesInsightsUseCase;
    let countRolesUseCase: CountRolesUseCase;
    let countRolesByUserTypeUseCase: CountRolesByUserTypeUseCase;
    let roleRepository: RoleRepository;

    beforeEach(() => {
        roleRepository = new InMemoryRoleRepository();
        countRolesUseCase = new CountRolesUseCase(roleRepository);
        countRolesByUserTypeUseCase = new CountRolesByUserTypeUseCase(roleRepository);
        getRolesInsightsUseCase = new GetRolesInsightsUseCase(countRolesUseCase, countRolesByUserTypeUseCase);
    });

    it('should return roles insights with the correct counts', async () => {
        jest.spyOn(countRolesUseCase, 'execute').mockResolvedValue(50);
        jest.spyOn(countRolesByUserTypeUseCase, 'execute').mockImplementation((userType) => {
            if (userType === 'ADMIN') return Promise.resolve(10);
            if (userType === 'DEFAULT') return Promise.resolve(40);
            return Promise.resolve(0);
        });

        const insights = await getRolesInsightsUseCase.execute();

        expect(insights.total).toBe(50);
        expect(insights.admin).toBe(10);
        expect(insights.default).toBe(40);
    });

    it('should return zero counts when there are no roles', async () => {
        jest.spyOn(countRolesUseCase, 'execute').mockResolvedValue(0);
        jest.spyOn(countRolesByUserTypeUseCase, 'execute').mockResolvedValue(0);

        const insights = await getRolesInsightsUseCase.execute();

        expect(insights.total).toBe(0);
        expect(insights.admin).toBe(0);
        expect(insights.default).toBe(0);
    });

});