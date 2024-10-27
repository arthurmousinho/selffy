import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";
import { Project } from "../project/project.entity";

export type Role = 'ADMIN' | 'FREE' | 'PREMIUM';

export interface UserProps {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    projects: Project[];
    role: Role;
}

export class User {

    private _id: string;
    private props: UserProps;

    constructor(
        props: Replace<UserProps, {
            id?: string,
            createdAt?: Date,
            updatedAt?: Date,
            projects?: Project[],
            role?: Role
        }>,
        id?: string,
    ) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            role: 'FREE',
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
            projects: props.projects ?? []
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

    public setRole(role: Role) {
        this.props.role = role;
    }

    public getRole() {
        return this.props.role;
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

    public removeProject(project: any) {
        this.props.projects = this.props.projects.filter(p => p.getId() !== project.getId())
    }

}