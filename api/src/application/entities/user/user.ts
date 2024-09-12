import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";
import { Project } from "../project/project";

export type UserType = 'ADMIN' | 'DEFAULT';

export interface UserProps {
    name: string;
    email: string;
    password: string;
    roles: string[];
    createdAt: Date;
    updatedAt: Date;
    projects: Project[];
    type: UserType;
}

export class User {

    private _id: string;
    private props: UserProps;

    constructor(
        props: Replace<UserProps, { id?: string, createdAt?: Date, type?: UserType, updatedAt?: Date }>,
        id?: string,
    ) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            type: props.type ?? 'DEFAULT',
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date()
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
    
    public getUpdatedAt() {
        return this.props.updatedAt
    }

    public update() {
        this.props.updatedAt = new Date()
    }

    public getProjects() {
        return this.props.projects
    }

    public addProject(project: any) {
        this.props.projects.push(project)
    }
    
    public getType() {
        return this.props.type
    }

    public setType(type: UserType) {
        this.props.type = type
    }

}