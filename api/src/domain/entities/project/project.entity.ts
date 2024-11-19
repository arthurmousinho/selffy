import { randomUUID } from "crypto";
import { Replace } from "utils/replace";
import { User } from "../user/user.entity";
import { Task } from "../task/task.entity";
import { Cost } from "../cost/cost.entity";

export type ProjectStatus = 'IN_PROGRESS' | 'FINISHED';

export interface ProjectProps {
    title: string;
    description: string;
    revenue: number;
    createdAt: Date;
    updatedAt: Date;
    icon: string;
    color: string;
    tasks: Task[];
    status: ProjectStatus;
    owner: User;
    costs: Cost[]
}

export class Project {

    private _id: string;
    private props: ProjectProps;

    constructor(
        props: Replace<ProjectProps, {
            createdAt?: Date,
            status?: ProjectStatus,
            updatedAt?: Date,
            tasks?: Task[],
            costs?: Cost[]
        }>,
        id?: string,
    ) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            status: props.status ?? 'IN_PROGRESS',
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
            tasks: props.tasks ?? [],
            costs: props.costs ?? []
        }
    }

    public getId() {
        return this._id;
    }

    public getTitle() {
        return this.props.title;
    }

    public setTitle(title: string) {
        this.props.title = title;
    }

    public getDescription() {
        return this.props.description;
    }

    public setDescription(description: string) {
        this.props.description = description;
    }

    public getRevenue() {
        return this.props.revenue;
    }

    public setRevenue(revenue: number) {
        this.props.revenue = revenue;
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

    public getIcon() {
        return this.props.icon;
    }

    public setIcon(icon: string) {
        this.props.icon = icon;
    }

    public getColor() {
        return this.props.color;
    }

    public setColor(color: string) {
        this.props.color = color;
    }

    public getTasks() {
        return this.props.tasks;
    }

    public addTask(task: Task) {
        this.props.tasks.push(task);
    }

    public removeTask(task: Task) {
        const index = this.props.tasks.indexOf(task);
        this.props.tasks.splice(index, 1);
    }

    public getCosts() {
        return this.props.costs;
    }

    public removeCost(cost: Cost) {
        const index = this.props.costs.indexOf(cost);
        this.props.costs.splice(index, 1);
    }

    public addCost(cost: Cost) {
        this.props.costs.push(cost);
    }

    public getStatus() {
        return this.props.status;
    }

    public finishProject() {
        this.props.status = 'FINISHED';
    }

    public getOwner() {
        return this.props.owner;
    }

    public setOwnerId(owner: User) {
        this.props.owner = owner;
    }

}