import { Replace } from "@utils/replace";
import { randomUUID } from "crypto";

export interface PlanProps {
    name: string;
    description: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

export class Plan {

    private _id: string;
    private props: PlanProps;

    constructor(
        props: Replace<PlanProps, {
            id?: string,
            createdAt?: Date,
            updatedAt?: Date,
        }>,
        id?: string,
    ) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
        };
    }

    public getId() {
        return this._id;
    }

    public getName() {
        return this.props.name;
    }

    public setName(name: string) {
        this.props.name = name;
    }

    public getDescription() {
        return this.props.description;
    }

    public setDescription(description: string) {
        this.props.description = description;
    }

    public getPrice() {
        return this.props.price;
    }

    public setPrice(price: number) {
        this.props.price = price;
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