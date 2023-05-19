import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express';

import { AccessTokenGuard } from 'src/auth/guard/accessToken.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async create(@Body() userDto : CreateUserDto) : Promise<User>{
    return this.userService.userSignup(userDto)
  }
  @Post('login')
  async login(@Body() loginDto : LoginUserDto): Promise<{token : string}>{
    return this.userService.userLogin(loginDto)
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout(@Req() req:Request){
    const user = req.user
    return this.userService.userLogout(user)
  }
  
}
