import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend communication
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Next.js dev server
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  await app.listen(process.env.PORT ?? 4000);
  console.log(`🚀 API Server running on port ${process.env.PORT ?? 4000}`);
}
bootstrap();
