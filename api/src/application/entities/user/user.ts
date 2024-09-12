import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";

export interface UserProps {
    name: string;
    email: string;
    password: string;
    roles: string[];
    createdAt: Date;
    projects: any[];
}

export class User {

    private _id: string;
    private props: UserProps;

    constructor(
        props: Replace<UserProps, { createdAt?: Date }>,
        id?: string,
    ) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date()
        };
    }

    public getId() {
        return this._id
    }

    public getName() {
        return this.props.name
    }

    public setName(name: string) {
        this.props.name = name
    }

    public getEmail() {
        return this.props.email
    }

    public setEmail(email: string) {
        this.props.email = email
    }

    public getPassword() {
        return this.props.password
    }

    public setPassword(password: string) {
        this.props.password = password
    }

    public getRoles() {
        return this.props.roles
    }

    public addRole(role: string) {
        this.props.roles.push(role)
    }

    public getCreatedAt() {
        return this.props.createdAt
    }

    public getProjects() {
        return this.props.projects
    }

    public addProject(project: any) {
        this.props.projects.push(project)
    }

}