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
export enum FinancialRecordType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity('financialRecords')
export class FinancialRecord {
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
    enum: FinancialRecordType,
    default: FinancialRecordType.EXPENSE,
  })
  type: FinancialRecordType;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
