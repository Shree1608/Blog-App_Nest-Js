import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal : true}),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username:process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD,
      database:process.env.DB_NAME,
      autoLoadEntities:true,
      synchronize:true
    }),
    BlogModule,
    CategoryModule,
    UserModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
