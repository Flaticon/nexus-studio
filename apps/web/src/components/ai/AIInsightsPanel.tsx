'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Target,
  Crystal,
  Sparkles,
  Eye,
  MoreHorizontal
} from 'lucide-react';

interface AIInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'trend' | 'prediction';
  title: string;
  description: string;
  confidence: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  actionable: boolean;
  recommendations: string[];
  data?: any;
  isRead: boolean;
  source: string;
  createdAt: string;
}

interface AIInsightsPanelProps {
  userId?: string;
  startupId?: string;
}

const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ userId, startupId }) => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Target className="h-4 w-4" />;
      case 'risk': return <AlertTriangle className="h-4 w-4" />;
      case 'trend': return <TrendingUp className="h-4 w-4" />;
      case 'prediction': return <Crystal className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const generateInsights = async () => {
    setLoading(true);
    try {
      // TODO: Implement actual API call
      const response = await fetch('/api/ai/insights/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ startupId })
      });

      if (response.ok) {
        const data = await response.json();
        setInsights(data.data || []);
      }
    } catch (error) {
      console.error('Error generating insights:', error);
      // Mock data for demo
      const mockInsights: AIInsight[] = [
        {
          id: '1',
          type: 'opportunity',
          title: 'Market Expansion Opportunity',
          description: 'AI analysis suggests potential for expanding into European markets based on current growth trends.',
          confidence: 0.85,
          priority: 'high',
          actionable: true,
          recommendations: [
            'Conduct market research in Germany and France',
            'Analyze regulatory requirements',
            'Develop localization strategy'
          ],
          isRead: false,
          source: 'openai',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          type: 'risk',
          title: 'Customer Churn Risk',
          description: 'Pattern analysis indicates increased churn risk in the enterprise segment.',
          confidence: 0.92,
          priority: 'critical',
          actionable: true,
          recommendations: [
            'Implement proactive customer success program',
            'Analyze feedback patterns',
            'Develop retention strategies'
          ],
          isRead: false,
          source: 'anthropic',
          createdAt: new Date().toISOString()
        }
      ];
      setInsights(mockInsights);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (insightId: string) => {
    try {
      await fetch(`/api/ai/insights/${insightId}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setInsights(prev =>
        prev.map(insight =>
          insight.id === insightId
            ? { ...insight, isRead: true }
            : insight
        )
      );
    } catch (error) {
      console.error('Error marking insight as read:', error);
    }
  };

  const filteredInsights = insights.filter(insight => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !insight.isRead;
    return insight.type === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">AI Insights</h2>
        </div>
        <Button
          onClick={generateInsights}
          disabled={loading}
          className="flex items-center space-x-2"
        >
          <Sparkles className="h-4 w-4" />
          <span>{loading ? 'Generating...' : 'Generate Insights'}</span>
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {['all', 'unread', 'opportunity', 'risk', 'trend', 'prediction'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === filterType
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>

      {/* Insights List */}
      <div className="space-y-4">
        {filteredInsights.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Brain className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No insights available</h3>
              <p className="text-gray-500 text-center mb-4">
                Generate AI insights to get personalized recommendations and analysis.
              </p>
              <Button onClick={generateInsights} disabled={loading}>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate First Insights
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredInsights.map((insight) => (
            <Card
              key={insight.id}
              className={`transition-all hover:shadow-md ${
                !insight.isRead ? 'border-l-4 border-l-blue-500' : ''
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      insight.type === 'opportunity' ? 'bg-green-100 text-green-600' :
                      insight.type === 'risk' ? 'bg-red-100 text-red-600' :
                      insight.type === 'trend' ? 'bg-blue-100 text-blue-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {getInsightIcon(insight.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getPriorityColor(insight.priority)}>
                          {insight.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {Math.round(insight.confidence * 100)}% confidence
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {insight.source}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!insight.isRead && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => markAsRead(insight.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    <Button size="sm" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{insight.description}</p>

                {insight.actionable && insight.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Recommendations:</h4>
                    <ul className="space-y-1">
                      {insight.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span className="text-gray-600 text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AIInsightsPanel;