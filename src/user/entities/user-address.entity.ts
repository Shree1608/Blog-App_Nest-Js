import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    public id : number;

    @Column({type: "text" , nullable:false})
    public street : string;

    @Column({type: "text" , nullable:false})
    public city:string;
    
    @Column({type: "text" , nullable:false})
    public country : string;

    @OneToOne(()=> User , (user : User) => user.address)
    user : User
}