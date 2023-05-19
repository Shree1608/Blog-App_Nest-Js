import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Address } from './entities/user-address.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { JwtAdminSrategy } from 'src/auth/strategy/jwt.strategy';
import { AdminModule } from 'src/admin/admin.module';
import { Admin } from 'src/admin/entities/admin.entity';

@Module({
  
  imports :[AdminModule,PassportModule.register({defaultStrategy:'jwt'}),
  JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory:(config : ConfigService)=>{
      return{
        secret : config.get<string>('JWT_SECRET'),
        signOptions:{
          expiresIn:  config.get<string| number>('JWT_EXPIRES'),
      }
      }
  }}),TypeOrmModule.forFeature([User , Address,Admin]),
],
  controllers: [UserController],
  providers: [UserService , JwtAdminSrategy ],
  exports :[JwtAdminSrategy , PassportModule]
})
export class UserModule {}
