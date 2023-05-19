import { Blog } from "src/blog/entities/blog.entity";
import { Category } from "src/category/entities/category.entity";
import { Collection } from "typeorm";
export declare class Admin {
    id: number;
    adminName: string;
    email: string;
    password: string;
    token: string;
    category: Collection<Category>;
    blog: Blog[];
}
