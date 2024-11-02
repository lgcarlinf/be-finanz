import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthModule } from 'src/auth/auth.module';
import { Transaction } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [TransactionService],
})
export class TransactionModule {
  controllers = [];
  providers = [TransactionService];
}
