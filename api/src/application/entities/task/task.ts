import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";

export type TaskPriority = 'low' | 'medium' | 'high';

export interface TaskProps {
    title: string;
    description: string;
    dueDate: Date;
    priority: TaskPriority;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Task {

    private _id: string;
    private props: TaskProps;

    constructor(
        props: Replace<TaskProps, { createdAt?: Date, updatedAt?: Date }>,
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

    public getDueDate() {
        return this.props.dueDate;
    }

    public setDueDate(dueDate: Date) {
        this.props.dueDate = dueDate;
    }

    public getPriority() {
        return this.props.priority;
    }
    
    public getProjectId() {
        return this.props.projectId;
    }

    public setProjectId(projectId: string) {
        this.props.projectId = projectId;
    }

    public setPriority(priority: TaskPriority) {
        this.props.priority = priority;
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