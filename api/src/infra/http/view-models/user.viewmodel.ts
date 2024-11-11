import { User } from "src/domain/entities/user/user.entity";

export class UserViewModel {

    static toHTTP(user: User) {
        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            role: user.getRole(),
            password: user.getPassword(),
            createdAt: user.getCreatedAt(),
            updatedAt: user.getUpdatedAt()
        }
    }

}