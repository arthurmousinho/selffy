import { Replace } from "@utils/replace";
import { randomUUID } from "crypto";

export interface CostProps {
    title: string;
    value: number;
    createdAt: Date;
    updatedAt: Date;
}

export class Cost {

    private _id: string;
    private props: CostProps;

    constructor(
        props: Replace<CostProps, { createdAt?: Date, updatedAt?: Date; }>,
        id?: string,
    ) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date()
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

    public getValue() {
        return this.props.value;
    }

    public setValue(value: number) {
        this.props.value = value;
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