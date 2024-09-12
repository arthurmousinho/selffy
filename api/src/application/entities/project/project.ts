import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";
import { User } from "../user/user";

export type ProjectStatus = 'in-progress' | 'finished';

export interface ProjectProps {
    title: string;
    description: string;
    revenue: number;
    slug: string;
    createdAt: Date;
    tasks: any[]
    status: ProjectStatus;
    owner: User;
}

export class Project {

    private _id: string;
    private props: ProjectProps;

    constructor(
        props: Replace<ProjectProps, { createdAt?: Date, status?: ProjectStatus, slug?: string }>,
        id?: string,
    ) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            status: 'in-progress',
            slug: props.slug ?? '',
            createdAt: props.createdAt ?? new Date()
        }

        if (!props.slug) {
            this.props.slug = this.generateSlug();
        }
    }

    private generateSlug() {
        return this.props.title.toLowerCase().replace(/ /g, '-');
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

    public getSlug() {
        return this.props.slug;
    }

    public setSlug(slug: string) {
        this.props.slug = slug;
    }

    public getCreatedAt() {
        return this.props.createdAt;
    }

    public getTasks() {
        return this.props.tasks;
    }

    public addTasks(task: any) {
        this.props.tasks.push(task);
    }

    public removeTask(taskId: string) {
        this.props.tasks = this.props.tasks.filter(task => task.id !== taskId);
    }

    public editTask(taskId: string, newTask: any) {
        const taskIndex = this.props.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            this.props.tasks[taskIndex] = newTask;
        }
    }

    public getStatus() {
        return this.props.status;
    }

    public finishProject() {
        this.props.status = 'finished';
    }

    public getOwner() {
        return this.props.owner;
    }

    public setOwnerId(owner: User) {
        this.props.owner = owner;
    }

}