// components/forms/AssignMemberModal.tsx
"use client";

import React, { useState } from "react";
import { X, User, Target, Calendar, CheckCircle } from "lucide-react";

interface Initiative {
  id: string;
  name: string;
  stage: string;
  requiredSkills: Array<{
    name: string;
    priority: string;
    currentCoverage: number;
  }>;
  currentTeam: string[];
  neededRoles: string[];
}

interface Member {
  id: string;
  name: string;
  role: string;
  skills: Array<{
    name: string;
    level: number;
    category: string;
  }>;
  availability: number;
  currentStartups: string[];
}

interface AssignMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
  initiatives: Initiative[];
  onAssign: (memberId: string, initiativeId: string, role?: string) => void;
}

export default function AssignMemberModal({
  isOpen,
  onClose,
  member,
  initiatives,
  onAssign,
}: AssignMemberModalProps) {
  const [selectedInitiative, setSelectedInitiative] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !member) return null;

  // Filter out initiatives where the member is already assigned
  const availableInitiatives = initiatives.filter(
    (initiative) => !initiative.currentTeam.includes(member.id)
  );

  // Calculate skill match for each initiative
  const getSkillMatchForInitiative = (initiativeId: string) => {
    const initiative = initiatives.find((i) => i.id === initiativeId);
    if (!initiative) return 0;

    const memberSkills = member.skills.map((s) => s.name.toLowerCase());
    const requiredSkills = initiative.requiredSkills.map((s) =>
      s.name.toLowerCase()
    );

    const matchingSkills = memberSkills.filter((skill) =>
      requiredSkills.some(
        (required) => required.includes(skill) || skill.includes(required)
      )
    );

    return Math.round((matchingSkills.length / requiredSkills.length) * 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInitiative) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      onAssign(member.id, selectedInitiative, selectedRole);
      
      // Reset form
      setSelectedInitiative("");
      setSelectedRole("");
      onClose();
    } catch (error) {
      console.error("Error assigning member:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedInitiativeData = initiatives.find(
    (i) => i.id === selectedInitiative
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Asignar Colaborador
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
              disabled={isSubmitting}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Member Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
                <p className="text-xs text-gray-500">
                  Disponibilidad: {member.availability}%
                </p>
              </div>
            </div>

            {/* Member Skills */}
            <div className="mt-3">
              <div className="text-xs text-gray-500 mb-2">Skills Principales</div>
              <div className="flex flex-wrap gap-1">
                {member.skills.slice(0, 5).map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
                  >
                    {skill.name} ({skill.level}%)
                  </span>
                ))}
              </div>
            </div>

            {/* Current Assignments */}
            {member.currentStartups.length > 0 && (
              <div className="mt-3">
                <div className="text-xs text-gray-500 mb-2">
                  Iniciativas Actuales
                </div>
                <div className="flex flex-wrap gap-1">
                  {member.currentStartups.map((startup, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded"
                    >
                      {startup}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Initiative Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seleccionar Iniciativa *
              </label>
              <select
                value={selectedInitiative}
                onChange={(e) => {
                  setSelectedInitiative(e.target.value);
                  setSelectedRole(""); // Reset role when initiative changes
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={isSubmitting}
              >
                <option value="">Selecciona una iniciativa...</option>
                {availableInitiatives.map((initiative) => {
                  const matchScore = getSkillMatchForInitiative(initiative.id);
                  return (
                    <option key={initiative.id} value={initiative.id}>
                      {initiative.name} ({initiative.stage}) - {matchScore}% match
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Initiative Details */}
            {selectedInitiativeData && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">
                  {selectedInitiativeData.name}
                </h4>
                <div className="text-sm text-blue-700">
                  <p className="mb-2">
                    Etapa: <span className="font-medium">{selectedInitiativeData.stage}</span>
                  </p>
                  <p className="mb-2">
                    Skill Match: <span className="font-medium">
                      {getSkillMatchForInitiative(selectedInitiativeData.id)}%
                    </span>
                  </p>
                  
                  {/* Needed Roles */}
                  {selectedInitiativeData.neededRoles.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium mb-1">Roles Necesarios:</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedInitiativeData.neededRoles.map((role, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Required Skills */}
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-1">Skills Requeridos:</p>
                    <div className="space-y-1">
                      {selectedInitiativeData.requiredSkills
                        .filter((skill) => skill.priority === "high")
                        .slice(0, 3)
                        .map((skill, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-xs"
                          >
                            <span>{skill.name}</span>
                            <span className="font-medium">
                              {skill.currentCoverage}% cubierto
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Role Selection */}
            {selectedInitiativeData && selectedInitiativeData.neededRoles.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rol Específico (opcional)
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                >
                  <option value="">Usar rol actual ({member.role})</option>
                  {selectedInitiativeData.neededRoles.map((role, idx) => (
                    <option key={idx} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!selectedInitiative || isSubmitting}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Asignando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Asignar a Iniciativa
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}