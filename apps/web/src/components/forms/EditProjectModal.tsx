'use client';

import React, { useState, useEffect } from 'react';
import { 
  X,
  Save,
  Calendar,
  DollarSign,
  Target,
  Users,
  Building2,
  Tag
} from 'lucide-react';

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: any) => void;
  startup: any;
}

export default function EditProjectModal({ isOpen, onClose, onSubmit, startup }: EditProjectModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    stage: 'idea',
    industry: '',
    tags: '',
    initialBudget: '',
    timeline: '',
    teamLead: '',
    priority: 'medium'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const stages = [
    { value: 'idea', label: 'Idea', color: 'bg-gray-100' },
    { value: 'validation', label: 'Validation', color: 'bg-yellow-100' },
    { value: 'pmf', label: 'Product-Market Fit', color: 'bg-blue-100' },
    { value: 'growth', label: 'Growth', color: 'bg-green-100' },
    { value: 'scale', label: 'Scale', color: 'bg-purple-100' }
  ];

  const industries = [
    'FinTech', 'HealthTech', 'EdTech', 'CleanTech', 'E-commerce', 'SaaS', 'AI/ML', 'Blockchain', 'IoT', 'Other'
  ];

  const teamLeads = [
    'Ana García', 'Roberto Silva', 'Sofia Ramírez', 'Carlos López', 'María Rodríguez'
  ];

  // Load startup data when modal opens
  useEffect(() => {
    if (isOpen && startup) {
      setFormData({
        name: startup.name || '',
        description: startup.description || '',
        stage: startup.stage || 'idea',
        industry: startup.industry || '',
        tags: Array.isArray(startup.tags) ? startup.tags.join(', ') : '',
        initialBudget: startup.initialBudget?.toString() || '',
        timeline: startup.timeline?.toString() || '',
        teamLead: startup.squad?.lead?.name || '',
        priority: startup.priority || 'medium'
      });
      setErrors({});
    }
  }, [isOpen, startup]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.description.trim()) newErrors.description = 'La descripción es requerida';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create updated project object
    const projectData = {
      ...startup,
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      initialBudget: formData.initialBudget ? parseFloat(formData.initialBudget) : startup.initialBudget,
      timeline: formData.timeline ? parseInt(formData.timeline) : startup.timeline,
      squad: {
        ...startup.squad,
        lead: { 
          ...startup.squad.lead, 
          name: formData.teamLead || startup.squad.lead.name 
        }
      }
    };

    onSubmit(projectData);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen || !startup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Editar Startup</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Nombre de la Startup *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="ej. EcoTech Solutions"
              />
              {errors.name && <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Industria
              </label>
              <select
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full px-3 py-2 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar industria</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Describe la propuesta de valor y el problema que resuelve"
            />
            {errors.description && <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Stage and Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Etapa
              </label>
              <select
                value={formData.stage}
                onChange={(e) => handleInputChange('stage', e.target.value)}
                className="w-full px-3 py-2 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {stages.map(stage => (
                  <option key={stage.value} value={stage.value}>{stage.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Prioridad
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full px-3 py-2 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </div>
          </div>

          {/* Budget and Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Presupuesto Inicial (USD)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={formData.initialBudget}
                  onChange={(e) => handleInputChange('initialBudget', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                  placeholder="50000"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Timeline Estimado (meses)
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                  placeholder="12"
                />
              </div>
            </div>
          </div>

          {/* Team Lead */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Team Lead Asignado
            </label>
            <select
              value={formData.teamLead}
              onChange={(e) => handleInputChange('teamLead', e.target.value)}
              className="w-full px-3 py-2 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Asignar más tarde</option>
              {teamLeads.map(lead => (
                <option key={lead} value={lead}>{lead}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Tags (separados por coma)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              className="w-full px-3 py-2 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              placeholder="ej. b2b, saas, ai, payments"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm sm:text-base text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm sm:text-base bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}