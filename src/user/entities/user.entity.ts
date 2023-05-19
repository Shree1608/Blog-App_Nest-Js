import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./user-address.entity";
import { Blog } from "src/blog/entities/blog.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id : number;

    @Column({type: "text" , nullable:false})
    firstName : string;

    @Column({type: "text" , nullable:false})
    lastName : string;

    @Column({type: "text" , nullable:false})
    userName : string;

    @Column({ type: "text" , nullable:false,unique : true})
    email : string;

    @Column({type: "text" , nullable:false})
    @Exclude()
    password : string;

    @Column({nullable : true})
    token : string;
    
    @Column({type: "numeric" , nullable:true})
    age : number;

    @OneToOne(() => Address , {
        eager : true,
        cascade: true
    })
    @JoinColumn()
    address : Address

    
}