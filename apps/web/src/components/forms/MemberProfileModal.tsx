'use client';

import React from 'react';
import { 
  X,
  User,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Star,
  Award,
  Building2,
  Globe,
  Activity,
  Target,
  Users,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

interface MemberProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: any;
}

export default function MemberProfileModal({ isOpen, onClose, member }: MemberProfileModalProps) {
  if (!isOpen || !member) return null;

  const getSkillLevel = (level: number) => {
    if (level >= 90) return { label: 'Expert', color: 'bg-green-500' };
    if (level >= 80) return { label: 'Advanced', color: 'bg-blue-500' };
    if (level >= 70) return { label: 'Intermediate', color: 'bg-yellow-500' };
    return { label: 'Beginner', color: 'bg-gray-500' };
  };

  const getWorkloadColor = (workload: string) => {
    switch (workload) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'normal': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRotationReadinessColor = (readiness: string) => {
    switch (readiness) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{member.name}</h2>
              <p className="text-lg text-gray-600">{member.role}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Basic Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Información de Contacto</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{member.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Se unió: {new Date(member.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>Última actividad: {member.lastActive}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <span>Zona horaria: {member.timezone}</span>
                  </div>
                </div>
              </div>

              {/* Status & Metrics */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Estado Actual</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Disponibilidad</span>
                      <span className="text-sm font-medium">{member.availability}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${member.availability}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Performance</span>
                      <span className="text-sm font-medium">{member.performance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${member.performance}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Participación</span>
                      <span className="text-sm font-medium">{member.participationScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${member.participationScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Carga de trabajo</span>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getWorkloadColor(member.workload)}`}>
                      {member.workload}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Rotación</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getRotationReadinessColor(member.rotationReadiness)}`}>
                      {member.rotationReadiness}
                    </span>
                  </div>
                </div>
              </div>

              {/* Languages & Certifications */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Idiomas y Certificaciones</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Idiomas</div>
                    <div className="flex flex-wrap gap-1">
                      {member.languages?.map((lang: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {member.certifications && member.certifications.length > 0 && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Certificaciones</div>
                      <div className="space-y-1">
                        {member.certifications.map((cert: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <Award className="w-3 h-3 text-yellow-600" />
                            <span>{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Detailed Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Assignments */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Asignaciones Actuales</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {member.currentStartups.map((startup: string, idx: number) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-gray-900">{startup}</span>
                      </div>
                      <div className="text-sm text-gray-600">Participación activa</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Skills y Competencias</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {member.skills.map((skill: any, idx: number) => {
                    const level = getSkillLevel(skill.level);
                    return (
                      <div key={idx} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">{skill.name}</span>
                          <span className={`px-2 py-1 text-xs text-white rounded ${level.color}`}>
                            {level.label}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600 capitalize">{skill.category}</span>
                          <span className="text-sm font-medium">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${level.color}`}
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Roles */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Roles Preferidos</h3>
                <div className="flex flex-wrap gap-2">
                  {member.preferredRoles?.map((role: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 text-sm bg-green-50 text-green-700 rounded-full">
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Past Initiatives */}
              {member.pastInitiatives && member.pastInitiatives.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Iniciativas Anteriores</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.pastInitiatives.map((initiative: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-50 text-gray-700 rounded-full">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        {initiative}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Asignar a Iniciativa
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Ver Equipo
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Performance History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}