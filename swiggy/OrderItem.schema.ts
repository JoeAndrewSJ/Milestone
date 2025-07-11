
import { PrimaryGeneratedColumn,Entity,Column,CreateDateColumn,OneToMany,UpdateDateColumn,ManyToOne, JoinColumn } from "typeorm";
import { Menu } from "./Menu.schema";
import { Order } from "./orders.schema";

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderItemId: string;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  
  @ManyToOne(() => Order, order => order.orderItems)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column()
  orderId: number;

  @ManyToOne(() => Menu, menu => menu.orderItems)
  @JoinColumn({ name: 'menuId' })
  menu: Menu;

  @Column()
  menuId: number;
}