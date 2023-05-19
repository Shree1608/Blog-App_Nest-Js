/// <reference types="multer" />
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CategoryService } from 'src/category/category.service';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
export declare class BlogController {
    private readonly blogService;
    private readonly catService;
    constructor(blogService: BlogService, catService: CategoryService);
    create(createBlogDto: CreateBlogDto, req: any, catDto: CreateCategoryDto, blogImage: Express.Multer.File): Promise<import("./entities/blog.entity").Blog>;
    findandSearch(title: string, query: string): Promise<import("./entities/blog.entity").Blog[]>;
    findAll(): Promise<import("./entities/blog.entity").Blog[]>;
    findOne(id: string): Promise<import("./entities/blog.entity").Blog>;
    update(id: string, updateBlogDto: UpdateBlogDto, req: any): Promise<import("typeorm").UpdateResult>;
    remove(id: string, req: any): Promise<void>;
}
