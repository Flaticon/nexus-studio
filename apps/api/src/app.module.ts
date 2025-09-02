// apps/api/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { BullModule } from '@nestjs/bull';

// Import modules
import { AuthModule } from './modules/auth/auth.module';
import { StrategyModule } from './modules/strategy/strategy.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { FinanceModule } from './modules/finance/finance.module';
import { UsersModule } from './modules/users/users.module';
import { OkrsModule } from './modules/okrs/okrs.module';
import { TalentModule } from './modules/talent/talent.module';
import { InsightsModule } from './modules/insights/insights.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Database
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    
    // Rate limiting
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    
    // Queue
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    
    // Feature modules
    AuthModule,
    StrategyModule,
    PortfolioModule,
    FinanceModule,
    UsersModule,
    OkrsModule,
    TalentModule,
    InsightsModule,
    DashboardModule,
  ],
})
export class AppModule {}