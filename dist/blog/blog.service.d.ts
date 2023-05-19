import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
export declare class BlogService {
    private readonly blogRepo;
    constructor(blogRepo: Repository<Blog>);
    create(createBlogDto: CreateBlogDto, admin: Admin): Promise<Blog>;
    Search(title: string, query: string): Promise<Blog[]>;
    findAll(): Promise<Blog[]>;
    findOne(id: number): Promise<Blog>;
    update(id: number, updateBlogDto: UpdateBlogDto, author: Admin): Promise<import("typeorm").UpdateResult>;
    remove(id: number, author: Admin): Promise<void>;
}
