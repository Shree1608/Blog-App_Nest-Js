
import { Admin } from "../../admin/entities/admin.entity";
import { Blog } from "src/blog/entities/blog.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id : number;
    
    @Column()
    categoryName : string;

    @CreateDateColumn()
    created_at : Date

    @ManyToOne(()=> Blog)
    blog: Blog[]

    @ManyToOne(()=> Admin ,(admin:Admin)=>admin.category)
    admin : Admin;

    @ManyToOne(()=> Admin ,(admin:Admin)=>admin.category)
    updatedBy : Admin

    @UpdateDateColumn()
    updated_at : Date
   
    @ManyToOne(()=> Admin ,(admin:Admin)=>admin.category)
    deletedBy : Admin

    @DeleteDateColumn()
    deleted_at : Date

   
}
