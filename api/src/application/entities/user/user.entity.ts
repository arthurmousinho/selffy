import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";
import { Project } from "../project/project.entity";
import { Role } from "../role/role.entity";
import { makeRole } from "@test/factories/role.factory";

export type UserType = 'ADMIN' | 'DEFAULT';

export interface UserProps {
    name: string;
    email: string;
    password: string;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
    projects: Project[];
    type: UserType;
}

export class User {

    private _id: string;
    private props: UserProps;

    constructor(
        props: Replace<UserProps, {
            id?: string,
            roles?: Role[],
            createdAt?: Date,
            type?: UserType,
            updatedAt?: Date,
            projects?: Project[]
        }>,
        id?: string,
    ) {
        this._id = id ?? randomUUID();
        const defaultRoles = [
            makeRole(),
        ];

        this.props = {
            ...props,
            type: props.type ?? 'DEFAULT',
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
            roles: props?.roles ?? defaultRoles,
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

    public getRoles() {
        return this.props.roles
    }

    public addRole(role: Role) {
        this.props.roles.push(role)
    }

    public removeRole(role: Role) {
        this.props.roles = this.props.roles.filter(r => r.getId() !== role.getId())
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

    public getType() {
        return this.props.type
    }

    public setType(type: UserType) {
        this.props.type = type
    }

}