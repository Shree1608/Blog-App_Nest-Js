import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { AdminLoginDto } from './dto/admin-login.dto';
@Injectable()
export class AdminService {
 constructor(
  @InjectRepository(Admin)
  private readonly adminRepo : Repository<Admin>,
  private readonly jwtService : JwtService
 ){}

  async adminSignup(adminDto : CreateAdminDto) : Promise<Admin>{
    const {adminName ,email,password} = adminDto
    const findemail = await this.adminRepo.findOneBy({email})
    if(findemail){
      throw new UnauthorizedException('email already exist')
    }
    const hashPass = await bcrypt.hash(password ,10 )
    const admin = await this.adminRepo.create({
      adminName,
      email,
      password:hashPass
    })
    return this.adminRepo.save(admin)
  }
  async adminLogin(adminDto:AdminLoginDto): Promise<{token :string}>{
    const {email , password} = adminDto
    const admin = await this.adminRepo.findOneBy({email})
    if(!admin){
       throw new NotFoundException('user not found')
    }
    const isPass = await bcrypt.compare(password ,admin.password)
    if(!isPass){
      throw new UnauthorizedException('invalid password')
    }
    const token = this.jwtService.sign({id : admin.id})
    const updateadmin = await this.adminRepo.update(admin.id ,{token:token})
    return {token}
  }

  async adminLogout(admin){
     const logout =this.adminRepo.update(admin.id,{token:null})
     return {message :'logout successfully'}
  }
}
