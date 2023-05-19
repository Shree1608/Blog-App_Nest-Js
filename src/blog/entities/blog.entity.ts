import { DefaultValuePipe } from "@nestjs/common";
import slugify from "slugify";
import { Admin } from "src/admin/entities/admin.entity";
import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Blog {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type : "text" , nullable:false})
    title : string;

    @Column({ type : "text" , nullable:false})
    slug : string

    @Column({ type : "text" , nullable: true})
    description : string
     
    @ManyToOne(()=> Category , (category:Category)=>category.blog )
    category:Category

    @ManyToOne(()=> Admin ,(admin : Admin) => admin.blog)
    public author : Admin
    
    @Column({nullable:true})
    blogImage : string

    @CreateDateColumn()
    created_at : Date;

    @ManyToOne(()=> Admin ,(admin : Admin) => admin.blog)
    public updatedBy : Admin

    @UpdateDateColumn()
    updated_at : Date;

    @ManyToOne(()=> Admin ,(admin : Admin) => admin.blog)
    public deletedBy : Admin

    @DeleteDateColumn()
    deleted_at : Date

    @BeforeInsert()
    @BeforeUpdate()
    generateSlug(){
        this.slug = slugify(this.title , {lower : true});
    }

}
