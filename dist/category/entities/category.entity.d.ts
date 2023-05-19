import { Admin } from "../../admin/entities/admin.entity";
import { Blog } from "src/blog/entities/blog.entity";
export declare class Category {
    id: number;
    categoryName: string;
    created_at: Date;
    blog: Blog[];
    admin: Admin;
    updatedBy: Admin;
    updated_at: Date;
    deletedBy: Admin;
    deleted_at: Date;
}
