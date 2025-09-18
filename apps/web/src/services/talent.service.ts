// apps/web/src/services/talent.service.ts
import { apiService } from './api';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  email: string;
  location: string;
  currentStartups: string[];
  skills: Array<{
    name: string;
    level: number;
    category: string;
  }>;
  experience: 'Junior' | 'Mid' | 'Senior' | 'Lead';
  availability: number;
  performance: number;
  joinDate: string;
  status: 'active' | 'inactive' | 'on_leave';
  workload: 'low' | 'normal' | 'high';
  lastActive: string;
  pastInitiatives: string[];
  preferredRoles: string[];
  timezone: string;
  languages: string[];
  certifications: string[];
  participationScore: number;
  rotationReadiness: 'low' | 'medium' | 'high';
}

export interface TalentBankMember {
  id: string;
  name: string;
  role: string;
  skills: string[];
  availability: number;
  experience: string;
  lastProject: string;
  rotationReadiness: string;
  preferredNextRole: string;
}

export interface SkillMatchResult {
  memberId: string;
  memberName: string;
  matchScore: number;
  availableCapacity: number;
  relevantSkills: string[];
}

export interface Initiative {
  id: string;
  name: string;
  stage: string;
  requiredSkills: Array<{
    name: string;
    priority: 'high' | 'medium' | 'low';
    currentCoverage: number;
  }>;
  currentTeam: string[];
  neededRoles: string[];
}

export interface TalentFilters {
  team?: string;
  skill?: string;
  experience?: string;
  availability?: number;
  workload?: string;
  rotationReadiness?: string;
}

export interface TalentMetrics {
  totalMembers: number;
  activeMembers: number;
  avgAvailability: number;
  avgPerformance: number;
  readyForRotation: number;
  skillDistribution: Record<string, number>;
}

class TalentService {
  // Obtener todos los miembros del equipo
  async getTeamMembers(filters?: TalentFilters): Promise<TeamMember[]> {
    try {
      return await apiService.get<TeamMember[]>('/api/talent/members', filters);
    } catch (error) {
      console.error('Failed to fetch team members:', error);
      return this.getMockTeamMembers();
    }
  }

  // Obtener un miembro específico
  async getTeamMember(id: string): Promise<TeamMember> {
    try {
      return await apiService.get<TeamMember>(`/api/talent/members/${id}`);
    } catch (error) {
      console.error('Failed to fetch team member:', error);
      throw error;
    }
  }

  // Crear nuevo miembro del equipo
  async createTeamMember(data: Partial<TeamMember>): Promise<TeamMember> {
    try {
      return await apiService.post<TeamMember>('/api/talent/members', data);
    } catch (error) {
      console.error('Failed to create team member:', error);
      throw error;
    }
  }

  // Actualizar miembro del equipo
  async updateTeamMember(id: string, data: Partial<TeamMember>): Promise<TeamMember> {
    try {
      return await apiService.put<TeamMember>(`/api/talent/members/${id}`, data);
    } catch (error) {
      console.error('Failed to update team member:', error);
      throw error;
    }
  }

  // Eliminar miembro del equipo
  async deleteTeamMember(id: string): Promise<void> {
    try {
      await apiService.delete(`/api/talent/members/${id}`);
    } catch (error) {
      console.error('Failed to delete team member:', error);
      throw error;
    }
  }

  // Asignar miembro a iniciativa
  async assignToInitiative(memberId: string, initiativeId: string, role?: string): Promise<TeamMember> {
    try {
      return await apiService.post<TeamMember>(`/api/talent/members/${memberId}/assign`, {
        initiativeId,
        role
      });
    } catch (error) {
      console.error('Failed to assign member to initiative:', error);
      throw error;
    }
  }

  // Remover miembro de iniciativa
  async removeFromInitiative(memberId: string, initiativeId: string): Promise<TeamMember> {
    try {
      return await apiService.post<TeamMember>(`/api/talent/members/${memberId}/unassign`, {
        initiativeId
      });
    } catch (error) {
      console.error('Failed to remove member from initiative:', error);
      throw error;
    }
  }

  // Obtener banco de talentos
  async getTalentBank(): Promise<TalentBankMember[]> {
    try {
      return await apiService.get<TalentBankMember[]>('/api/talent/bank');
    } catch (error) {
      console.error('Failed to fetch talent bank:', error);
      return this.getMockTalentBank();
    }
  }

  // Obtener skill matching para una iniciativa
  async getSkillMatching(initiativeId: string): Promise<SkillMatchResult[]> {
    try {
      return await apiService.get<SkillMatchResult[]>(`/api/talent/skill-matching/${initiativeId}`);
    } catch (error) {
      console.error('Failed to get skill matching:', error);
      return this.getMockSkillMatching();
    }
  }

  // Obtener iniciativas disponibles
  async getInitiatives(): Promise<Initiative[]> {
    try {
      return await apiService.get<Initiative[]>('/api/talent/initiatives');
    } catch (error) {
      console.error('Failed to fetch initiatives:', error);
      return this.getMockInitiatives();
    }
  }

  // Obtener métricas de talento
  async getTalentMetrics(): Promise<TalentMetrics> {
    try {
      return await apiService.get<TalentMetrics>('/api/talent/metrics');
    } catch (error) {
      console.error('Failed to fetch talent metrics:', error);
      return this.getMockTalentMetrics();
    }
  }

  // Obtener análisis de workload
  async getWorkloadAnalysis(): Promise<any> {
    try {
      return await apiService.get('/api/talent/workload-analysis');
    } catch (error) {
      console.error('Failed to fetch workload analysis:', error);
      return this.getMockWorkloadAnalysis();
    }
  }

