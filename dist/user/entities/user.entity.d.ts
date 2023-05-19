import { Address } from "./user-address.entity";
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    token: string;
    age: number;
    address: Address;
}
