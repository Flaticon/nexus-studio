import { type Project } from '../components/dashboard-v2/projects/ProjectCard';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'EcoTech Carbon Platform',
    category: 'CleanTech',
    description: 'Plataforma de seguimiento y compensación de huella de carbono para empresas',
    status: 'development',
    progress: 75,
    revenue: 245000,
    expenses: 180000,
    roi: 36.1,
    team: {
      size: 8,
      lead: 'Ana García'
    },
    lastUpdate: '2025-01-15',
    priority: 'high',
    tags: ['B2B', 'Sustainability', 'API', 'Analytics']
  },
  {
    id: '2',
    name: 'FinanceAI Analytics',
    category: 'FinTech',
    description: 'Sistema de análisis financiero impulsado por IA para startups',
    status: 'testing',
    progress: 90,
    revenue: 385000,
    expenses: 220000,
    roi: 75.0,
    team: {
      size: 12,
      lead: 'Roberto Silva'
    },
    lastUpdate: '2025-01-15',
    priority: 'high',
    tags: ['AI', 'Finance', 'Analytics', 'SaaS']
  },
  {
    id: '3',
    name: 'HealthTracker IoT',
    category: 'HealthTech',
    description: 'Dispositivos IoT para monitoreo de salud personal en tiempo real',
    status: 'development',
    progress: 60,
    revenue: 125000,
    expenses: 95000,
    roi: 31.6,
    team: {
      size: 6,
      lead: 'Sofia Ramírez'
    },
    lastUpdate: '2025-01-14',
    priority: 'medium',
    tags: ['IoT', 'Health', 'Hardware', 'Mobile']
  },
  {
    id: '4',
    name: 'SmartChain Logistics',
    category: 'Supply Chain',
    description: 'Optimización de cadena de suministro usando blockchain y AI',
    status: 'deployment',
    progress: 85,
    revenue: 320000,
    expenses: 280000,
    roi: 14.3,
    team: {
      size: 10,
      lead: 'Carlos López'
    },
    lastUpdate: '2025-01-15',
    priority: 'high',
    tags: ['Blockchain', 'Logistics', 'AI', 'Enterprise']
  },
  {
    id: '5',
    name: 'EduVerse Platform',
    category: 'EdTech',
    description: 'Plataforma de realidad virtual para educación inmersiva',
    status: 'planning',
    progress: 25,
    revenue: 85000,
    expenses: 120000,
    roi: -29.2,
    team: {
      size: 7,
      lead: 'María Rodríguez'
    },
    lastUpdate: '2025-01-13',
    priority: 'medium',
    tags: ['VR', 'Education', 'Gaming', 'B2B2C']
  },
  {
    id: '6',
    name: 'GreenEnergy Dashboard',
    category: 'CleanTech',
    description: 'Dashboard de monitoreo y análisis para sistemas de energía renovable',
    status: 'maintenance',
    progress: 95,
    revenue: 150000,
    expenses: 100000,
    roi: 50.0,
    team: {
      size: 5,
      lead: 'Diego Martín'
    },
    lastUpdate: '2025-01-15',
    priority: 'low',
    tags: ['Energy', 'Monitoring', 'Dashboard', 'IoT']
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return mockProjects.find(project => project.id === id);
};

export const getProjectsByCategory = (category: string): Project[] => {
  return mockProjects.filter(project => project.category === category);
};

export const getProjectsByStatus = (status: Project['status']): Project[] => {
  return mockProjects.filter(project => project.status === status);
};