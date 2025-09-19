"use client";

import React, { useState, useMemo } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Filter,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  Target,
  Briefcase,
  Zap,
  Search,
  RefreshCw,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import Layout from "../../components/layout/Layout";
import { ModernMetricCard } from "../../components/ui/ModernMetricCard";

// Project category definitions
const PROJECT_CATEGORIES = {
  CleanTech: { icon: "🌱", color: "#10B981" },
  FinTech: { icon: "💰", color: "#3B82F6" },
  HealthTech: { icon: "🏥", color: "#EF4444" },
  "Supply Chain": { icon: "🚚", color: "#F59E0B" },
  EdTech: { icon: "📚", color: "#8B5CF6" },
};

// Project stage definitions
const PROJECT_STAGES = {
  planning: { label: "Planning", icon: "📋", color: "#6B7280" },
  development: { label: "Development", icon: "⚙️", color: "#3B82F6" },
  testing: { label: "Testing", icon: "🧪", color: "#F59E0B" },
  deployment: { label: "Deployment", icon: "🚀", color: "#10B981" },
  maintenance: { label: "Maintenance", icon: "🔧", color: "#8B5CF6" },
};

// Interface definitions
interface ProjectData {
  id: string;
  projectName: string;
  category: keyof typeof PROJECT_CATEGORIES;
  revenue: number;
  expenses: number;
  burnRate: number;
  runway: number; // months
  stage: keyof typeof PROJECT_STAGES;
  budget: number;
  progress: number; // percentage
  lastUpdate: string;
  team: number;
  roi: number; // percentage
}

