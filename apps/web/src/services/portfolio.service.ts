// apps/web/src/services/portfolio.service.ts
import { apiService } from './api';

export interface Startup {
  _id: string;
  name: string;
  slug: string;
  description: string;
  stage: 'idea' | 'validation' | 'pmf' | 'growth' | 'scale';
  status: 'active' | 'paused' | 'archived';
  squad: {
    lead: { name: string; role: string };
    members: Array<{ name: string; role: string }>;
  };
  resources: {
    deck?: string;
    demo?: string;
    repository?: string;
  };
  metrics: Array<{
    name: string;
    value: number;
    unit: string;
    recordedAt: Date;
  }>;
  kpis: Array<{
    name: string;
    current: number;
    target: number;
    unit: string;
    lastUpdated: Date;
  }>;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateStartupData {
  name: string;
  description: string;
  stage: string;
  leadName: string;
  leadRole: string;
  tags: string[];
}

export interface UpdateStartupData extends Partial<CreateStartupData> {
  status?: string;
}

export interface PortfolioFilters {
  stage?: string;
  status?: string;
  tags?: string[];
  search?: string;
}

class PortfolioService {
  // Obtener todas las startups
  async getStartups(filters?: PortfolioFilters): Promise<Startup[]> {
    try {
      return await apiService.get<Startup[]>('/api/portfolio', filters);
    } catch (error) {
      console.error('Failed to fetch startups:', error);
      return this.getMockStartups();
    }
  }

  // Obtener una startup por ID
  async getStartup(id: string): Promise<Startup> {
    try {
      return await apiService.get<Startup>(`/api/portfolio/${id}`);
    } catch (error) {
      console.error('Failed to fetch startup:', error);
      throw error;
    }
  }

  // Crear nueva startup
  async createStartup(data: CreateStartupData): Promise<Startup> {
    try {
      return await apiService.post<Startup>('/api/portfolio', data);
    } catch (error) {
      console.error('Failed to create startup:', error);
      throw error;
    }
  }

  // Actualizar startup
  async updateStartup(id: string, data: UpdateStartupData): Promise<Startup> {
    try {
      return await apiService.put<Startup>(`/api/portfolio/${id}`, data);
    } catch (error) {
      console.error('Failed to update startup:', error);
      throw error;
    }
  }

  // Eliminar startup
  async deleteStartup(id: string): Promise<void> {
    try {
      await apiService.delete(`/api/portfolio/${id}`);
    } catch (error) {
      console.error('Failed to delete startup:', error);
      throw error;
    }
  }

  // Cambiar etapa de startup
  async changeStage(id: string, newStage: string): Promise<Startup> {
    try {
      return await apiService.patch<Startup>(`/api/portfolio/${id}/stage`, { stage: newStage });
    } catch (error) {
      console.error('Failed to change startup stage:', error);
      throw error;
    }
  }

  // Agregar métrica
  async addMetric(id: string, metric: { name: string; value: number; unit: string }): Promise<Startup> {
    try {
      return await apiService.post<Startup>(`/api/portfolio/${id}/metrics`, metric);
    } catch (error) {
      console.error('Failed to add metric:', error);
      throw error;
    }
  }

  // Actualizar KPI
  async updateKPI(id: string, kpiData: { name: string; current: number; target: number; unit: string }): Promise<Startup> {
    try {
      return await apiService.patch<Startup>(`/api/portfolio/${id}/kpis`, kpiData);
    } catch (error) {
      console.error('Failed to update KPI:', error);
      throw error;
    }
  }

  // Obtener comparación de startups
  async getComparison(startupIds: string[]): Promise<any> {
    try {
      return await apiService.post('/api/portfolio/compare', { startupIds });
    } catch (error) {
      console.error('Failed to get comparison:', error);
      return this.getMockComparison();
    }
  }

  // Mock data para desarrollo
  private getMockStartups(): Startup[] {
    return [
      {
        _id: '1',
        name: 'EcoTech Solutions',
        slug: 'ecotech-solutions',
        description: 'Plataforma de gestión ambiental para empresas',
        stage: 'validation',
        status: 'active',
        squad: {
          lead: { name: 'Ana García', role: 'Product Lead' },
          members: [
            { name: 'Carlos López', role: 'Developer' },
            { name: 'María Rodríguez', role: 'Designer' }
          ]
        },
        resources: {
          deck: '#',
          demo: '#',
          repository: '#'
        },
        metrics: [
          { name: 'Revenue', value: 45000, unit: 'USD', recordedAt: new Date() }
        ],
        kpis: [
          { name: 'MAU', current: 1200, target: 2000, unit: 'users', lastUpdated: new Date() },
          { name: 'MRR', current: 5000, target: 10000, unit: 'USD', lastUpdated: new Date() }
        ],
        tags: ['SaaS', 'Environment'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '2',
        name: 'FinanceAI',
        slug: 'finance-ai',
        description: 'Inteligencia artificial para gestión financiera',
        stage: 'pmf',
        status: 'active',
        squad: {
          lead: { name: 'Roberto Silva', role: 'Tech Lead' },
          members: [
            { name: 'Laura Martín', role: 'AI Engineer' },
            { name: 'David Chen', role: 'Backend Dev' }
          ]
        },
        resources: {
          deck: '#',
          demo: '#',
          repository: '#'
        },
        metrics: [
          { name: 'Revenue', value: 85000, unit: 'USD', recordedAt: new Date() }
        ],
        kpis: [
          { name: 'ARR', current: 50000, target: 100000, unit: 'USD', lastUpdated: new Date() },
          { name: 'Customers', current: 85, target: 200, unit: 'count', lastUpdated: new Date() }
        ],
        tags: ['AI', 'Finance'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '3',
        name: 'HealthTracker',
        slug: 'health-tracker',
        description: 'App móvil para seguimiento de salud personal',
        stage: 'idea',
        status: 'active',
        squad: {
          lead: { name: 'Sofia Ramírez', role: 'Product Manager' },
          members: [
            { name: 'Miguel Torres', role: 'Mobile Dev' }
          ]
        },
        resources: {
          deck: '#',
          repository: '#'
        },
        metrics: [
          { name: 'Revenue', value: 12000, unit: 'USD', recordedAt: new Date() }
        ],
        kpis: [
          { name: 'Prototype', current: 60, target: 100, unit: '%', lastUpdated: new Date() }
        ],
        tags: ['Mobile', 'Health'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  private getMockComparison(): any {
    return {
      metrics: ['Revenue', 'Users', 'Growth Rate'],
      data: [
        { startup: 'EcoTech Solutions', Revenue: 45000, Users: 1200, 'Growth Rate': 23 },
        { startup: 'FinanceAI', Revenue: 85000, Users: 850, 'Growth Rate': 34 },
        { startup: 'HealthTracker', Revenue: 12000, Users: 430, 'Growth Rate': 18 }
      ]
    };
  }
}

export const portfolioService = new PortfolioService();
export default portfolioService;