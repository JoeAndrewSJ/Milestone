import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn} from "typeorm"



@Entity("User")
export class User{
    @PrimaryGeneratedColumn()
    id?:number;

    @Column({type:"varchar",length:100,unique:true})
    username?:string;

    @Column({type:"varchar",length:255})
    password?:string;

    @CreateDateColumn()
    createdate?:Date;


}