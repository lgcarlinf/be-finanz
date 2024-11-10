import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { TransactionType } from './interfaces/type';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Transaction } from './entities/transaction.entity';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiTags('Transaction')
  @Post('create')
  @Auth()
  createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
    @GetUser() user: User,
  ) {
    return this.transactionService.createTransaction(
      createTransactionDto,
      user,
    );
  }

  @Get('list')
  @ApiResponse({
    status: 201,
    type: Transaction,
  })
  @Auth()
  getTransactions(
    @GetUser() user: User,
    @Query('filter') filter: TransactionType,
  ) {
    return this.transactionService.getTransactionSummary(user);
  }
}
