import { Replace } from "@utils/replace";
import { randomUUID } from "crypto";
import { UserType } from "../user/user.entity";

export interface RoleProps {
    key: string;
    userTypes: UserType[]
    createdAt: Date;
    updatedAt: Date;
}

export class Role {

    private _id: string;
    private props: RoleProps;

    constructor(
        props: Replace<RoleProps, { createdAt?: Date, updatedAt?: Date, userTypes?: UserType[] }>,
        id?: string
    ) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            userTypes: props.userTypes ?? [ 'ADMIN', 'DEFAULT' ],
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date()
        };
    }
    
    public getId() {
        return this._id;
    }

    public getKey() {
        return this.props.key;
    }

    public setKey(key: string) {
        this.props.key = key;
    }

    public getUserTypes() {
        return this.props.userTypes;
    }
    
    public setUserTypes(userTypes: UserType[]) {
        this.props.userTypes = userTypes;
    }

    public getCreatedAt() {
        return this.props.createdAt;
    }

    public getUpdatedAt() {
        return this.props.updatedAt;
    }

    public update() {
        this.props.updatedAt = new Date();
    }
    
}