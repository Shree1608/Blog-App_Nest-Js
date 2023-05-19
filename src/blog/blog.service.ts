import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import {  Like, Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { request } from 'express';
import { Admin } from 'src/admin/entities/admin.entity';
import { Query } from 'express-serve-static-core';
import { title } from 'process';
// import { title } from 'process';


@Injectable()
export class BlogService {

  constructor(@InjectRepository(Blog)
  private readonly blogRepo : Repository<Blog>,
 
  )
  {}
 
  async create(createBlogDto: CreateBlogDto , admin : Admin ){
    try{
    const newBlog = await this.blogRepo.create({
      ...createBlogDto ,author :admin , category : createBlogDto.category as Category
    });
    await this.blogRepo.save(newBlog)
    return newBlog
    }catch(error){
      throw new UnauthorizedException('invalid admin')
    }
  }

  async Search(title : string , query:string):Promise<Blog[]>{ 
    return this.blogRepo.find({relations :['category' ,'author'] ,
     where :{
      title : Like(`%${title}%`)
    },
  order:{
    id:'DESC'
  }
  })
  }

  async findAll():Promise<Blog[]>{
    return this.blogRepo.find({relations :['category' , 'author'] ,
  order :{
    id:'DESC'
  }})
  }

  findOne(id: number) {
    const blog = this.blogRepo.findOne({relations :['category' , 'author'],where:{id:id}})
    if(blog) return blog
    throw new NotFoundException('blog not found')
  }

  update(id: number, updateBlogDto: UpdateBlogDto,author:Admin) {
    return this.blogRepo.update(id ,{...updateBlogDto , updatedBy:author , updated_at: new Date})
  }

  async remove(id: number , author : Admin):Promise<void> {
    const deletresponce = await this.blogRepo.softDelete(id)
    if(deletresponce) {
       this.blogRepo.update(id ,{deletedBy:author})
    }
    if(!deletresponce.affected) throw new NotFoundException(id)
  }
}
