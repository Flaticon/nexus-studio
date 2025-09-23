'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import {
  TrendingUp,
  AlertTriangle,
  Target,
  Clock,
  BarChart3,
  Brain,
  Loader2,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface RiskFactor {
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  impact: number;
  likelihood: number;
  mitigation: string[];
}

interface Opportunity {
  type: string;
  description: string;
  potential: number;
  timeframe: 'short' | 'medium' | 'long';
  requirements: string[];
}

interface MarketTrend {
  category: string;
  trend: string;
  direction: 'up' | 'down' | 'stable';
  impact: number;
  timeframe: string;
}

interface Recommendation {
  category: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  timeline: string;
}

interface StartupAnalysis {
  overallScore: number;
  successProbability: number;
  riskFactors: RiskFactor[];
  opportunities: Opportunity[];
  marketTrends: MarketTrend[];
  recommendations: Recommendation[];
  nextSteps: string[];
}

interface AIStartupAnalysisProps {
  startupId: string;
  startupName?: string;
}

const AIStartupAnalysis: React.FC<AIStartupAnalysisProps> = ({
  startupId,
  startupName
}) => {
  const [analyses, setAnalyses] = useState<StartupAnalysis[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const analyzeStartup = async (provider: 'openai' | 'anthropic' | 'both' = 'both') => {
    setLoading(true);
    try {
      const response = await fetch(`/api/ai/analyze/startup/${startupId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ provider })
      });

      if (response.ok) {
        const data = await response.json();
        setAnalyses(data.data || []);
      } else {
        throw new Error('Failed to analyze startup');
      }
    } catch (error) {
      console.error('Error analyzing startup:', error);
      // Mock data for demo
      const mockAnalysis: StartupAnalysis = {
        overallScore: 78,
        successProbability: 0.72,
        riskFactors: [
          {
            type: 'market',
            description: 'Highly competitive market with established players',
            severity: 'medium',
            impact: 0.6,
            likelihood: 0.8,
            mitigation: ['Differentiation strategy', 'Niche focus', 'Strategic partnerships']
          },
          {
            type: 'financial',
            description: 'Limited runway for product development',
            severity: 'high',
            impact: 0.9,
            likelihood: 0.4,
            mitigation: ['Secure additional funding', 'Optimize burn rate', 'Revenue acceleration']
          }
        ],
        opportunities: [
          {
            type: 'market',
            description: 'Growing demand in emerging markets',
            potential: 0.8,
            timeframe: 'medium',
            requirements: ['Market research', 'Local partnerships', 'Regulatory compliance']
          },
          {
            type: 'product',
            description: 'AI integration potential',
            potential: 0.9,
            timeframe: 'long',
            requirements: ['AI expertise', 'Data infrastructure', 'User research']
          }
        ],
        marketTrends: [
          {
            category: 'technology',
            trend: 'AI adoption accelerating',
            direction: 'up',
            impact: 0.8,
            timeframe: '12-24 months'
          },
          {
            category: 'regulation',
            trend: 'Data privacy regulations tightening',
            direction: 'up',
            impact: 0.6,
            timeframe: '6-12 months'
          }
        ],
        recommendations: [
          {
            category: 'product',
            title: 'Accelerate AI integration',
            description: 'Leverage growing AI trend to differentiate product offering',
            priority: 'high',
            effort: 'high',
            impact: 'high',
            timeline: '3-6 months'
          },
          {
            category: 'market',
            title: 'Explore partnerships',
            description: 'Form strategic partnerships to accelerate market entry',
            priority: 'medium',
            effort: 'medium',
            impact: 'high',
            timeline: '2-4 months'
          }
        ],
        nextSteps: [
          'Develop detailed AI integration roadmap',
          'Identify and reach out to potential strategic partners',
          'Conduct customer interviews to validate market assumptions',
          'Prepare fundraising materials for Series A'
        ]
      };
      setAnalyses([mockAnalysis]);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            AI Startup Analysis
            {startupName && <span className="text-gray-500 ml-2">- {startupName}</span>}
          </h2>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => analyzeStartup('openai')}
            disabled={loading}
            variant="outline"
          >
            Analyze with OpenAI
          </Button>
          <Button
            onClick={() => analyzeStartup('anthropic')}
            disabled={loading}
            variant="outline"
          >
            Analyze with Claude
          </Button>
          <Button
            onClick={() => analyzeStartup('both')}
            disabled={loading}
            className="flex items-center space-x-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <BarChart3 className="h-4 w-4" />
            )}
            <span>Full Analysis</span>
          </Button>
        </div>
      </div>

      {/* Analysis Results */}
      {analyses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Brain className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No analysis available
            </h3>
            <p className="text-gray-500 text-center mb-4">
              Run an AI analysis to get comprehensive insights about this startup.
            </p>
            <Button onClick={() => analyzeStartup('both')} disabled={loading}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Start Analysis
            </Button>
          </CardContent>
        </Card>
      ) : (
        analyses.map((analysis, index) => (
          <div key={index} className="space-y-6">
            {/* Overall Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Overall Assessment</span>
                  <Badge variant="outline">
                    Analysis #{index + 1}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Overall Score</h4>
                    <div className="flex items-center space-x-3">
                      <Progress value={analysis.overallScore} className="flex-1" />
                      <span className="text-2xl font-bold text-blue-600">
                        {analysis.overallScore}/100
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Success Probability</h4>
                    <div className="flex items-center space-x-3">
                      <Progress value={analysis.successProbability * 100} className="flex-1" />
                      <span className="text-2xl font-bold text-green-600">
                        {Math.round(analysis.successProbability * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Factors */}
            <Card>
              <CardHeader>
                <button
                  onClick={() => toggleSection(`risks-${index}`)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span>Risk Factors ({analysis.riskFactors.length})</span>
                  </CardTitle>
                  {expandedSections.has(`risks-${index}`) ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>
              </CardHeader>
              {expandedSections.has(`risks-${index}`) && (
                <CardContent>
                  <div className="space-y-4">
                    {analysis.riskFactors.map((risk, riskIndex) => (
                      <div key={riskIndex} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 capitalize">{risk.type}</h4>
                          <Badge className={getSeverityColor(risk.severity)}>
                            {risk.severity}
                          </Badge>
                        </div>
                        <p className="text-gray-700 mb-3">{risk.description}</p>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <span className="text-sm text-gray-500">Impact</span>
                            <Progress value={risk.impact * 100} className="mt-1" />
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Likelihood</span>
                            <Progress value={risk.likelihood * 100} className="mt-1" />
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-1">Mitigation Strategies:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {risk.mitigation.map((strategy, strategyIndex) => (
                              <li key={strategyIndex} className="flex items-start space-x-2">
                                <span className="text-gray-400 mt-0.5">•</span>
                                <span>{strategy}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Opportunities */}
            <Card>
              <CardHeader>
                <button
                  onClick={() => toggleSection(`opportunities-${index}`)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-green-600" />
                    <span>Opportunities ({analysis.opportunities.length})</span>
                  </CardTitle>
                  {expandedSections.has(`opportunities-${index}`) ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>
              </CardHeader>
              {expandedSections.has(`opportunities-${index}`) && (
                <CardContent>
                  <div className="space-y-4">
                    {analysis.opportunities.map((opportunity, oppIndex) => (
                      <div key={oppIndex} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 capitalize">{opportunity.type}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{opportunity.timeframe} term</Badge>
                            <Badge className="bg-green-100 text-green-800">
                              {Math.round(opportunity.potential * 100)}% potential
                            </Badge>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{opportunity.description}</p>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-1">Requirements:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {opportunity.requirements.map((req, reqIndex) => (
                              <li key={reqIndex} className="flex items-start space-x-2">
                                <span className="text-gray-400 mt-0.5">•</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <button
                  onClick={() => toggleSection(`recommendations-${index}`)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span>Recommendations ({analysis.recommendations.length})</span>
                  </CardTitle>
                  {expandedSections.has(`recommendations-${index}`) ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>
              </CardHeader>
              {expandedSections.has(`recommendations-${index}`) && (
                <CardContent>
                  <div className="space-y-4">
                    {analysis.recommendations.map((rec, recIndex) => (
                      <div key={recIndex} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{rec.title}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge className={getPriorityColor(rec.priority)}>
                              {rec.priority}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {rec.timeline}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{rec.description}</p>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <span className="text-sm text-gray-500 block">Effort</span>
                            <span className="font-medium capitalize">{rec.effort}</span>
                          </div>
                          <div className="text-center">
                            <span className="text-sm text-gray-500 block">Impact</span>
                            <span className="font-medium capitalize">{rec.impact}</span>
                          </div>
                          <div className="text-center">
                            <span className="text-sm text-gray-500 block">Category</span>
                            <span className="font-medium capitalize">{rec.category}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span>Immediate Next Steps</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {analysis.nextSteps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {stepIndex + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        ))
      )}
    </div>
  );
};

export default AIStartupAnalysis;