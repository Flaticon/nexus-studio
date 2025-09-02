// apps/api/src/modules/portfolio/portfolio.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { Startup, StartupSchema } from './schemas/startup.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Startup.name, schema: StartupSchema }
    ])
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService],
  exports: [PortfolioService]
})
export class PortfolioModule {}