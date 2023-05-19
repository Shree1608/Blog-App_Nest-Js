import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly userRepository;
    private readonly jwtservice;
    constructor(userRepository: Repository<User>, jwtservice: JwtService);
    userSignup(userRepo: CreateUserDto): Promise<User>;
    userLogin(userlogin: LoginUserDto): Promise<{
        token: string;
    }>;
    userLogout(user: any): Promise<{
        message: string;
    }>;
    userfind(id: any): Promise<User>;
}
