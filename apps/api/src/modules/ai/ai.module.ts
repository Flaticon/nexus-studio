import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

// Controllers
import { AIController } from './ai.controller';

// Services
import { OpenAIService } from './services/openai.service';
import { AnthropicService } from './services/anthropic.service';
import { AIOrchestrator } from './services/ai-orchestrator.service';

// Schemas
import { AIInsight, AIInsightSchema } from './schemas/ai-insight.schema';
import { ChatSession, ChatSessionSchema } from './schemas/chat-session.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: AIInsight.name, schema: AIInsightSchema },
      { name: ChatSession.name, schema: ChatSessionSchema },
    ]),
  ],
  controllers: [AIController],
  providers: [
    OpenAIService,
    AnthropicService,
    AIOrchestrator,
  ],
  exports: [
    AIOrchestrator,
    OpenAIService,
    AnthropicService,
  ],
})
export class AIModule {}// AI Module restored
