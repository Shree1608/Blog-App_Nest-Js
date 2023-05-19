import { Strategy } from "passport-jwt";
import { Admin } from "src/admin/entities/admin.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
declare const JwtAdminSrategy_base: new (...args: any[]) => Strategy;
export declare class JwtAdminSrategy extends JwtAdminSrategy_base {
    private readonly adminRepo;
    private readonly userRepo;
    constructor(adminRepo: Repository<Admin>, userRepo: Repository<User>);
    validate(payload: any): Promise<Admin[] | User[]>;
}
export {};
