import { PrimaryGeneratedColumn,Entity,Column,CreateDateColumn,OneToMany,UpdateDateColumn,ManyToOne } from "typeorm";
import { Restaurant } from "./Restaurant.schema";
import { CartItem } from "./CartItem.schema";
import { OrderItem } from "./OrderItem.schema";



@Entity('menus')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  
  menuId: string;

  @Column()
  name: string;

  @Column()
  dishName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  availability: boolean;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
4
  
  @ManyToOne(() => Restaurant, restaurant => restaurant.menus)
  @Column()
  restaurantId: number;

  @OneToMany(() => CartItem, cartItem => cartItem.menu)
  cartItems: CartItem[];

  @OneToMany(() => OrderItem, orderItem => orderItem.menu)
  orderItems: OrderItem[];
}