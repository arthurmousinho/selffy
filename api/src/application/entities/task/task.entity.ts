import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export type TaskStatus = 'PENDING' | 'COMPLETED';

export interface TaskProps {
    title: string;
    description: string;
    dueDate: Date;
    status: TaskStatus;
    priority: TaskPriority;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
    completedAt: Date | null;
}

export class Task {

    private _id: string;
    private props: TaskProps;

    constructor(
        props: Replace<TaskProps, { 
            createdAt?: Date, 
            status?: TaskStatus, 
            completedAt?: Date | null,
            updatedAt?: Date
        }>,
        id?: string
    ) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
            completedAt: props.completedAt ?? null,
            status: props.status ?? 'PENDING',
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

    public getStatus() {
        return this.props.status;
    }

    public setStatus(status: TaskStatus) {
        this.props.status = status;
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

    public getCompletedAt() {
        return this.props.completedAt;
    }

    public complete() {
        this.props.completedAt = new Date();
        this.props.status = 'COMPLETED';
    }

}