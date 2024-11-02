import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';

@Module({
  controllers: [],
  providers: [SeedService],
})
export class SeedModule {}
