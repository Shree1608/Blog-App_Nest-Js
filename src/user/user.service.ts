import { Injectable ,NotFoundException,UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Address } from './entities/user-address.entity';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)  
        private readonly userRepository : Repository<User>,
        private readonly jwtservice : JwtService
    ){}
       async userSignup(userRepo : CreateUserDto): Promise<User>{
        const {firstName,lastName,userName , email, password , age , address} = userRepo
        const findemail = await this.userRepository.findOneBy({email})
       if(findemail){
        throw new UnauthorizedException('email already exist')
       }
       const hashPass = await bcrypt.hash(password ,10 )
       const admin = await this.userRepository.create({
         firstName,
         lastName, 
         userName, 
         email,
         password:hashPass,
         address,
         age
        })
          return this.userRepository.save(admin)
       }

       async userLogin(userlogin : LoginUserDto) : Promise<{token : string}>{
        const {email , password} = userlogin
        const findemail = await this.userRepository.findOneBy({email})
        if(!findemail){
            throw new NotFoundException('user not found')
        }
        const isPass = await bcrypt.compare(password , findemail.password)
        if(!isPass){
            throw new UnauthorizedException('invalid password')
        }
        const token = await this.jwtservice.sign({id : findemail.id})
        const updatetoken = await this.userRepository.update(findemail.id ,{token : token})
        return {token}
       }


       async userLogout(user){
        console.log(user);
        const logout = this.userRepository.update(user.id ,{token:null})
        return {message :'logout succesfully'}
    }

    async userfind(id){
        const user = await this.userRepository.findOneBy({id})
        return user
    }

}