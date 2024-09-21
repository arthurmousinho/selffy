import { Replace } from "@utils/replace";
import { randomUUID } from "crypto";
import { User } from "../user/user";

export interface RoleProps {
    key: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Role {

    private _id: string;
    private props: RoleProps;

    constructor(
        props: Replace<RoleProps, { createdAt?: Date, updatedAt?: Date }>,
        id?: string
    ) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
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