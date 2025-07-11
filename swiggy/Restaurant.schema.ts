import { PrimaryGeneratedColumn,Entity,Column,CreateDateColumn,UpdateDateColumn,OneToMany } from "typeorm";
import { Menu } from "./Menu.schema";
import { Order } from "./orders.schema";



@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  rImage: string;

  @Column({ type: 'decimal', precision: 3, scale: 2 })
  ratings: number;

  @Column()
  cuisineType: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

 
  @OneToMany(() => Menu, menu => menu.restaurant)
  menus: Menu[];

  @OneToMany(() => Order, order => order.restaurant)
  orders: Order[];
}