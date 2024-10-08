import { User } from "@application/entities/user/user.entity";

export class UserViewModel {

    static toHTTP(user: User) {
        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            type: user.getType(),
            plan: user.getPlan(),
            password: user.getPassword(),
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