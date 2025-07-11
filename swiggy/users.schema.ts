import { PrimaryGeneratedColumn,Entity,Column,CreateDateColumn, OneToMany } from "typeorm";
import { Cart } from "./carts.schema";
import { Order } from "./orders.schema";
import { Payment } from "./payment.schema";


@Entity('Users')
export class User{

    @PrimaryGeneratedColumn()
    UserId:number;

    @Column({nullable:false,unique:true})
    Username:string;

    @Column({unique:true,nullable:false})
    email:string;

    @Column({nullable:false})
    password:string;

    @Column()
    address:string;

    @Column({unique:true})
    mobilenumber:number;

    @CreateDateColumn()
    createdAt: Date;

     @OneToMany(() => Cart, cart => cart.user)
        carts: Cart[];

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @OneToMany(() => Payment, payment => payment.user)
  payments: Payment[];

}