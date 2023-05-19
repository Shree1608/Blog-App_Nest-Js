import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Category } from 'src/category/entities/category.entity';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports:[TypeOrmModule.forFeature([Blog , Category])],
  controllers: [BlogController],
  providers: [BlogService , CategoryService]
})
export class BlogModule {}
