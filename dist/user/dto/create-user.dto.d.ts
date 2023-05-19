import { Address } from "../entities/user-address.entity";
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    address: Address;
    age: number;
}
