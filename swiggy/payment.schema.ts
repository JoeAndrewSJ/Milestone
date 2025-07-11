import { PrimaryGeneratedColumn,Entity,Column,CreateDateColumn,OneToMany,UpdateDateColumn,ManyToOne } from "typeorm";
import { User } from "./users.schema";
import { Order } from "./orders.schema";



@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paymentId: string;

  @Column()
  orderId: string;

  @Column()
  paymentMethod: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  paymentStatus: string;

  @Column()
  transactionId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => User, user => user.payments)
    user:User;

  @Column()
  userId: number;

  @ManyToOne(() => Order, order => order.payments)
  order:Order;

}
  