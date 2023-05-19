import { Admin } from "src/admin/entities/admin.entity";
import { Category } from "src/category/entities/category.entity";
export declare class Blog {
    id: number;
    title: string;
    slug: string;
    description: string;
    category: Category;
    author: Admin;
    blogImage: string;
    created_at: Date;
    updatedBy: Admin;
    updated_at: Date;
    deletedBy: Admin;
    deleted_at: Date;
    generateSlug(): void;
}
