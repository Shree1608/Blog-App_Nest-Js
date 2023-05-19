import { Blog } from "src/blog/entities/blog.entity";
import { Category } from "src/category/entities/category.entity";
import { Collection, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({type :"text" , nullable:false})
    adminName : string

    @Column({type :"text" , nullable:false})
    email : string

    @Column({type :"text" , nullable:false})
    password :string

    @Column({type :"text" , nullable:true})
    token : string

    @OneToMany(()=> Category ,(category:Category)=> category.admin)
    category : Collection<Category>

    @OneToMany(()=>Blog , (blog:Blog)=> blog.author)
    blog: Blog[];
    
}
