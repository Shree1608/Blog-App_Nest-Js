import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    create(createCategoryDto: CreateCategoryDto, admin: Admin): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOne(id: any): Promise<Category>;
    update(id: any, updateCategoryDto: UpdateCategoryDto, admin: Admin): Promise<void>;
    deleteCategory(id: any, admin: Admin): Promise<void>;
}
