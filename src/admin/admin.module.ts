import { Module, forwardRef } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'process';
import { JwtAdminSrategy } from 'src/auth/strategy/jwt.strategy';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { Repository } from 'typeorm';

@Module({
  imports:[ Repository<User>,PassportModule.register({defaultStrategy:'jwt'}),
  JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory:(config : ConfigService)=>{
      return{
        secret : config.get<string>('JWT_SECRET'),
        signOptions:{
          expiresIn:  config.get<string| number>('JWT_EXPIRES'),
      }
      }
  }})
  ,TypeOrmModule.forFeature([Admin,User ])],
  controllers: [AdminController],
  providers: [AdminService , JwtAdminSrategy],
  exports:[JwtAdminSrategy,PassportModule]
})
export class AdminModule {}
