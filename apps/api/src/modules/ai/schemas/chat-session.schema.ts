import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatSessionDocument = ChatSession & Document;

@Schema({
  timestamps: true,
  collection: 'chat_sessions'
})
export class ChatSession {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop({
    type: [{
      id: String,
      role: { type: String, enum: ['user', 'assistant', 'system'] },
      content: String,
      timestamp: Date,
      metadata: Object
    }],
    default: []
  })
  messages: Array<{
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    metadata?: any;
  }>;

  @Prop({ type: Object })
  context: any;

  @Prop({ default: false })
  isArchived: boolean;

  @Prop()
  lastMessageAt: Date;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const ChatSessionSchema = SchemaFactory.createForClass(ChatSession);