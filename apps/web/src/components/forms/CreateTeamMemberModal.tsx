'use client';

import React, { useState } from 'react';
import { 
  X,
  Plus,
  User,
  Mail,
  MapPin,
  Award,
  Trash2,
  AlertCircle
} from 'lucide-react';

interface CreateTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (memberData: any) => void;
}

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

export default function CreateTeamMemberModal({ isOpen, onClose, onSubmit }: CreateTeamMemberModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    location: '',
    experience: 'Mid',
    timezone: 'CET',
    languages: ''
  });

  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: '', level: 50, category: 'tech' }
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const roles = [
    'Product Manager',
    'Product Lead', 
    'Tech Lead',
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Mobile Developer',
    'DevOps Engineer',
    'AI Engineer',
    'Data Scientist',
    'UX/UI Designer',
    'Lead Designer',
    'UX Researcher',
    'Growth Manager',
    'Marketing Manager',
    'Business Analyst',
    'QA Engineer'
  ];

  const experienceLevels = [
    'Junior',
    'Mid', 
    'Senior',
    'Staff',
    'Principal'
  ];

  const timezones = [
    'CET', 'WET', 'EST', 'PST', 'CST', 'JST', 'ART'
  ];

  const skillCategories = [
    'tech',
    'design', 
    'product',
    'business',
    'marketing',
    'analytics',
    'leadership',
    'domain',
    'process'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.role.trim()) newErrors.role = 'El rol es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    if (!formData.location.trim()) newErrors.location = 'La ubicación es requerida';
    
    // Validate skills
    const validSkills = skills.filter(skill => skill.name.trim());
    if (validSkills.length === 0) {
      newErrors.skills = 'Debe agregar al menos un skill';
    }

    validSkills.forEach((skill, index) => {
      if (!skill.name.trim()) {
        newErrors[`skill_${index}_name`] = 'Nombre del skill requerido';
      }
      if (skill.level < 1 || skill.level > 100) {
        newErrors[`skill_${index}_level`] = 'Nivel debe estar entre 1-100';
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create member object
    const memberData = {
      id: Date.now().toString(),
      name: formData.name,
      role: formData.role,
      email: formData.email,
      location: formData.location,
      experience: formData.experience,
      timezone: formData.timezone,
      languages: formData.languages.split(',').map(lang => lang.trim()).filter(Boolean),
      skills: validSkills.map(skill => ({
        name: skill.name,
        level: skill.level,
        category: skill.category
      })),
      // Default values for new members
      avatar: '/api/placeholder/64/64',
      currentStartups: [],
      availability: 100,
      performance: 85,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
      workload: 'normal',
      lastActive: 'Just joined',
      pastInitiatives: [],
      preferredRoles: [formData.role],
      certifications: [],
      participationScore: 80,
      rotationReadiness: 'high'
    };

    onSubmit(memberData);
    
    // Reset form
    setFormData({
      name: '',
      role: '',
      email: '',
      location: '',
      experience: 'Mid',
      timezone: 'CET',
      languages: ''
    });
    setSkills([
      { id: '1', name: '', level: 50, category: 'tech' }
    ]);
    setErrors({});
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSkillChange = (index: number, field: keyof Skill, value: string | number) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setSkills(updatedSkills);
    
    // Clear related errors
    if (errors[`skill_${index}_${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`skill_${index}_${field}`];
      setErrors(newErrors);
    }
    if (errors.skills) {
      const newErrors = { ...errors };
      delete newErrors.skills;
      setErrors(newErrors);
    }
  };

  const addSkill = () => {
    setSkills(prev => [...prev, {
      id: Date.now().toString(),
      name: '',
      level: 50,
      category: 'tech'
    }]);
  };

  const removeSkill = (index: number) => {
    if (skills.length > 1) {
      setSkills(prev => prev.filter((_, i) => i !== index));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Agregar Nuevo Colaborador</h2>
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
                Nombre completo *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="ej. Ana García López"
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rol/Posición *
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className={`w-full px-3 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.role ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Seleccionar rol</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email corporativo *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-3 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="ana@nexusstudio.com"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className={`w-full px-3 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${
                  errors.location ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Madrid, España"
              />
              {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nivel de experiencia
              </label>
              <select
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {experienceLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select
                value={formData.timezone}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
                className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {timezones.map(tz => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Idiomas
              </label>
              <input
                type="text"
                value={formData.languages}
                onChange={(e) => handleInputChange('languages', e.target.value)}
                className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                placeholder="Español, Inglés"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-gray-700">
                Skills y competencias *
              </label>
              <button
                type="button"
                onClick={addSkill}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Agregar Skill
              </button>
            </div>

            {errors.skills && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-red-600 text-sm">{errors.skills}</p>
              </div>
            )}

            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={skill.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-700">
                      Skill #{index + 1}
                    </h4>
                    {skills.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                        className={`w-full px-3 py-2 text-gray-900 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${
                          errors[`skill_${index}_name`] ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Nombre del skill"
                      />
                      {errors[`skill_${index}_name`] && (
                        <p className="text-red-600 text-xs mt-1">{errors[`skill_${index}_name`]}</p>
                      )}
                    </div>
                    
                    <div>
                      <select
                        value={skill.category}
                        onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
                        className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {skillCategories.map(category => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="1"
                          max="100"
                          value={skill.level}
                          onChange={(e) => handleSkillChange(index, 'level', parseInt(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium text-gray-900 min-w-[40px]">
                          {skill.level}%
                        </span>
                      </div>
                      {errors[`skill_${index}_level`] && (
                        <p className="text-red-600 text-xs mt-1">{errors[`skill_${index}_level`]}</p>
                      )}
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Agregar Colaborador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}