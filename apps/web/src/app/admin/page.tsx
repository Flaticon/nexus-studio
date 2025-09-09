'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  UserPlus, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  Calendar,
  Building,
  Mail
} from 'lucide-react';

interface EmployeeStats {
  totalEmployees: number;
  activeEmployees: number;
  departmentStats: Array<{ _id: string; count: number }>;
  roleStats: Array<{ _id: string; count: number }>;
  onboardingStats: { completed: number; pending: number };
}

interface OnboardingStats {
  totalOnboarding: number;
  completed: number;
  inProgress: number;
  completionRate: number;
  avgCompletionPercentage: number;
  recentActivity: Array<{
    employeeId: { firstName: string; lastName: string; email: string };
    completionPercentage: number;
    currentStepId: string;
    startDate: string;
  }>;
}

export default function AdminDashboard() {
  const [employeeStats, setEmployeeStats] = useState<EmployeeStats | null>(null);
  const [onboardingStats, setOnboardingStats] = useState<OnboardingStats | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Simulate API calls - replace with actual API endpoints
      const [employeeResponse, onboardingResponse] = await Promise.all([
        fetch('/api/employees/stats'),
        fetch('/api/onboarding/stats')
      ]);

      if (employeeResponse.ok && onboardingResponse.ok) {
        setEmployeeStats(await employeeResponse.json());
        setOnboardingStats(await onboardingResponse.json());
      } else {
        // Mock data for demonstration
        setEmployeeStats({
          totalEmployees: 156,
          activeEmployees: 142,
          departmentStats: [
            { _id: 'engineering', count: 45 },
            { _id: 'design', count: 12 },
            { _id: 'product', count: 18 },
            { _id: 'marketing', count: 22 },
            { _id: 'sales', count: 28 },
            { _id: 'hr', count: 8 },
            { _id: 'finance', count: 15 },
            { _id: 'operations', count: 8 }
          ],
          roleStats: [
            { _id: 'employee', count: 98 },
            { _id: 'manager', count: 32 },
            { _id: 'admin', count: 15 },
            { _id: 'hr', count: 8 },
            { _id: 'contractor', count: 3 }
          ],
          onboardingStats: { completed: 134, pending: 22 }
        });

        setOnboardingStats({
          totalOnboarding: 22,
          completed: 134,
          inProgress: 22,
          completionRate: 86,
          avgCompletionPercentage: 78,
          recentActivity: [
            {
              employeeId: { firstName: 'Ana', lastName: 'García', email: 'ana.garcia@company.com' },
              completionPercentage: 85,
              currentStepId: 'team_meeting',
              startDate: '2024-01-15'
            },
            {
              employeeId: { firstName: 'Carlos', lastName: 'López', email: 'carlos.lopez@company.com' },
              completionPercentage: 60,
              currentStepId: 'handbook',
              startDate: '2024-01-18'
            }
          ]
        });
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStepDisplayName = (stepId: string) => {
    const stepNames: Record<string, string> = {
      'welcome': 'Bienvenida',
      'personal_info': 'Información Personal',
      'handbook': 'Manual del Empleado',
      'it_setup': 'Configuración IT',
      'team_meeting': 'Reunión de Equipo'
    };
    return stepNames[stepId] || stepId;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg">Cargando dashboard administrativo...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Administrativo</h1>
          <p className="text-muted-foreground">
            Gestión completa de empleados y procesos de onboarding
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar Datos
          </Button>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Nuevo Empleado
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Empleados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employeeStats?.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              {employeeStats?.activeEmployees} activos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Onboarding Completado</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onboardingStats?.completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {onboardingStats?.completed} de {onboardingStats?.totalOnboarding + onboardingStats?.completed}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Proceso</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onboardingStats?.inProgress}</div>
            <p className="text-xs text-muted-foreground">
              Progreso promedio: {onboardingStats?.avgCompletionPercentage?.toFixed(0)}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recursos</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Documentos disponibles
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="employees" className="space-y-4">
        <TabsList>
          <TabsTrigger value="employees">Empleados</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Empleados</CardTitle>
              <CardDescription>
                Administra la información y estados de todos los empleados
              </CardDescription>
              <div className="flex gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar empleados..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">Todos los departamentos</option>
                  {employeeStats?.departmentStats.map(dept => (
                    <option key={dept._id} value={dept._id}>
                      {dept._id.charAt(0).toUpperCase() + dept._id.slice(1)} ({dept.count})
                    </option>
                  ))}
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {employeeStats?.departmentStats.map(dept => (
                  <Card key={dept._id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg capitalize">{dept._id}</CardTitle>
                        <Building className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-2">{dept.count}</div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {Math.round((dept.count / employeeStats.totalEmployees) * 100)}% del total
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="onboarding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Progreso de Onboarding</CardTitle>
              <CardDescription>
                Seguimiento del proceso de integración de nuevos empleados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {onboardingStats?.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">
                          {activity.employeeId.firstName} {activity.employeeId.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {activity.employeeId.email}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">
                        {activity.completionPercentage}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Paso actual: {getStepDisplayName(activity.currentStepId)}
                      </div>
                      <Badge variant={activity.completionPercentage > 80 ? "default" : "secondary"}>
                        {activity.completionPercentage > 80 ? "Casi completo" : "En progreso"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recursos de la Empresa</CardTitle>
              <CardDescription>
                Gestiona documentos, videos y recursos para empleados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Centro de Recursos</h3>
                <p className="text-muted-foreground mb-4">
                  Administra los recursos que los empleados necesitan durante su onboarding
                </p>
                <Button>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Administrar Recursos
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analíticas y Reportes</CardTitle>
              <CardDescription>
                Métricas detalladas sobre empleados y procesos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Distribución por Roles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {employeeStats?.roleStats.map(role => (
                        <div key={role._id} className="flex items-center justify-between">
                          <span className="capitalize">{role._id}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{role.count}</Badge>
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{
                                  width: `${(role.count / employeeStats.totalEmployees) * 100}%`
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Estadísticas de Onboarding</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Tasa de Finalización</span>
                        <Badge className="bg-green-100 text-green-800">
                          {onboardingStats?.completionRate}%
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Tiempo Promedio</span>
                        <Badge variant="outline">7 días</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Satisfacción</span>
                        <Badge className="bg-blue-100 text-blue-800">4.2/5</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}