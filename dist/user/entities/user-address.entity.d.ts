import { User } from "./user.entity";
export declare class Address {
    id: number;
    street: string;
    city: string;
    country: string;
    user: User;
}
