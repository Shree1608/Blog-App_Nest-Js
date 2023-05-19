import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AdminLoginDto } from './dto/admin-login.dto';
export declare class AdminService {
    private readonly adminRepo;
    private readonly jwtService;
    constructor(adminRepo: Repository<Admin>, jwtService: JwtService);
    adminSignup(adminDto: CreateAdminDto): Promise<Admin>;
    adminLogin(adminDto: AdminLoginDto): Promise<{
        token: string;
    }>;
    adminLogout(admin: any): Promise<{
        message: string;
    }>;
}
