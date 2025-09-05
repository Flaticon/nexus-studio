'use client';

import React, { useState } from 'react';
import { 
  X,
  Plus,
  Target,
  Users,
  Calendar,
  Trash2,
  AlertCircle
} from 'lucide-react';

interface CreateOKRModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (okrData: any) => void;
}

interface KeyResult {
  id: string;
  description: string;
  target: number;
  unit: string;
}

export default function CreateOKRModal({ isOpen, onClose, onSubmit }: CreateOKRModalProps) {
  const [formData, setFormData] = useState({
    team: '',
    objective: '',
    owner: '',
    quarter: 'Q4-2025'
  });

  const [keyResults, setKeyResults] = useState<KeyResult[]>([
    { id: '1', description: '', target: 0, unit: '' }
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const teams = [
    'EcoTech Solutions',
    'FinanceAI', 
    'HealthTracker',
    'Nuevo Equipo'
  ];

  const owners = [
    'Ana García',
    'Roberto Silva',
    'Sofia Ramírez',
    'Carlos López',
    'María Rodríguez'
  ];

  const quarters = [
    'Q1-2025',
    'Q2-2025', 
    'Q3-2025',
    'Q4-2025'
  ];

  const units = [
    'usuarios',
    'clientes',
    'USD',
    '%',
    'puntos',
    'integraciones',
    'funcionalidades',
    'bugs',
    'horas'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.team.trim()) newErrors.team = 'El equipo es requerido';
    if (!formData.objective.trim()) newErrors.objective = 'El objetivo es requerido';
    if (!formData.owner.trim()) newErrors.owner = 'El owner es requerido';
    
    // Validate key results
    const validKeyResults = keyResults.filter(kr => kr.description.trim());
    if (validKeyResults.length === 0) {
      newErrors.keyResults = 'Debe haber al menos un resultado clave';
    }

    validKeyResults.forEach((kr, index) => {
      if (!kr.description.trim()) {
        newErrors[`kr_${index}_description`] = 'Descripción requerida';
      }
      if (!kr.target || kr.target <= 0) {
        newErrors[`kr_${index}_target`] = 'Meta debe ser mayor a 0';
      }
      if (!kr.unit.trim()) {
        newErrors[`kr_${index}_unit`] = 'Unidad requerida';
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create OKR object
    const okrData = {
      id: Date.now().toString(),
      team: formData.team,
      objective: formData.objective,
      owner: formData.owner,
      quarter: formData.quarter,
      keyResults: validKeyResults.map((kr, index) => ({
        id: `${Date.now()}.${index + 1}`,
        description: kr.description,
        target: kr.target,
        current: 0,
        progress: 0,
        unit: kr.unit
      })),
      overallProgress: 0,
      status: 'on-track'
    };

    onSubmit(okrData);
    
    // Reset form
    setFormData({
      team: '',
      objective: '',
      owner: '',
      quarter: 'Q4-2025'
    });
    setKeyResults([
      { id: '1', description: '', target: 0, unit: '' }
    ]);
    setErrors({});
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleKeyResultChange = (index: number, field: keyof KeyResult, value: string | number) => {
    const updatedKeyResults = [...keyResults];
    updatedKeyResults[index] = { ...updatedKeyResults[index], [field]: value };
    setKeyResults(updatedKeyResults);
    
    // Clear related errors
    if (errors[`kr_${index}_${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`kr_${index}_${field}`];
      setErrors(newErrors);
    }
    if (errors.keyResults) {
      const newErrors = { ...errors };
      delete newErrors.keyResults;
      setErrors(newErrors);
    }
  };

  const addKeyResult = () => {
    setKeyResults(prev => [...prev, {
      id: Date.now().toString(),
      description: '',
      target: 0,
      unit: ''
    }]);
  };

  const removeKeyResult = (index: number) => {
    if (keyResults.length > 1) {
      setKeyResults(prev => prev.filter((_, i) => i !== index));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Crear Nuevo OKR</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Equipo *
              </label>
              <select
                value={formData.team}
                onChange={(e) => handleInputChange('team', e.target.value)}
                className={`w-full px-3 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.team ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Seleccionar equipo</option>
                {teams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
              {errors.team && <p className="text-red-600 text-sm mt-1">{errors.team}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Owner *
              </label>
              <select
                value={formData.owner}
                onChange={(e) => handleInputChange('owner', e.target.value)}
                className={`w-full px-3 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.owner ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Seleccionar owner</option>
                {owners.map(owner => (
                  <option key={owner} value={owner}>{owner}</option>
                ))}
              </select>
              {errors.owner && <p className="text-red-600 text-sm mt-1">{errors.owner}</p>}
            </div>
          </div>

          {/* Quarter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trimestre
            </label>
            <select
              value={formData.quarter}
              onChange={(e) => handleInputChange('quarter', e.target.value)}
              className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {quarters.map(quarter => (
                <option key={quarter} value={quarter}>{quarter}</option>
              ))}
            </select>
          </div>

          {/* Objective */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Objetivo *
            </label>
            <textarea
              value={formData.objective}
              onChange={(e) => handleInputChange('objective', e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 ${
                errors.objective ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Describe el objetivo principal que quiere lograr el equipo"
            />
            {errors.objective && <p className="text-red-600 text-sm mt-1">{errors.objective}</p>}
          </div>

          {/* Key Results */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-gray-700">
                Resultados Clave *
              </label>
              <button
                type="button"
                onClick={addKeyResult}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Agregar KR
              </button>
            </div>

            {errors.keyResults && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-red-600 text-sm">{errors.keyResults}</p>
              </div>
            )}

            <div className="space-y-4">
              {keyResults.map((kr, index) => (
                <div key={kr.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-700">
                      Resultado Clave #{index + 1}
                    </h4>
                    {keyResults.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeKeyResult(index)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <input
                        type="text"
                        value={kr.description}
                        onChange={(e) => handleKeyResultChange(index, 'description', e.target.value)}
                        className={`w-full px-3 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 ${
                          errors[`kr_${index}_description`] ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Descripción del resultado clave"
                      />
                      {errors[`kr_${index}_description`] && (
                        <p className="text-red-600 text-xs mt-1">{errors[`kr_${index}_description`]}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input
                          type="number"
                          value={kr.target || ''}
                          onChange={(e) => handleKeyResultChange(index, 'target', parseFloat(e.target.value) || 0)}
                          className={`w-full px-3 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 ${
                            errors[`kr_${index}_target`] ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Meta"
                          min="0"
                          step="0.01"
                        />
                        {errors[`kr_${index}_target`] && (
                          <p className="text-red-600 text-xs mt-1">{errors[`kr_${index}_target`]}</p>
                        )}
                      </div>
                      
                      <div>
                        <select
                          value={kr.unit}
                          onChange={(e) => handleKeyResultChange(index, 'unit', e.target.value)}
                          className={`w-full px-3 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            errors[`kr_${index}_unit`] ? 'border-red-300' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Unidad</option>
                          {units.map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                          ))}
                        </select>
                        {errors[`kr_${index}_unit`] && (
                          <p className="text-red-600 text-xs mt-1">{errors[`kr_${index}_unit`]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Target className="w-4 h-4" />
              Crear OKR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}