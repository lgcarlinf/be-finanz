import { User } from '../../auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TransactionType } from '../interfaces/type';
import { ApiProperty } from '@nestjs/swagger';

@Entity('transaction')
export class Transaction {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  type: TransactionType;

  @ApiProperty({
    example: 'This is a description',
  })
  @Column({ unique: true })
  description: string;

  @ApiProperty({
    example: '1000',
  })
  @Column()
  ammount: number;

  @ApiProperty({
    example: '2021-08-21T00:00:00.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2021-08-21T00:00:00.000Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}
