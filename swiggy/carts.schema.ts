import { PrimaryGeneratedColumn,Entity,Column,CreateDateColumn,OneToMany,UpdateDateColumn,ManyToOne } from "typeorm";
import { User } from "./users.schema";
import { CartItem } from "./CartItem.schema";


@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  CartItemId: number;

  @Column()
  cartId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  @ManyToOne(() => User, user => User.carts)
  user:User;
  

  @Column()
  userId: number;

  @OneToMany(() => CartItem, cartItem => cartItem.cart)
  cartItems: CartItem[];
}