interface Filters {
  projects: string[];
  categories: string[];
  stages: string[];
  revenueRange: { min: number; max: number };
  runwayRange: { min: number; max: number };
  showOnlyProfitable: boolean;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export default function FinancePage() {
  const [timeRange, setTimeRange] = useState("6months");
  const [selectedMetric, setSelectedMetric] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>({
    projects: [],
    categories: [],
    stages: [],
    revenueRange: { min: 0, max: 1000000 },
    runwayRange: { min: 0, max: 36 },
    showOnlyProfitable: false,
    sortBy: 'revenue',
    sortOrder: 'desc'
  });

  // Mock project financial data
  const projectData: ProjectData[] = [
    {
      id: "1",
      projectName: "EcoTech Carbon Platform",
      category: "CleanTech",
      revenue: 245000,
      expenses: 180000,
      burnRate: -15000,
      runway: 18,
      stage: "deployment",
      budget: 500000,
      progress: 75,
      lastUpdate: "2025-01-15",
      team: 8,
      roi: 36.1,
    },
    {
      id: "2",
      projectName: "FinanceAI Analytics",
      category: "FinTech",
      revenue: 385000,
      expenses: 220000,
      burnRate: -18000,
      runway: 24,
      stage: "maintenance",
      budget: 750000,
      progress: 90,
      lastUpdate: "2025-01-15",
      team: 12,
      roi: 75.0,
    },
    {
      id: "3",
      projectName: "HealthTracker IoT",
      category: "HealthTech",
      revenue: 125000,
      expenses: 95000,
      burnRate: -8000,
      runway: 15,
      stage: "testing",
      budget: 300000,
      progress: 60,
      lastUpdate: "2025-01-14",
      team: 6,
      roi: 31.6,
    },
    {
      id: "4",
      projectName: "SmartChain Logistics",
      category: "Supply Chain",
      revenue: 320000,
      expenses: 280000,
      burnRate: -22000,
      runway: 12,
      stage: "deployment",
      budget: 600000,
      progress: 85,
      lastUpdate: "2025-01-15",
      team: 10,
      roi: 14.3,
    },
    {
      id: "5",
      projectName: "EduVerse Platform",
      category: "EdTech",
      revenue: 85000,
      expenses: 120000,
      burnRate: -25000,
      runway: 8,
      stage: "development",
      budget: 400000,
      progress: 45,
      lastUpdate: "2025-01-13",
      team: 7,
      roi: -29.2,
    },
    {
      id: "6",
      projectName: "GreenEnergy Dashboard",
      category: "CleanTech",
      revenue: 150000,
      expenses: 100000,
      burnRate: -12000,
      runway: 20,
      stage: "maintenance",
      budget: 350000,
      progress: 95,
      lastUpdate: "2025-01-15",
      team: 5,
      roi: 50.0,
    },
  ];

  // Monthly trends data
  const monthlyTrends = [
    { month: "Aug", revenue: 890000, expenses: 720000, netIncome: 170000 },
    { month: "Sep", revenue: 950000, expenses: 780000, netIncome: 170000 },
    { month: "Oct", revenue: 1020000, expenses: 820000, netIncome: 200000 },
    { month: "Nov", revenue: 1150000, expenses: 860000, netIncome: 290000 },
    { month: "Dec", revenue: 1280000, expenses: 900000, netIncome: 380000 },
    { month: "Jan", revenue: 1310000, expenses: 895000, netIncome: 415000 },
  ];

  // Budget allocation by category
  const budgetByCategory = Object.keys(PROJECT_CATEGORIES).map(category => {
    const categoryProjects = projectData.filter(p => p.category === category);
    const totalBudget = categoryProjects.reduce((sum, p) => sum + p.budget, 0);
    const totalSpent = categoryProjects.reduce((sum, p) => sum + p.expenses, 0);

    return {
      name: category,
      budget: totalBudget,
      spent: totalSpent,
      remaining: totalBudget - totalSpent,
      color: PROJECT_CATEGORIES[category as keyof typeof PROJECT_CATEGORIES].color,
      icon: PROJECT_CATEGORIES[category as keyof typeof PROJECT_CATEGORIES].icon,
    };
  });

  // Calculate totals
  const totals = useMemo(() => {
    return {
      revenue: projectData.reduce((sum, project) => sum + project.revenue, 0),
      expenses: projectData.reduce((sum, project) => sum + project.expenses, 0),
      burnRate: projectData.reduce((sum, project) => sum + project.burnRate, 0),
      budget: projectData.reduce((sum, project) => sum + project.budget, 0),
      avgRunway: Math.round(projectData.reduce((sum, project) => sum + project.runway, 0) / projectData.length),
      avgROI: Math.round((projectData.reduce((sum, project) => sum + project.roi, 0) / projectData.length) * 10) / 10,
    };
  }, []);

  // Filter and sort projects
  const filteredAndSortedData = useMemo(() => {
    return projectData
      .filter(project => {
        // Search filter
        if (searchTerm && !project.projectName.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }

        // Category filter
        if (filters.categories.length > 0 && !filters.categories.includes(project.category)) {
          return false;
        }

        // Stage filter
        if (filters.stages.length > 0 && !filters.stages.includes(project.stage)) {
          return false;
        }

        // Revenue range filter
        if (project.revenue < filters.revenueRange.min || project.revenue > filters.revenueRange.max) {
          return false;
        }

        // Runway range filter
        if (project.runway < filters.runwayRange.min || project.runway > filters.runwayRange.max) {
          return false;
        }

        // Profitability filter
        if (filters.showOnlyProfitable && (project.revenue - project.expenses) <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        let aValue: any, bValue: any;

        switch (filters.sortBy) {
          case 'revenue':
            aValue = a.revenue;
            bValue = b.revenue;
            break;
          case 'expenses':
            aValue = a.expenses;
            bValue = b.expenses;
            break;
          case 'burnRate':
            aValue = a.burnRate;
            bValue = b.burnRate;
            break;
          case 'runway':
            aValue = a.runway;
            bValue = b.runway;
            break;
          case 'progress':
            aValue = a.progress;
            bValue = b.progress;
            break;
          case 'roi':
            aValue = a.roi;
            bValue = b.roi;
            break;
          default:
            aValue = a.projectName;
            bValue = b.projectName;
        }

        if (filters.sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
  }, [searchTerm, filters]);

  // Helper functions
  const getRunwayColor = (runway: number) => {
    if (runway < 12) return "text-red-600 bg-red-50";
    if (runway < 18) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  const getROIColor = (roi: number) => {
    if (roi < 0) return "text-red-600 bg-red-50";
    if (roi < 20) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  const resetFilters = () => {
    setFilters({
      projects: [],
      categories: [],
      stages: [],
      revenueRange: { min: 0, max: 1000000 },
      runwayRange: { min: 0, max: 36 },
      showOnlyProfitable: false,
      sortBy: 'revenue',
      sortOrder: 'desc'
    });
    setSearchTerm("");
  };

  // Available options for filters
  const availableCategories = Object.keys(PROJECT_CATEGORIES);
  const availableStages = Object.keys(PROJECT_STAGES);

  // Check if filters are active
  const hasActiveFilters =
    searchTerm !== "" ||
    filters.categories.length > 0 ||
    filters.stages.length > 0 ||
    filters.revenueRange.min > 0 ||
    filters.revenueRange.max < 1000000 ||
    filters.runwayRange.min > 0 ||
    filters.runwayRange.max < 36 ||
    filters.showOnlyProfitable ||
    filters.sortBy !== 'revenue' ||
    filters.sortOrder !== 'desc';

  return (
    <Layout
      title="Project Financial Dashboard"
      subtitle="Comprehensive financial tracking and analytics for all projects"
    >
      <div className="p-6 min-h-screen" style={{ background: 'var(--background)' }}>
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Project Financial Dashboard
              </h1>
              <p className="mt-2 font-medium" style={{ color: 'var(--text-secondary)' }}>
                Track revenue, expenses, and ROI across all project categories
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg focus:outline-none transition-all duration-200"
                style={{
                  background: 'var(--surface-secondary)',
                  color: 'var(--text-primary)',
                  border: 'none'
                }}
              >
                <option value="3months">Last 3 months</option>
                <option value="6months">Last 6 months</option>
                <option value="12months">Last 12 months</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-full flex items-center justify-center sm:justify-start gap-2 transition-all duration-200 font-medium ${
                  showFilters ? 'ring-2 ring-blue-500' : ''
                }`}
                style={{
                  background: showFilters ? 'var(--info-bg)' : 'var(--surface)',
                  color: showFilters ? 'var(--info)' : 'var(--text-primary)',
                  boxShadow: showFilters ? 'none' : 'var(--shadow-sm)'
                }}
              >
                <Filter className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full ml-1 animate-pulse"></span>
                )}
              </button>

              <button
                className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-full flex items-center justify-center sm:justify-start gap-2 text-white transition-all duration-200 font-medium bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
              >
                <Download className="w-4 h-4 shrink-0" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-6 bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h3 className="text-lg font-bold tracking-tight text-gray-900 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Advanced Filters
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={resetFilters}
                  className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-200 rounded-full hover:bg-gray-50 transition-all duration-200"
                >
                  <RefreshCw className="w-4 h-4 inline mr-1" />
                  Reset
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-200 rounded-full hover:bg-gray-50 transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {availableCategories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters(prev => ({
                              ...prev,
                              categories: [...prev.categories, category]
                            }));
                          } else {
                            setFilters(prev => ({
                              ...prev,
                              categories: prev.categories.filter(c => c !== category)
                            }));
                          }
                        }}
                        className="rounded border-gray-300 mr-2"
                      />
                      <span className="text-sm text-gray-700 flex items-center gap-1">
                        <span>{PROJECT_CATEGORIES[category as keyof typeof PROJECT_CATEGORIES].icon}</span>
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stage Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stages</label>
                <div className="space-y-2">
                  {availableStages.map(stage => (
                    <label key={stage} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.stages.includes(stage)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters(prev => ({
                              ...prev,
                              stages: [...prev.stages, stage]
                            }));
                          } else {
                            setFilters(prev => ({
                              ...prev,
                              stages: prev.stages.filter(s => s !== stage)
                            }));
                          }
                        }}
                        className="rounded border-gray-300 mr-2"
                      />
                      <span className="text-sm text-gray-700 flex items-center gap-1">
                        <span>{PROJECT_STAGES[stage as keyof typeof PROJECT_STAGES].icon}</span>
                        {PROJECT_STAGES[stage as keyof typeof PROJECT_STAGES].label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Revenue Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Revenue Range (${filters.revenueRange.min.toLocaleString()} - ${filters.revenueRange.max.toLocaleString()})
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    step="10000"
                    value={filters.revenueRange.min}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      revenueRange: { ...prev.revenueRange, min: parseInt(e.target.value) }
                    }))}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    step="10000"
                    value={filters.revenueRange.max}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      revenueRange: { ...prev.revenueRange, max: parseInt(e.target.value) }
                    }))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Profitability Filter */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.showOnlyProfitable}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      showOnlyProfitable: e.target.checked
                    }))}
                    className="rounded border-gray-300 mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Only Profitable Projects</span>
                </label>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="revenue">Revenue</option>
                  <option value="expenses">Expenses</option>
                  <option value="burnRate">Burn Rate</option>
                  <option value="runway">Runway</option>
                  <option value="progress">Progress</option>
                  <option value="roi">ROI</option>
                </select>
                <select
                  value={filters.sortOrder}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortOrder: e.target.value as 'asc' | 'desc' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                >
                  <option value="desc">High to Low</option>
                  <option value="asc">Low to High</option>
                </select>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Showing {filteredAndSortedData.length} of {projectData.length} projects
                {hasActiveFilters && (
                  <span className="px-2 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-xs font-bold">
                    Filters active
                  </span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <ModernMetricCard
            title="Total Revenue"
            value={totals.revenue}
            format="currency"
            icon={<DollarSign className="w-6 h-6" />}
            color="green"
            trend="up"
            change={12.5}
            changeType="positive"
            subtitle="Across all projects"
          />

          <ModernMetricCard
            title="Total Expenses"
            value={totals.expenses}
            format="currency"
            icon={<TrendingDown className="w-6 h-6" />}
            color="orange"
            trend="down"
            change={-3.2}
            changeType="positive"
            subtitle="Monthly operational costs"
          />

          <ModernMetricCard
            title="Monthly Burn Rate"
            value={Math.abs(totals.burnRate)}
            format="currency"
            icon={<AlertCircle className="w-6 h-6" />}
            color="pink"
            trend="stable"
            subtitle="Combined burn rate"
          />

          <ModernMetricCard
            title="Average ROI"
            value={`${totals.avgROI}%`}
            icon={<Target className="w-6 h-6" />}
            color="purple"
            trend={totals.avgROI > 0 ? "up" : "down"}
            change={totals.avgROI}
            changeType={totals.avgROI > 0 ? "positive" : "negative"}
            subtitle="Return on investment"
          />
        </div>

        {/* Charts Section */}
        <div className="space-y-6 mb-8">
          {/* Net Income Trend Chart */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Net Income Trend
            </h3>
            <div className="overflow-x-auto">
              <ResponsiveContainer width="100%" height={300} minWidth={400}>
                <AreaChart
                  data={monthlyTrends}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="netIncomeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                      padding: '12px 16px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Net Income']}
                    labelFormatter={(label) => `${label} 2025`}
                  />
                  <Area
                    type="monotone"
                    dataKey="netIncome"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    fill="url(#netIncomeGradient)"
                    dot={{ r: 6, fill: '#3B82F6', strokeWidth: 2, stroke: '#FFFFFF' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Revenue vs Expenses */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Revenue vs Expenses Trend
              </h3>
              <div className="overflow-x-auto">
                <ResponsiveContainer width="100%" height={350} minWidth={300}>
                  <BarChart
                    data={monthlyTrends}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                        padding: '12px 16px'
                      }}
                      formatter={(value, name) => [
                        `$${Number(value).toLocaleString()}`,
                        name === 'revenue' ? 'Revenue' : 'Expenses'
                      ]}
                    />
                    <Bar dataKey="revenue" fill="#10B981" name="revenue" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" fill="#EF4444" name="expenses" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Budget Distribution */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Budget Distribution by Category
              </h3>
              <div className="space-y-4">
                <ResponsiveContainer width="100%" height={280}>
                  <RechartsPieChart>
                    <Pie
                      dataKey="budget"
                      data={budgetByCategory}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      innerRadius={40}
                      paddingAngle={3}
                      stroke="#ffffff"
                      strokeWidth={2}
                    >
                      {budgetByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                        padding: '12px 16px'
                      }}
                      formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Budget']}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-3">
                  {budgetByCategory.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <span className="text-xs">{entry.icon}</span>
                          <span className="text-sm font-bold text-gray-900">{entry.name}</span>
                        </div>
                        <span className="text-xs text-gray-600">${(entry.budget / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Financial Table */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold tracking-tight text-gray-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Project Financial Overview
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">Project</th>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">Category</th>
                  <th className="text-left py-4 px-6 font-bold text-gray-700">Stage</th>
                  <th className="text-right py-4 px-6 font-bold text-gray-700">Revenue</th>
                  <th className="text-right py-4 px-6 font-bold text-gray-700">Expenses</th>
                  <th className="text-right py-4 px-6 font-bold text-gray-700">ROI</th>
                  <th className="text-right py-4 px-6 font-bold text-gray-700">Progress</th>
                  <th className="text-center py-4 px-6 font-bold text-gray-700">Runway</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedData.map((project, index) => (
                  <tr
                    key={project.id}
                    className={`hover:bg-gray-50 transition-colors duration-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: PROJECT_CATEGORIES[project.category].color }}
                        >
                          {PROJECT_CATEGORIES[project.category].icon}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{project.projectName}</div>
                          <div className="text-sm text-gray-500">{project.team} team members</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">
                        {PROJECT_CATEGORIES[project.category].icon} {project.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: PROJECT_STAGES[project.stage].color }}
                      >
                        {PROJECT_STAGES[project.stage].icon} {PROJECT_STAGES[project.stage].label}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        ${project.revenue.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                        ${project.expenses.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className={`font-bold px-2 py-1 rounded-full ${getROIColor(project.roi)}`}>
                        {project.roi > 0 ? '+' : ''}{project.roi}%
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getRunwayColor(project.runway)}`}>
                        {project.runway < 12 ? '⚠️' : project.runway < 18 ? '🔶' : '✅'} {project.runway}m
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}