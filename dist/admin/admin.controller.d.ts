import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './entities/admin.entity';
import { AdminLoginDto } from './dto/admin-login.dto';
import { Request } from 'express';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    create(createAdminDto: CreateAdminDto): Promise<Admin>;
    login(adminDto: AdminLoginDto): Promise<{
        token: string;
    }>;
    logout(req: Request): Promise<{
        message: string;
    }>;
}
