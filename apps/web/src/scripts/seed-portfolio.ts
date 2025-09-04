// apps/api/src/scripts/seed-portfolio.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PortfolioService } from '../modules/portfolio/portfolio.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const portfolioService = app.get(PortfolioService);

  const startups = [
    {
      name: 'FinTech Pro',
      slug: 'fintech-pro',
      description: 'Revolutionary payment solution',
      stage: 'growth',
      status: 'active',
      squadLead: '507f1f77bcf86cd799439011',
      squadMembers: ['507f1f77bcf86cd799439012'],
      industry: 'FinTech',
      tags: ['payments', 'b2b', 'saas']
    },
    {
      name: 'HealthAI',
      slug: 'health-ai',
      description: 'AI-powered diagnostics',
      stage: 'validation',
      status: 'active',
      squadLead: '507f1f77bcf86cd799439011',
      squadMembers: [],
      industry: 'HealthTech',
      tags: ['ai', 'healthcare', 'diagnostics']
    }
  ];

  for (const startup of startups) {
    await portfolioService.create(startup as any);
  }

  console.log('Seed completed!');
  await app.close();
}

seed();