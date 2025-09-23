import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OpenAIService } from './openai.service';
import { AnthropicService } from './anthropic.service';
import { AIInsight, AIInsightDocument } from '../schemas/ai-insight.schema';
import { ChatSession, ChatSessionDocument } from '../schemas/chat-session.schema';
import { AIProvider, StartupAnalysis, ChatMessage } from '../interfaces/ai.interface';

@Injectable()
export class AIOrchestrator {
  private readonly logger = new Logger(AIOrchestrator.name);
  private providers: Map<string, AIProvider> = new Map();

  constructor(
    private openAIService: OpenAIService,
    private anthropicService: AnthropicService,
    @InjectModel(AIInsight.name) private insightModel: Model<AIInsightDocument>,
    @InjectModel(ChatSession.name) private chatSessionModel: Model<ChatSessionDocument>,
  ) {
    this.providers.set('openai', openAIService);
    this.providers.set('anthropic', anthropicService);
  }

  // Generar insights automáticos
  async generateAutomaticInsights(userId: string, startupId?: string): Promise<AIInsight[]> {
    try {
      // Obtener datos del portfolio/startup
      const data = await this.getAnalysisData(userId, startupId);

      // Generar insights con múltiples proveedores
      const [openAIInsights, anthropicInsights] = await Promise.allSettled([
        this.openAIService.generateInsights(data),
        this.anthropicService.generateInsights(data)
      ]);

      const allInsights: AIInsight[] = [];

      if (openAIInsights.status === 'fulfilled') {
        allInsights.push(...openAIInsights.value.map(insight => ({
          ...insight,
          source: 'openai',
          userId,
          startupId,
          isRead: false,
          isArchived: false,
          tags: []
        })));
      }

      if (anthropicInsights.status === 'fulfilled') {
        allInsights.push(...anthropicInsights.value.map(insight => ({
          ...insight,
          source: 'anthropic',
          userId,
          startupId,
          isRead: false,
          isArchived: false,
          tags: []
        })));
      }

      // Guardar insights en la base de datos
      const savedInsights = await this.insightModel.insertMany(allInsights);

      this.logger.log(`Generated ${savedInsights.length} insights for user ${userId}`);
      return savedInsights;
    } catch (error) {
      this.logger.error(`Error generating automatic insights: ${error.message}`);
      throw error;
    }
  }

  // Análisis de startup con múltiples proveedores
  async analyzeStartup(startupId: string, provider: 'openai' | 'anthropic' | 'both' = 'both'): Promise<StartupAnalysis[]> {
    try {
      const startupData = await this.getStartupData(startupId);
      const analyses: StartupAnalysis[] = [];

      if (provider === 'both' || provider === 'openai') {
        try {
          const openAIAnalysis = await this.openAIService.analyzeStartup(startupData);
          analyses.push(openAIAnalysis);
        } catch (error) {
          this.logger.warn(`OpenAI analysis failed: ${error.message}`);
        }
      }

      if (provider === 'both' || provider === 'anthropic') {
        try {
          const anthropicAnalysis = await this.anthropicService.analyzeStartup(startupData);
          analyses.push(anthropicAnalysis);
        } catch (error) {
          this.logger.warn(`Anthropic analysis failed: ${error.message}`);
        }
      }

      return analyses;
    } catch (error) {
      this.logger.error(`Error analyzing startup: ${error.message}`);
      throw error;
    }
  }

  // Chat conversacional
  async chatWithAI(
    sessionId: string,
    message: string,
    provider: 'openai' | 'anthropic' = 'openai'
  ): Promise<ChatMessage> {
    try {
      const session = await this.chatSessionModel.findById(sessionId);
      if (!session) {
        throw new Error('Chat session not found');
      }

      // Agregar mensaje del usuario
      const userMessage: ChatMessage = {
        id: `msg_${Date.now()}_user`,
        role: 'user',
        content: message,
        timestamp: new Date()
      };

      session.messages.push(userMessage);

      // Generar contexto para la AI
      const context = this.buildChatContext(session);

      // Obtener respuesta de la AI
      const aiProvider = this.providers.get(provider);
      if (!aiProvider) {
        throw new Error(`AI provider ${provider} not found`);
      }

      const aiResponse = await aiProvider.generateText(message, context);

      // Agregar respuesta de la AI
      const aiMessage: ChatMessage = {
        id: `msg_${Date.now()}_ai`,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        metadata: { provider }
      };

      session.messages.push(aiMessage);
      session.lastMessageAt = new Date();

      await session.save();

      return aiMessage;
    } catch (error) {
      this.logger.error(`Error in AI chat: ${error.message}`);
      throw error;
    }
  }

  // Crear nueva sesión de chat
  async createChatSession(userId: string, title: string): Promise<ChatSessionDocument> {
    try {
      const session = new this.chatSessionModel({
        userId,
        title,
        messages: [],
        context: await this.getUserContext(userId),
        lastMessageAt: new Date()
      });

      return await session.save();
    } catch (error) {
      this.logger.error(`Error creating chat session: ${error.message}`);
      throw error;
    }
  }

  // Obtener insights del usuario
  async getUserInsights(
    userId: string,
    filters?: {
      type?: string;
      priority?: string;
      startupId?: string;
      isRead?: boolean;
    }
  ): Promise<AIInsightDocument[]> {
    try {
      const query: any = { userId };

      if (filters) {
        if (filters.type) query.type = filters.type;
        if (filters.priority) query.priority = filters.priority;
        if (filters.startupId) query.startupId = filters.startupId;
        if (filters.isRead !== undefined) query.isRead = filters.isRead;
      }

      return await this.insightModel
        .find(query)
        .sort({ createdAt: -1 })
        .exec();
    } catch (error) {
      this.logger.error(`Error getting user insights: ${error.message}`);
      throw error;
    }
  }

  // Marcar insight como leído
  async markInsightAsRead(insightId: string): Promise<void> {
    try {
      await this.insightModel.findByIdAndUpdate(insightId, { isRead: true });
    } catch (error) {
      this.logger.error(`Error marking insight as read: ${error.message}`);
      throw error;
    }
  }

  // Métodos auxiliares privados
  private async getAnalysisData(userId: string, startupId?: string): Promise<any> {
    // TODO: Integrar con otros módulos para obtener datos reales
    return {
      userId,
      startupId,
      portfolioData: {
        totalStartups: 5,
        activeInvestments: 3,
        totalRevenue: 1250000,
        growth: 0.25
      },
      marketData: {
        sector: 'fintech',
        competition: 'high',
        marketSize: 'large'
      }
    };
  }

  private async getStartupData(startupId: string): Promise<any> {
    // TODO: Integrar con portfolio module para obtener datos reales
    return {
      id: startupId,
      name: 'Sample Startup',
      stage: 'seed',
      revenue: 50000,
      team: 8,
      market: 'B2B SaaS',
      metrics: {
        mrr: 15000,
        churn: 0.05,
        growth: 0.15
      }
    };
  }

  private buildChatContext(session: ChatSessionDocument): any {
    return {
      userId: session.userId,
      conversationHistory: session.messages.slice(-10), // Últimos 10 mensajes
      userContext: session.context,
      timestamp: new Date()
    };
  }

  private async getUserContext(userId: string): Promise<any> {
    // TODO: Obtener contexto real del usuario
    return {
      userId,
      role: 'founder',
      interests: ['startups', 'AI', 'growth'],
      portfolioSize: 5
    };
  }
}