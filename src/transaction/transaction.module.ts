import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthModule } from 'src/auth/auth.module';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Transaction])],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {
  controllers = [];
  providers = [TransactionService];
}
