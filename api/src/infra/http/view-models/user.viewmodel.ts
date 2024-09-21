import { User } from "@application/entities/user/user";

export class UserViewModel {
    
    static toHTTP(user: User) {
        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            type: user.getType(),
            createdAt: user.getCreatedAt(),
            updatedAt: user.getUpdatedAt(),
            roles: user.getRoles().map(
                (role) => {
                    return { key: role.getKey() }
                }
            )
        }
    }

}