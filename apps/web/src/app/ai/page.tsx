'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { AIInsightsPanel, AIChatInterface, AIStartupAnalysis } from '../../components/ai';
import {
  Brain,
  MessageSquare,
  BarChart3,
  Sparkles
} from 'lucide-react';

const AIPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('insights');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Assistant</h1>
              <p className="text-gray-600">Powered by OpenAI and Anthropic</p>
            </div>
          </div>
          <p className="text-gray-700 max-w-3xl">
            Get intelligent insights, chat with AI about your portfolio, and receive
            comprehensive startup analysis powered by cutting-edge AI technology.
          </p>
        </div>

        {/* AI Features Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="insights" className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span>AI Insights</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>AI Chat</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Startup Analysis</span>
            </TabsTrigger>
          </TabsList>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AIInsightsPanel userId="current-user" />
              </div>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Insights Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Insights</span>
                        <span className="font-semibold">24</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Unread</span>
                        <span className="font-semibold text-blue-600">7</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">High Priority</span>
                        <span className="font-semibold text-orange-600">3</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Actionable</span>
                        <span className="font-semibold text-green-600">12</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">AI Providers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">OpenAI GPT-4</span>
                        </div>
                        <span className="text-xs text-gray-500">Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Anthropic Claude</span>
                        </div>
                        <span className="text-xs text-gray-500">Active</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* AI Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <Card className="h-[700px]">
                  <AIChatInterface />
                </Card>
              </div>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Chat Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Sessions</span>
                        <span className="font-semibold">8</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Messages</span>
                        <span className="font-semibold">142</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Avg Response</span>
                        <span className="font-semibold">2.3s</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Popular Topics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">Portfolio Analysis</div>
                      <div className="text-sm text-gray-600">Market Trends</div>
                      <div className="text-sm text-gray-600">Investment Strategy</div>
                      <div className="text-sm text-gray-600">Risk Assessment</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Startup Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <AIStartupAnalysis
              startupId="sample-startup-id"
              startupName="Sample Startup"
            />
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Sparkles className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Generate Insights</h3>
              <p className="text-gray-600 text-sm">
                Get AI-powered insights about your portfolio performance and opportunities.
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Start Chat</h3>
              <p className="text-gray-600 text-sm">
                Ask questions and get intelligent responses about your business.
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Analyze Startup</h3>
              <p className="text-gray-600 text-sm">
                Get comprehensive AI analysis of your startup's potential and risks.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIPage;