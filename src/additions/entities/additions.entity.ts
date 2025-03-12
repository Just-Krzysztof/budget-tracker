import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

// First define the enum with allowed values
export enum AdditionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity('additions')
export class Addition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: number;

  @Column()
  currency: string;

  @Column()
  tag: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: AdditionType,
    default: AdditionType.EXPENSE,
  })
  type: AdditionType;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