  // Obtener tendencias de participación
  async getParticipationTrends(): Promise<any> {
    try {
      return await apiService.get('/api/talent/participation-trends');
    } catch (error) {
      console.error('Failed to fetch participation trends:', error);
      return this.getMockParticipationTrends();
    }
  }

  // Mock data para desarrollo
  private getMockTeamMembers(): TeamMember[] {
    return [
      {
        id: "1",
        name: "Ana García",
        role: "Product Lead",
        avatar: "/api/placeholder/64/64",
        email: "ana@nexusstudio.com",
        location: "Madrid, España",
        currentStartups: ["EcoTech Solutions"],
        skills: [
          { name: "Product Management", level: 95, category: "product" },
          { name: "UX/UI Design", level: 88, category: "design" },
          { name: "Agile/Scrum", level: 92, category: "process" },
          { name: "Market Research", level: 85, category: "business" },
        ],
        experience: "Senior",
        availability: 85,
        performance: 94,
        joinDate: "2024-01-15",
        status: "active",
        workload: "normal",
        lastActive: "2 hrs ago",
        pastInitiatives: ["HealthTracker", "FinanceAI"],
        preferredRoles: ["Product Lead", "Growth Manager"],
        timezone: "CET",
        languages: ["Spanish", "English"],
        certifications: ["Scrum Master", "Google Analytics"],
        participationScore: 89,
        rotationReadiness: "high",
      },
      {
        id: "2",
        name: "Carlos López",
        role: "Full Stack Developer",
        avatar: "/api/placeholder/64/64",
        email: "carlos@nexusstudio.com",
        location: "Barcelona, España",
        currentStartups: ["EcoTech Solutions", "FinanceAI"],
        skills: [
          { name: "React/Next.js", level: 92, category: "tech" },
          { name: "Node.js", level: 88, category: "tech" },
          { name: "Python", level: 85, category: "tech" },
          { name: "DevOps", level: 78, category: "tech" },
          { name: "Database Design", level: 82, category: "tech" },
        ],
        experience: "Senior",
        availability: 65,
        performance: 91,
        joinDate: "2023-11-20",
        status: "active",
        workload: "high",
        lastActive: "30 min ago",
        pastInitiatives: ["HealthTracker"],
        preferredRoles: ["Tech Lead", "Full Stack Developer"],
        timezone: "CET",
        languages: ["Spanish", "English", "Catalan"],
        certifications: ["AWS Certified", "React Advanced"],
        participationScore: 95,
        rotationReadiness: "medium",
      }
    ];
  }

  private getMockTalentBank(): TalentBankMember[] {
    return [
      {
        id: "tb1",
        name: "Elena Vásquez",
        role: "Growth Marketing Manager",
        skills: ["Digital Marketing", "Growth Hacking", "Analytics", "Content Strategy"],
        availability: 100,
        experience: "Senior",
        lastProject: "Completed 3 months ago",
        rotationReadiness: "immediate",
        preferredNextRole: "Head of Growth",
      },
      {
        id: "tb2",
        name: "Ahmed Hassan",
        role: "DevOps Engineer",
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Security"],
        availability: 100,
        experience: "Senior",
        lastProject: "Completed 1 month ago",
        rotationReadiness: "immediate",
        preferredNextRole: "Infrastructure Lead",
      }
    ];
  }

  private getMockSkillMatching(): SkillMatchResult[] {
    return [
      {
        memberId: "1",
        memberName: "Ana García",
        matchScore: 85,
        availableCapacity: 85,
        relevantSkills: ["Product Management", "UX/UI Design"]
      },
      {
        memberId: "2",
        memberName: "Carlos López",
        matchScore: 72,
        availableCapacity: 65,
        relevantSkills: ["React/Next.js", "Node.js"]
      }
    ];
  }

  private getMockInitiatives(): Initiative[] {
    return [
      {
        id: "ecotech",
        name: "EcoTech Solutions",
        stage: "validation",
        requiredSkills: [
          { name: "Product Management", priority: "high", currentCoverage: 95 },
          { name: "UX/UI Design", priority: "high", currentCoverage: 88 },
          { name: "React/Next.js", priority: "high", currentCoverage: 92 },
          { name: "Sustainability Domain", priority: "medium", currentCoverage: 0 },
          { name: "B2B Sales", priority: "medium", currentCoverage: 0 },
        ],
        currentTeam: ["1", "2", "3"],
        neededRoles: ["Sustainability Expert", "B2B Sales Manager"],
      }
    ];
  }

  private getMockTalentMetrics(): TalentMetrics {
    return {
      totalMembers: 8,
      activeMembers: 8,
      avgAvailability: 80,
      avgPerformance: 91,
      readyForRotation: 4,
      skillDistribution: {
        tech: 12,
        design: 8,
        product: 6,
        business: 4,
        marketing: 3,
        leadership: 2
      }
    };
  }

  private getMockWorkloadAnalysis(): any {
    return [
      { name: 'Ana', availability: 85, workload: 65, performance: 94 },
      { name: 'Carlos', availability: 65, workload: 90, performance: 91 },
      { name: 'María', availability: 90, workload: 60, performance: 96 },
      { name: 'Roberto', availability: 75, workload: 85, performance: 98 }
    ];
  }

  private getMockParticipationTrends(): any {
    return [
      { month: "Ene", participation: 82, retention: 95 },
      { month: "Feb", participation: 85, retention: 94 },
      { month: "Mar", participation: 88, retention: 96 },
      { month: "Abr", participation: 87, retention: 93 },
      { month: "May", participation: 91, retention: 97 },
      { month: "Jun", participation: 89, retention: 95 },
    ];
  }
}

export const talentService = new TalentService();
export default talentService;