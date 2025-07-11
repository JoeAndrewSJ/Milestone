
import { PrimaryGeneratedColumn,Entity,Column,CreateDateColumn,OneToMany,UpdateDateColumn,ManyToOne, JoinColumn } from "typeorm";
import { Cart } from "./carts.schema";
import { Menu } from "./Menu.schema";

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cartItemId: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  @ManyToOne(() => Cart, cart => cart.cartItems)
   @JoinColumn({ name: 'CartId' })
    cart: Cart;

    
  @Column()
  cartId: number;

  @ManyToOne(() => Menu, menu => menu.cartItems)
  @Column()
  menuId: number;
}