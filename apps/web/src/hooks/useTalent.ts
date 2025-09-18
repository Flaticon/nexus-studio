// apps/web/src/hooks/useTalent.ts
import { useState, useEffect } from 'react';
import {
  talentService,
  type TeamMember,
  type TalentBankMember,
  type TalentMetrics,
  type TalentFilters,
  type SkillMatchResult,
  type Initiative
} from '../services/talent.service';

export const useTalent = (filters?: TalentFilters) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [talentBank, setTalentBank] = useState<TalentBankMember[]>([]);
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [metrics, setMetrics] = useState<TalentMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [members, bank, inits, talentMetrics] = await Promise.all([
        talentService.getTeamMembers(filters),
        talentService.getTalentBank(),
        talentService.getInitiatives(),
        talentService.getTalentMetrics()
      ]);

      setTeamMembers(members);
      setTalentBank(bank);
      setInitiatives(inits);
      setMetrics(talentMetrics);
    } catch (err) {
      console.error('Error loading talent data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load talent data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [JSON.stringify(filters)]);

  const createTeamMember = async (data: Partial<TeamMember>) => {
    try {
      const newMember = await talentService.createTeamMember(data);
      setTeamMembers(prev => [...prev, newMember]);
      return newMember;
    } catch (err) {
      console.error('Error creating team member:', err);
      throw err;
    }
  };

  const updateTeamMember = async (id: string, data: Partial<TeamMember>) => {
    try {
      const updatedMember = await talentService.updateTeamMember(id, data);
      setTeamMembers(prev => prev.map(member =>
        member.id === id ? updatedMember : member
      ));
      return updatedMember;
    } catch (err) {
      console.error('Error updating team member:', err);
      throw err;
    }
  };

  const assignToInitiative = async (memberId: string, initiativeId: string, role?: string) => {
    try {
      const updatedMember = await talentService.assignToInitiative(memberId, initiativeId, role);
      setTeamMembers(prev => prev.map(member =>
        member.id === memberId ? updatedMember : member
      ));
      return updatedMember;
    } catch (err) {
      console.error('Error assigning member to initiative:', err);
      throw err;
    }
  };

  const removeFromInitiative = async (memberId: string, initiativeId: string) => {
    try {
      const updatedMember = await talentService.removeFromInitiative(memberId, initiativeId);
      setTeamMembers(prev => prev.map(member =>
        member.id === memberId ? updatedMember : member
      ));
      return updatedMember;
    } catch (err) {
      console.error('Error removing member from initiative:', err);
      throw err;
    }
  };

  const getSkillMatching = async (initiativeId: string): Promise<SkillMatchResult[]> => {
    try {
      return await talentService.getSkillMatching(initiativeId);
    } catch (err) {
      console.error('Error getting skill matching:', err);
      throw err;
    }
  };

  const deleteTeamMember = async (id: string) => {
    try {
      await talentService.deleteTeamMember(id);
      setTeamMembers(prev => prev.filter(member => member.id !== id));
    } catch (err) {
      console.error('Error deleting team member:', err);
      throw err;
    }
  };

  return {
    teamMembers,
    talentBank,
    initiatives,
    metrics,
    loading,
    error,
    createTeamMember,
    updateTeamMember,
    assignToInitiative,
    removeFromInitiative,
    getSkillMatching,
    deleteTeamMember,
    reload: loadData
  };
};