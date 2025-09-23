'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Bot,
  User,
  Send,
  Loader2,
  MessageSquare,
  Settings,
  RefreshCw
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    provider?: string;
  };
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  context: any;
  createdAt: Date;
  updatedAt: Date;
}

interface AIChatInterfaceProps {
  sessionId?: string;
  onSessionChange?: (sessionId: string) => void;
}

const AIChatInterface: React.FC<AIChatInterfaceProps> = ({
  sessionId,
  onSessionChange
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [provider, setProvider] = useState<'openai' | 'anthropic'>('openai');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const createNewSession = async () => {
    try {
      const response = await fetch('/api/ai/chat/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title: `Chat Session - ${new Date().toLocaleDateString()}`
        })
      });

      if (response.ok) {
        const data = await response.json();
        const newSession = data.data;
        setCurrentSession(newSession);
        setMessages([]);
        if (onSessionChange) {
          onSessionChange(newSession.id);
        }
      }
    } catch (error) {
      console.error('Error creating chat session:', error);
      // Mock session for demo
      const mockSession: ChatSession = {
        id: `session_${Date.now()}`,
        title: `Chat Session - ${new Date().toLocaleDateString()}`,
        messages: [],
        context: {},
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setCurrentSession(mockSession);
      setMessages([]);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_user`,
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      let currentSessionId = currentSession?.id;

      if (!currentSessionId) {
        await createNewSession();
        currentSessionId = currentSession?.id;
      }

      const response = await fetch(`/api/ai/chat/sessions/${currentSessionId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          message: inputMessage,
          provider
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage = data.data;
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Mock AI response for demo
      const mockAIResponse: ChatMessage = {
        id: `msg_${Date.now()}_ai`,
        role: 'assistant',
        content: `I understand you're asking about "${inputMessage}". Based on your portfolio data and current market trends, here are my insights:\n\n1. **Key Observation**: Your question touches on an important aspect of startup growth.\n\n2. **Recommendation**: I'd suggest focusing on data-driven approaches to validate your assumptions.\n\n3. **Next Steps**: Consider running a small pilot to test your hypothesis before scaling.\n\nWould you like me to dive deeper into any specific aspect of this analysis?`,
        timestamp: new Date(),
        metadata: { provider }
      };
      setMessages(prev => [...prev, mockAIResponse]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[700px]">
      {/* Header */}
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-blue-600" />
            <CardTitle>AI Assistant</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value as 'openai' | 'anthropic')}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="openai">OpenAI</option>
              <option value="anthropic">Claude</option>
            </select>
            <Button
              size="sm"
              variant="outline"
              onClick={createNewSession}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              New Chat
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Messages Area */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Bot className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Start a conversation with AI
            </h3>
            <p className="text-gray-500 mb-4">
              Ask questions about your portfolio, get insights, or discuss strategy.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputMessage("Analyze my portfolio performance")}
              >
                Analyze my portfolio
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputMessage("What are the current market trends?")}
              >
                Market trends
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputMessage("Give me investment recommendations")}
              >
                Investment advice
              </Button>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.role === 'user'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {message.role === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <div className={`flex-1 max-w-xs sm:max-w-md ${
                message.role === 'user' ? 'text-right' : ''
              }`}>
                <div className={`inline-block p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                <div className={`flex items-center mt-1 space-x-2 text-xs text-gray-500 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}>
                  <span>{message.timestamp.toLocaleTimeString()}</span>
                  {message.metadata?.provider && (
                    <Badge variant="outline" className="text-xs">
                      {message.metadata.provider}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
              <Bot className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="inline-block p-3 rounded-lg bg-gray-100">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-gray-600">AI is thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about your portfolio..."
            disabled={loading}
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            disabled={loading || !inputMessage.trim()}
            size="sm"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;