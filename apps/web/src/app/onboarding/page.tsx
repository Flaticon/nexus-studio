'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  Play, 
  FileText, 
  Video, 
  Users, 
  Calendar,
  Star,
  MessageSquare,
  Download,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Award
} from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  type: 'form' | 'document' | 'video' | 'task' | 'meeting' | 'training';
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  order: number;
  isRequired: boolean;
  estimatedDuration: number;
  resources: Array<{
    title: string;
    type: 'document' | 'video' | 'link' | 'form';
    url: string;
    description?: string;
  }>;
  formData?: any;
  feedback?: {
    rating: number;
    comment: string;
  };
}

interface OnboardingProgress {
  completionPercentage: number;
  currentStepId: string;
  steps: OnboardingStep[];
  assignedHR?: { firstName: string; lastName: string; email: string };
  assignedBuddy?: { firstName: string; lastName: string; email: string };
  startDate: string;
  isCompleted: boolean;
}

export default function OnboardingPage() {
  const [progress, setProgress] = useState<OnboardingProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [feedback, setFeedback] = useState<{ rating: number; comment: string }>({ rating: 0, comment: '' });

  useEffect(() => {
    loadOnboardingProgress();
  }, []);

  const loadOnboardingProgress = async () => {
    try {
      setLoading(true);
      
      // Mock data for demonstration - replace with actual API call
      const mockProgress: OnboardingProgress = {
        completionPercentage: 60,
        currentStepId: 'handbook',
        startDate: '2024-01-15',
        isCompleted: false,
        assignedHR: { firstName: 'María', lastName: 'González', email: 'maria.gonzalez@company.com' },
        assignedBuddy: { firstName: 'David', lastName: 'Rodríguez', email: 'david.rodriguez@company.com' },
        steps: [
          {
            id: 'welcome',
            title: 'Bienvenida a la empresa',
            description: 'Video de bienvenida del CEO y overview de la empresa',
            type: 'video',
            status: 'completed',
            order: 1,
            isRequired: true,
            estimatedDuration: 15,
            resources: [{
              title: 'Video de bienvenida',
              type: 'video',
              url: '/resources/welcome-video',
              description: 'Introducción a nuestra cultura y valores'
            }],
            feedback: { rating: 5, comment: '¡Excelente introducción!' }
          },
          {
            id: 'personal_info',
            title: 'Completar información personal',
            description: 'Llenar formulario con datos personales y de contacto',
            type: 'form',
            status: 'completed',
            order: 2,
            isRequired: true,
            estimatedDuration: 10,
            resources: [{
              title: 'Formulario de información personal',
              type: 'form',
              url: '/onboarding/personal-info',
              description: 'Datos de contacto y emergencia'
            }],
            formData: {
              address: 'Calle Ejemplo 123',
              phone: '+34 600 123 456',
              emergencyContact: 'Juan Pérez - +34 600 654 321'
            }
          },
          {
            id: 'handbook',
            title: 'Leer manual del empleado',
            description: 'Revisar políticas, procedimientos y beneficios',
            type: 'document',
            status: 'in_progress',
            order: 3,
            isRequired: true,
            estimatedDuration: 45,
            resources: [{
              title: 'Manual del empleado',
              type: 'document',
              url: '/resources/employee-handbook',
              description: 'Políticas y procedimientos de la empresa'
            }]
          },
          {
            id: 'it_setup',
            title: 'Configuración de IT',
            description: 'Configurar cuentas, accesos y herramientas de trabajo',
            type: 'task',
            status: 'pending',
            order: 4,
            isRequired: true,
            estimatedDuration: 30,
            resources: [{
              title: 'Guía de configuración IT',
              type: 'document',
              url: '/resources/it-setup-guide',
              description: 'Paso a paso para configurar tu estación de trabajo'
            }]
          },
          {
            id: 'team_meeting',
            title: 'Reunión con el equipo',
            description: 'Conocer a los compañeros de equipo',
            type: 'meeting',
            status: 'pending',
            order: 5,
            isRequired: true,
            estimatedDuration: 60,
            resources: []
          }
        ]
      };

      setProgress(mockProgress);
      setActiveStep(mockProgress.currentStepId);
    } catch (error) {
      console.error('Error loading onboarding progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStepStatus = async (stepId: string, status: string, data?: any) => {
    if (!progress) return;

    const updatedSteps = progress.steps.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          status: status as any,
          formData: data?.formData || step.formData,
          feedback: data?.feedback || step.feedback
        };
      }
      return step;
    });

    const completedSteps = updatedSteps.filter(step => step.status === 'completed').length;
    const newCompletionPercentage = Math.round((completedSteps / updatedSteps.length) * 100);

    setProgress({
      ...progress,
      steps: updatedSteps,
      completionPercentage: newCompletionPercentage,
      currentStepId: status === 'completed' ? getNextStepId(stepId) : stepId,
      isCompleted: completedSteps === updatedSteps.length
    });
  };

  const getNextStepId = (currentStepId: string): string => {
    if (!progress) return currentStepId;
    
    const currentIndex = progress.steps.findIndex(step => step.id === currentStepId);
    const nextStep = progress.steps[currentIndex + 1];
    return nextStep ? nextStep.id : currentStepId;
  };

  const getStepIcon = (type: string, status: string) => {
    if (status === 'completed') return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (status === 'in_progress') return <Clock className="w-5 h-5 text-blue-600" />;
    
    switch (type) {
      case 'video': return <Video className="w-5 h-5 text-gray-400" />;
      case 'document': return <FileText className="w-5 h-5 text-gray-400" />;
      case 'form': return <FileText className="w-5 h-5 text-gray-400" />;
      case 'meeting': return <Users className="w-5 h-5 text-gray-400" />;
      case 'task': return <Circle className="w-5 h-5 text-gray-400" />;
      default: return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const submitFeedback = (stepId: string) => {
    updateStepStatus(stepId, 'completed', { feedback });
    setFeedback({ rating: 0, comment: '' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg">Cargando tu proceso de onboarding...</div>
      </div>
    );
  }

  if (!progress) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error al cargar el onboarding</h1>
          <Button onClick={loadOnboardingProgress}>Reintentar</Button>
        </div>
      </div>
    );
  }

  if (progress.isCompleted) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardContent className="text-center py-12">
            <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-600 mb-4">¡Onboarding Completado!</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Felicidades, has completado exitosamente tu proceso de integración.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Descargar Certificado
              </Button>
              <Button>
                <ChevronRight className="w-4 h-4 mr-2" />
                Ir al Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentStep = progress.steps.find(step => step.id === activeStep);

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mi Onboarding</h1>
            <p className="text-muted-foreground">
              Bienvenido/a a la empresa. Completa estos pasos para tu integración.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{progress.completionPercentage}%</div>
            <div className="text-sm text-muted-foreground">Completado</div>
          </div>
        </div>
        
        <Progress value={progress.completionPercentage} className="mb-4" />
        
        {/* Support Team */}
        <div className="flex gap-4 text-sm">
          {progress.assignedHR && (
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>HR: {progress.assignedHR.firstName} {progress.assignedHR.lastName}</span>
            </div>
          )}
          {progress.assignedBuddy && (
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Buddy: {progress.assignedBuddy.firstName} {progress.assignedBuddy.lastName}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Steps Sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Pasos del Onboarding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {progress.steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      activeStep === step.id 
                        ? 'bg-blue-50 border-blue-200 border' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {getStepIcon(step.type, step.status)}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{step.title}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant={step.status === 'completed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {step.status === 'completed' ? 'Completado' : 
                           step.status === 'in_progress' ? 'En progreso' : 'Pendiente'}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {step.estimatedDuration}min
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          {currentStep && (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {getStepIcon(currentStep.type, currentStep.status)}
                      {currentStep.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {currentStep.description}
                    </CardDescription>
                  </div>
                  <Badge variant={currentStep.isRequired ? 'destructive' : 'secondary'}>
                    {currentStep.isRequired ? 'Requerido' : 'Opcional'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Resources */}
                {currentStep.resources.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Recursos</h3>
                    <div className="space-y-2">
                      {currentStep.resources.map((resource, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                          {resource.type === 'video' && <Video className="w-5 h-5 text-blue-600" />}
                          {resource.type === 'document' && <FileText className="w-5 h-5 text-green-600" />}
                          {resource.type === 'link' && <ExternalLink className="w-5 h-5 text-purple-600" />}
                          {resource.type === 'form' && <FileText className="w-5 h-5 text-orange-600" />}
                          
                          <div className="flex-1">
                            <div className="font-medium">{resource.title}</div>
                            {resource.description && (
                              <div className="text-sm text-muted-foreground">{resource.description}</div>
                            )}
                          </div>
                          
                          <Button variant="outline" size="sm">
                            {resource.type === 'video' && <Play className="w-4 h-4 mr-1" />}
                            {resource.type === 'document' && <BookOpen className="w-4 h-4 mr-1" />}
                            {resource.type === 'link' && <ExternalLink className="w-4 h-4 mr-1" />}
                            {resource.type === 'form' && <FileText className="w-4 h-4 mr-1" />}
                            Abrir
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Form Data (for completed form steps) */}
                {currentStep.type === 'form' && currentStep.formData && (
                  <div>
                    <h3 className="font-semibold mb-3">Información Completada</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      {Object.entries(currentStep.formData).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="capitalize font-medium">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <span>{value as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  {currentStep.status === 'pending' && (
                    <Button onClick={() => updateStepStatus(currentStep.id, 'in_progress')}>
                      <Play className="w-4 h-4 mr-2" />
                      Comenzar
                    </Button>
                  )}
                  
                  {currentStep.status === 'in_progress' && (
                    <Button onClick={() => updateStepStatus(currentStep.id, 'completed')}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Marcar como Completado
                    </Button>
                  )}
                  
                  {currentStep.status === 'completed' && (
                    <Badge variant="outline" className="px-3 py-1">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Completado
                    </Badge>
                  )}
                  
                  {!currentStep.isRequired && currentStep.status !== 'completed' && (
                    <Button 
                      variant="outline"
                      onClick={() => updateStepStatus(currentStep.id, 'skipped')}
                    >
                      Saltar
                    </Button>
                  )}
                </div>

                {/* Feedback Section */}
                {currentStep.status === 'completed' && !currentStep.feedback && (
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-3">Califica este paso</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Calificación</label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              onClick={() => setFeedback({ ...feedback, rating })}
                              className={`p-1 ${feedback.rating >= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                            >
                              <Star className="w-5 h-5 fill-current" />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Comentarios (opcional)</label>
                        <Textarea
                          placeholder="Comparte tu experiencia con este paso..."
                          value={feedback.comment}
                          onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                        />
                      </div>
                      <Button 
                        onClick={() => submitFeedback(currentStep.id)}
                        disabled={feedback.rating === 0}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Enviar Feedback
                      </Button>
                    </div>
                  </div>
                )}

                {/* Existing Feedback */}
                {currentStep.feedback && (
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-3">Tu feedback</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <Star
                              key={rating}
                              className={`w-4 h-4 fill-current ${
                                rating <= currentStep.feedback!.rating ? 'text-yellow-500' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {currentStep.feedback.rating}/5 estrellas
                        </span>
                      </div>
                      {currentStep.feedback.comment && (
                        <p className="text-sm">{currentStep.feedback.comment}</p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}