import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { RecordType } from '../enums/record-type.enum';

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
    enum: RecordType,
    default: RecordType.EXPENSE,
  })
  type: RecordType;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
