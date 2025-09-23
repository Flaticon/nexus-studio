import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Patch,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AIOrchestrator } from './services/ai-orchestrator.service';
import { CreateChatSessionDto, SendMessageDto, UpdateChatSessionDto } from './dto/chat.dto';
import { GenerateInsightsDto, GetInsightsDto, AnalyzeStartupDto } from './dto/insights.dto';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AIController {
  constructor(private readonly aiOrchestrator: AIOrchestrator) {}

  // === INSIGHTS ENDPOINTS ===

  @Post('insights/generate')
  async generateInsights(
    @Body() generateInsightsDto: GenerateInsightsDto,
    // TODO: Get user from JWT token
    // @CurrentUser() user: any
  ) {
    try {
      const userId = 'current-user-id'; // TODO: Extract from JWT

      const insights = await this.aiOrchestrator.generateAutomaticInsights(
        userId,
        generateInsightsDto.startupId
      );

      return {
        success: true,
        data: insights,
        count: insights.length
      };
    } catch (error) {
      throw new HttpException(
        'Failed to generate insights',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('insights')
  async getInsights(
    @Query() getInsightsDto: GetInsightsDto,
    // @CurrentUser() user: any
  ) {
    try {
      const userId = 'current-user-id'; // TODO: Extract from JWT

      const insights = await this.aiOrchestrator.getUserInsights(userId, {
        type: getInsightsDto.type,
        priority: getInsightsDto.priority,
        startupId: getInsightsDto.startupId,
        isRead: getInsightsDto.isRead
      });

      return {
        success: true,
        data: insights,
        count: insights.length
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch insights',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('insights/:id/read')
  async markInsightAsRead(@Param('id') insightId: string) {
    try {
      await this.aiOrchestrator.markInsightAsRead(insightId);
      return {
        success: true,
        message: 'Insight marked as read'
      };
    } catch (error) {
      throw new HttpException(
        'Failed to mark insight as read',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // === STARTUP ANALYSIS ENDPOINTS ===

  @Post('analyze/startup/:id')
  async analyzeStartup(
    @Param('id') startupId: string,
    @Body() analyzeStartupDto: AnalyzeStartupDto
  ) {
    try {
      const analyses = await this.aiOrchestrator.analyzeStartup(
        startupId,
        analyzeStartupDto.provider
      );

      return {
        success: true,
        data: analyses,
        count: analyses.length
      };
    } catch (error) {
      throw new HttpException(
        'Failed to analyze startup',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // === CHAT ENDPOINTS ===

  @Post('chat/sessions')
  async createChatSession(
    @Body() createChatSessionDto: CreateChatSessionDto,
    // @CurrentUser() user: any
  ) {
    try {
      const userId = 'current-user-id'; // TODO: Extract from JWT

      const session = await this.aiOrchestrator.createChatSession(
        userId,
        createChatSessionDto.title
      );

      return {
        success: true,
        data: session
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create chat session',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('chat/sessions')
  async getChatSessions(
    // @CurrentUser() user: any
  ) {
    try {
      const userId = 'current-user-id'; // TODO: Extract from JWT

      // TODO: Implement getUserChatSessions in AIOrchestrator
      return {
        success: true,
        data: [],
        message: 'Chat sessions endpoint - to be implemented'
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch chat sessions',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('chat/sessions/:id/messages')
  async sendMessage(
    @Param('id') sessionId: string,
    @Body() sendMessageDto: SendMessageDto
  ) {
    try {
      const response = await this.aiOrchestrator.chatWithAI(
        sessionId,
        sendMessageDto.message,
        sendMessageDto.provider || 'openai'
      );

      return {
        success: true,
        data: response
      };
    } catch (error) {
      throw new HttpException(
        'Failed to send message',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('chat/sessions/:id')
  async getChatSession(@Param('id') sessionId: string) {
    try {
      // TODO: Implement getChatSession in AIOrchestrator
      return {
        success: true,
        data: null,
        message: 'Get chat session endpoint - to be implemented'
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch chat session',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('chat/sessions/:id')
  async updateChatSession(
    @Param('id') sessionId: string,
    @Body() updateChatSessionDto: UpdateChatSessionDto
  ) {
    try {
      // TODO: Implement updateChatSession in AIOrchestrator
      return {
        success: true,
        message: 'Update chat session endpoint - to be implemented'
      };
    } catch (error) {
      throw new HttpException(
        'Failed to update chat session',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // === HEALTH & STATUS ENDPOINTS ===

  @Get('health')
  async getAIHealth() {
    try {
      // TODO: Check AI providers status
      return {
        success: true,
        data: {
          openai: 'healthy',
          anthropic: 'healthy',
          database: 'connected',
          lastInsightGeneration: new Date(),
          activeChats: 0
        }
      };
    } catch (error) {
      throw new HttpException(
        'Failed to check AI health',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('stats')
  async getAIStats(
    // @CurrentUser() user: any
  ) {
    try {
      const userId = 'current-user-id'; // TODO: Extract from JWT

      // TODO: Implement AI usage statistics
      return {
        success: true,
        data: {
          totalInsights: 0,
          unreadInsights: 0,
          chatSessions: 0,
          messagesThisMonth: 0,
          mostUsedProvider: 'openai',
          favoriteInsightType: 'opportunity'
        }
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch AI stats',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}