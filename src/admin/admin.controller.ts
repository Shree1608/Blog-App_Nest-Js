import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './entities/admin.entity';
import { AdminLoginDto } from './dto/admin-login.dto';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/auth/guard/accessToken.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  async create(@Body() createAdminDto: CreateAdminDto) : Promise<Admin>{
    return this.adminService.adminSignup(createAdminDto);
  }

  @Post('login')
  async login(@Body() adminDto : AdminLoginDto): Promise<{token : string}>{
    return this.adminService.adminLogin(adminDto)
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout(@Req() req:Request){
    const admin = req.user
    return this.adminService.adminLogout(admin)  
  }
}
