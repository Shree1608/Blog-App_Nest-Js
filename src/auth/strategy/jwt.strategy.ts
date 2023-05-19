import { Injectable, UnauthorizedException, forwardRef } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AdminModule } from "src/admin/admin.module";
import { Admin } from "src/admin/entities/admin.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtAdminSrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(Admin) 
        private readonly adminRepo : Repository<Admin>,
        @InjectRepository(User) 
        private readonly userRepo : Repository<User>
    ){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : process.env.JWT_SECRET
        })
    }

    async validate(payload){

        const {id} = payload;
        console.log(id);
        const findadmin = await this.adminRepo.findBy({id:id})
        if(findadmin[0] == null){
            
            const finduser = await this.userRepo.findBy({id:id})
            console.log(finduser);
            
            if(finduser[0].token == null){
                throw new UnauthorizedException('login first')
            }
            return finduser
        }
        return findadmin
    }
}