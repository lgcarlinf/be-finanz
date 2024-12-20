import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { TransactionType } from './interfaces/type';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
    user: User,
  ) {
    try {
      const transaction = this.transactionRepository.create({
        ...createTransactionDto,
        user: user,
      });
      await this.transactionRepository.save(transaction);
      return transaction;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getTransactions(user: User, filter?: TransactionType) {
    try {
      return this.transactionRepository.find({
        where: { user, type: filter },
      });
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getTransactionSummary(user: User) {
    try {
      const incomes = await this.transactionRepository.find({
        where: { user, type: TransactionType.INCOME },
      });
      const expenses = await this.transactionRepository.find({
        where: { user, type: TransactionType.EXPENSE },
      });

      const totalIncome = incomes.reduce(
        (sum, transaction) => transaction.ammount + sum,
        0,
      );
      const totalExpense = expenses.reduce(
        (sum, transaction) => transaction.ammount + sum,
        0,
      );
      const profit = totalIncome - totalExpense;
      const total = {
        totalIncome,
        totalExpense,
      };

      return {
        profit,
        total,
        incomes,
        expenses,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
  handleError(error: any) {
    console.error(error);
  }
}
