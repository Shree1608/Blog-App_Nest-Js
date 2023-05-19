import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class CategoryService {

  constructor( @InjectRepository(Category)
  private readonly categoryRepository : Repository<Category>){}

  async create(createCategoryDto: CreateCategoryDto ,admin: Admin){
  try {
    const newCategory = await this.categoryRepository.create({
      ...createCategoryDto ,
      admin: admin,

    }); 
    await this.categoryRepository.save(newCategory);
    return newCategory
  } catch (error) {
    throw new UnauthorizedException('invalid admin')
  }
  }

  findAll() {
    return this.categoryRepository.find({relations:['admin']})
  }

  async findOne(id) {
    const category = await this.categoryRepository.findOne({relations : ['admin'] , where :{id:id}})
    if(category){
      return category
    }
    throw new NotFoundException(id);
  }

  async update(id, updateCategoryDto: UpdateCategoryDto ,admin: Admin) {
   const updateCat = await this.categoryRepository.update(id ,{ ...updateCategoryDto , updatedBy:admin , updated_at: new Date});
   return
  }

  async deleteCategory(id, admin:Admin): Promise<void>{
    const deleteResponse = await this.categoryRepository.softDelete(id)
    if(deleteResponse){
      const deletedby = await this.categoryRepository.update( id ,{deletedBy:admin})
    }
    if(!deleteResponse.affected){
      throw new NotFoundException(id);
    }
  }
  
}
