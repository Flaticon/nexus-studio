// apps/web/src/app/talent/page.tsx
"use client";

import React, { useState } from "react";
import {
  Users,
  User,
  MapPin,
  Mail,
  Calendar,
  Clock,
  Star,
  Award,
  TrendingUp,
  Filter,
  Download,
  Plus,
  Search,
  Building2,
  Code,
  Palette,
  BarChart3,
  Shield,
  Zap,
  Target,
  RefreshCw,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Activity,
  Shuffle,
  UserCheck,
  GitBranch,
  Briefcase,
  Brain,
  Eye,
  Edit,
  RotateCcw,
  UserPlus,
  Settings,
  TrendingDown,
  Database,
  Layers,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import CreateTeamMemberModal from "../../components/forms/CreateTeamMemberModal";
import MemberProfileModal from "../../components/forms/MemberProfileModal";
import AssignMemberModal from "../../components/forms/AssignMemberModal";
import Layout from "../../components/layout/Layout";

export default function TalentPage() {
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [filterSkill, setFilterSkill] = useState("all");
  const [showTalentBank, setShowTalentBank] = useState(false);
  const [showSkillMatching, setShowSkillMatching] = useState(false);
  const [selectedInitiative, setSelectedInitiative] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Enhanced team members data with skills and availability
  const [teamMembers, setTeamMembers] = useState([
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
    },
    {
      id: "3",
      name: "María Rodríguez",
      role: "UX/UI Designer",
      avatar: "/api/placeholder/64/64",
      email: "maria@nexusstudio.com",
      location: "Valencia, España",
      currentStartups: ["EcoTech Solutions"],
      skills: [
        { name: "UI Design", level: 94, category: "design" },
        { name: "UX Research", level: 87, category: "design" },
        { name: "Prototyping", level: 91, category: "design" },
        { name: "Design Systems", level: 89, category: "design" },
        { name: "User Testing", level: 85, category: "product" },
      ],
      experience: "Senior",
      availability: 90,
      performance: 96,
      joinDate: "2024-02-01",
      status: "active",
      workload: "normal",
      lastActive: "1 hr ago",
      pastInitiatives: [],
      preferredRoles: ["Lead Designer", "UX Researcher"],
      timezone: "CET",
      languages: ["Spanish", "English"],
      certifications: ["Adobe Certified", "Google UX Design"],
      participationScore: 92,
      rotationReadiness: "high",
    },
    {
      id: "4",
      name: "Roberto Silva",
      role: "Tech Lead",
      avatar: "/api/placeholder/64/64",
      email: "roberto@nexusstudio.com",
      location: "Lisboa, Portugal",
      currentStartups: ["FinanceAI"],
      skills: [
        { name: "System Architecture", level: 96, category: "tech" },
        { name: "AI/ML", level: 91, category: "tech" },
        { name: "Team Leadership", level: 88, category: "leadership" },
        { name: "Python", level: 94, category: "tech" },
        { name: "Cloud Infrastructure", level: 87, category: "tech" },
      ],
      experience: "Senior",
      availability: 75,
      performance: 98,
      joinDate: "2023-09-15",
      status: "active",
      workload: "high",
      lastActive: "15 min ago",
      pastInitiatives: ["EcoTech Solutions"],
      preferredRoles: ["Tech Lead", "CTO", "AI Engineer"],
      timezone: "WET",
      languages: ["Portuguese", "English", "Spanish"],
      certifications: ["AWS Solutions Architect", "TensorFlow"],
      participationScore: 97,
      rotationReadiness: "low",
    },
    {
      id: "5",
      name: "Sofia Ramírez",
      role: "Product Manager",
      avatar: "/api/placeholder/64/64",
      email: "sofia@nexusstudio.com",
      location: "México DF, México",
      currentStartups: ["HealthTracker"],
      skills: [
        { name: "Product Strategy", level: 90, category: "product" },
        { name: "Data Analysis", level: 85, category: "analytics" },
        { name: "Growth Hacking", level: 87, category: "marketing" },
        { name: "Stakeholder Management", level: 92, category: "business" },
        { name: "SQL", level: 78, category: "tech" },
      ],
      experience: "Mid",
      availability: 95,
      performance: 87,
      joinDate: "2024-03-10",
      status: "active",
      workload: "normal",
      lastActive: "45 min ago",
      pastInitiatives: [],
      preferredRoles: ["Product Manager", "Growth Manager", "Business Analyst"],
      timezone: "CST",
      languages: ["Spanish", "English"],
      certifications: ["Google Product Manager", "Mixpanel"],
      participationScore: 84,
      rotationReadiness: "high",
    },
    {
      id: "6",
      name: "David Chen",
      role: "Backend Developer",
      avatar: "/api/placeholder/64/64",
      email: "david@nexusstudio.com",
      location: "Remote",
      currentStartups: ["FinanceAI"],
      skills: [
        { name: "Go", level: 89, category: "tech" },
        { name: "Microservices", level: 91, category: "tech" },
        { name: "Kubernetes", level: 84, category: "tech" },
        { name: "Financial APIs", level: 87, category: "domain" },
        { name: "Security", level: 82, category: "tech" },
      ],
      experience: "Mid",
      availability: 80,
      performance: 89,
      joinDate: "2024-01-20",
      status: "active",
      workload: "normal",
      lastActive: "20 min ago",
      pastInitiatives: [],
      preferredRoles: ["Backend Developer", "DevOps Engineer"],
      timezone: "PST",
      languages: ["English", "Mandarin"],
      certifications: ["Kubernetes Certified", "Go Developer"],
      participationScore: 88,
      rotationReadiness: "medium",
    },
    {
      id: "7",
      name: "Laura Martín",
      role: "AI Engineer",
      avatar: "/api/placeholder/64/64",
      email: "laura@nexusstudio.com",
      location: "Berlin, Germany",
      currentStartups: ["FinanceAI"],
      skills: [
        { name: "Machine Learning", level: 93, category: "tech" },
        { name: "Python", level: 91, category: "tech" },
        { name: "TensorFlow", level: 89, category: "tech" },
        { name: "Data Science", level: 90, category: "analytics" },
        { name: "MLOps", level: 85, category: "tech" },
      ],
      experience: "Senior",
      availability: 70,
      performance: 95,
      joinDate: "2023-10-01",
      status: "active",
      workload: "high",
      lastActive: "10 min ago",
      pastInitiatives: ["EcoTech Solutions"],
      preferredRoles: ["AI Engineer", "Data Scientist", "ML Engineer"],
      timezone: "CET",
      languages: ["German", "English", "Spanish"],
      certifications: ["TensorFlow Certified", "AWS ML"],
      participationScore: 93,
      rotationReadiness: "low",
    },
    {
      id: "8",
      name: "Miguel Torres",
      role: "Mobile Developer",
      avatar: "/api/placeholder/64/64",
      email: "miguel@nexusstudio.com",
      location: "Buenos Aires, Argentina",
      currentStartups: ["HealthTracker"],
      skills: [
        { name: "React Native", level: 88, category: "tech" },
        { name: "Swift", level: 82, category: "tech" },
        { name: "Kotlin", level: 85, category: "tech" },
        { name: "Mobile UX", level: 79, category: "design" },
        { name: "App Store Optimization", level: 76, category: "marketing" },
      ],
      experience: "Mid",
      availability: 85,
      performance: 86,
      joinDate: "2024-04-01",
      status: "active",
      workload: "normal",
      lastActive: "3 hrs ago",
      pastInitiatives: [],
      preferredRoles: ["Mobile Developer", "Frontend Developer"],
      timezone: "ART",
      languages: ["Spanish", "English"],
      certifications: ["React Native Certified"],
      participationScore: 82,
      rotationReadiness: "high",
    },
  ]);

  // Available initiatives for skill matching
  const initiatives = [
    {
      id: "ecotech",
      name: "EcoTech Solutions",
      stage: "validation",
      requiredSkills: [
        { name: "Product Management", priority: "high", currentCoverage: 95 },
        { name: "UX/UI Design", priority: "high", currentCoverage: 88 },
        { name: "React/Next.js", priority: "high", currentCoverage: 92 },
        {
          name: "Sustainability Domain",
          priority: "medium",
          currentCoverage: 0,
        },
        { name: "B2B Sales", priority: "medium", currentCoverage: 0 },
      ],
      currentTeam: ["1", "2", "3"], // team member IDs
      neededRoles: ["Sustainability Expert", "B2B Sales Manager"],
    },
    {
      id: "financeai",
      name: "FinanceAI",
      stage: "pmf",
      requiredSkills: [
        { name: "AI/ML", priority: "high", currentCoverage: 91 },
        { name: "Python", priority: "high", currentCoverage: 92 },
        { name: "Financial APIs", priority: "high", currentCoverage: 87 },
        { name: "System Architecture", priority: "high", currentCoverage: 96 },
        { name: "Compliance", priority: "medium", currentCoverage: 0 },
      ],
      currentTeam: ["2", "4", "6", "7"],
      neededRoles: ["Compliance Officer", "QA Engineer"],
    },
    {
      id: "healthtracker",
      name: "HealthTracker",
      stage: "idea",
      requiredSkills: [
        { name: "Product Strategy", priority: "high", currentCoverage: 90 },
        { name: "Mobile Development", priority: "high", currentCoverage: 85 },
        { name: "Healthcare Domain", priority: "high", currentCoverage: 0 },
        { name: "Data Privacy", priority: "medium", currentCoverage: 0 },
        {
          name: "Medical Device Integration",
          priority: "low",
          currentCoverage: 0,
        },
      ],
      currentTeam: ["5", "8"],
      neededRoles: ["Healthcare Expert", "Data Privacy Officer", "QA Engineer"],
    },
  ];

  // Talent bank - available members for rotation
  const talentBank = [
    {
      id: "tb1",
      name: "Elena Vásquez",
      role: "Growth Marketing Manager",
      skills: [
        "Digital Marketing",
        "Growth Hacking",
        "Analytics",
        "Content Strategy",
      ],
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
    },
    {
      id: "tb3",
      name: "Lisa Anderson",
      role: "Data Scientist",
      skills: [
        "Python",
        "R",
        "Machine Learning",
        "Statistics",
        "Visualization",
      ],
      availability: 100,
      experience: "Mid",
      lastProject: "Completed 2 weeks ago",
      rotationReadiness: "immediate",
      preferredNextRole: "Senior Data Scientist",
    },
  ];

  // Analytics data
  const workloadData = teamMembers.map((member) => ({
    name: member.name.split(" ")[0],
    availability: member.availability,
    workload:
      member.workload === "high" ? 90 : member.workload === "normal" ? 65 : 40,
    performance: member.performance,
  }));

  const skillsDistribution = [
    { category: "Tech", count: 12, color: "#3B82F6" },
    { category: "Design", count: 8, color: "#8B5CF6" },
    { category: "Product", count: 6, color: "#10B981" },
    { category: "Business", count: 4, color: "#F59E0B" },
    { category: "Marketing", count: 3, color: "#EF4444" },
    { category: "Leadership", count: 2, color: "#6B7280" },
  ];

  const participationTrends = [
    { month: "Ene", participation: 82, retention: 95 },
    { month: "Feb", participation: 85, retention: 94 },
    { month: "Mar", participation: 88, retention: 96 },
    { month: "Abr", participation: 87, retention: 93 },
    { month: "May", participation: 91, retention: 97 },
    { month: "Jun", participation: 89, retention: 95 },
  ];

  const getWorkloadColor = (workload) => {
    switch (workload) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      case "normal":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getRotationReadinessColor = (readiness) => {
    switch (readiness) {
      case "high":
        return "text-green-600 bg-green-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getSkillLevel = (level) => {
    if (level >= 90) return { label: "Expert", color: "bg-green-500" };
    if (level >= 80) return { label: "Advanced", color: "bg-blue-500" };
    if (level >= 70) return { label: "Intermediate", color: "bg-yellow-500" };
    return { label: "Beginner", color: "bg-gray-500" };
  };

  // Skill matching algorithm
  const getSkillMatchForInitiative = (memberId, initiativeId) => {
    const member = teamMembers.find((m) => m.id === memberId);
    const initiative = initiatives.find((i) => i.id === initiativeId);

    if (!member || !initiative) return 0;

    const memberSkills = member.skills.map((s) => s.name.toLowerCase());
    const requiredSkills = initiative.requiredSkills.map((s) =>
      s.name.toLowerCase(),
    );

    const matchingSkills = memberSkills.filter((skill) =>
      requiredSkills.some(
        (required) => required.includes(skill) || skill.includes(required),
      ),
    );

    return Math.round((matchingSkills.length / requiredSkills.length) * 100);
  };

  // Handle member assignment to initiative
  const handleAssignMember = (memberId: string, initiativeId: string, role?: string) => {
    const initiative = initiatives.find(i => i.id === initiativeId);
    if (!initiative) return;

    // Update team members data
    setTeamMembers(prev => prev.map(member => {
      if (member.id === memberId) {
        const initiativeName = initiative.name;
        const updatedMember = {
          ...member,
          currentStartups: [...member.currentStartups, initiativeName].filter((startup, index, self) => 
            self.indexOf(startup) === index // Remove duplicates
          ),
          // Adjust availability based on new assignment
          availability: Math.max(20, member.availability - 20),
          // Update workload
          workload: member.availability <= 40 ? "high" : member.availability <= 70 ? "normal" : "low"
        };

        // If a specific role is provided, update it
        if (role && role !== member.role) {
          updatedMember.role = role;
        }

        return updatedMember;
      }
      return member;
    }));

    // Update initiatives data (add member to team)
    // Note: In a real app, this would be handled by the backend
    console.log(`Successfully assigned ${memberId} to ${initiativeId}${role ? ` as ${role}` : ''}`);
  };

  const filteredMembers = teamMembers.filter((member) => {
    const teamMatch =
      selectedTeam === "all" || member.currentStartups.includes(selectedTeam);
    const skillMatch =
      filterSkill === "all" ||
      member.skills.some(
        (skill) =>
          skill.category === filterSkill ||
          skill.name.toLowerCase().includes(filterSkill.toLowerCase()),
      );
    return teamMatch && skillMatch;
  });

  return (
    <Layout
      title="👥 Talento y Equipos"
      subtitle="Directorio de colaboradores, skills matching y banco de talentos"
    >
      <div className="p-6 min-h-screen" style={{ background: 'var(--background)' }}>
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                👥 Talento y Equipos
              </h1>
              <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
                Gestiona el capital humano del venture studio
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={() => setShowSkillMatching(!showSkillMatching)}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg flex items-center justify-center sm:justify-start gap-2 transition-all duration-200"
                style={{
                  background: showSkillMatching ? 'var(--info-bg)' : 'var(--surface)',
                  color: showSkillMatching ? 'var(--info)' : 'var(--text-primary)',
                  boxShadow: showSkillMatching ? 'none' : 'var(--shadow-sm)'
                }}
                onMouseEnter={(e) => {
                  if (!showSkillMatching) {
                    e.target.style.background = 'var(--surface-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showSkillMatching) {
                    e.target.style.background = 'var(--surface)';
                  }
                }}
              >
                <Target className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Skill </span>Matching
              </button>
              <button
                onClick={() => setShowTalentBank(!showTalentBank)}
                className={`w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg flex items-center justify-center sm:justify-start gap-2 transition-colors ${
                  showTalentBank
                    ? "bg-purple-50 text-purple-700"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <Database className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Banco de </span>Talentos
              </button>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center sm:justify-start gap-2"
              >
                <UserPlus className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Nuevo </span>Colaborador
              </button>
            </div>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Colaboradores Activos
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {teamMembers.length}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Disponibilidad Promedio
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {Math.round(
                    teamMembers.reduce((sum, m) => sum + m.availability, 0) /
                      teamMembers.length,
                  )}
                  %
                </p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Performance Promedio
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {Math.round(
                    teamMembers.reduce((sum, m) => sum + m.performance, 0) /
                      teamMembers.length,
                  )}
                  %
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Listos para Rotación
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {
                    teamMembers.filter((m) => m.rotationReadiness === "high")
                      .length
                  }
                </p>
              </div>
              <Shuffle className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Skill Matching Section */}
        {showSkillMatching && (
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Match de Skills por Iniciativa
                </h3>
                <select
                  value={selectedInitiative}
                  onChange={(e) => setSelectedInitiative(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 text-sm sm:text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                >
                  <option value="">Seleccionar Iniciativa</option>
                  {initiatives.map((init) => (
                    <option key={init.id} value={init.id}>
                      {init.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedInitiative && (
              <div className="p-6">
                {(() => {
                  const initiative = initiatives.find(
                    (i) => i.id === selectedInitiative,
                  );
                  return (
                    <div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Required Skills */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4">
                            Skills Requeridos
                          </h4>
                          <div className="space-y-3">
                            {initiative.requiredSkills.map((skill, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                              >
                                <div>
                                  <span className="font-medium text-gray-900">
                                    {skill.name}
                                  </span>
                                  <span
                                    className={`ml-2 px-2 py-1 text-xs rounded-full ${
                                      skill.priority === "high"
                                        ? "bg-red-100 text-red-700"
                                        : skill.priority === "medium"
                                          ? "bg-yellow-100 text-yellow-700"
                                          : "bg-green-100 text-green-700"
                                    }`}
                                  >
                                    {skill.priority}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium text-gray-900">
                                    {skill.currentCoverage}%
                                  </div>
                                  <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                                    <div
                                      className={`h-2 rounded-full ${
                                        skill.currentCoverage >= 80
                                          ? "bg-green-500"
                                          : skill.currentCoverage >= 60
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                      }`}
                                      style={{
                                        width: `${skill.currentCoverage}%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Best Matches */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4">
                            Mejores Candidatos
                          </h4>
                          <div className="space-y-3">
                            {teamMembers
                              .filter(
                                (member) =>
                                  !initiative.currentTeam.includes(member.id),
                              )
                              .map((member) => ({
                                ...member,
                                matchScore: getSkillMatchForInitiative(
                                  member.id,
                                  initiative.id,
                                ),
                              }))
                              .sort((a, b) => b.matchScore - a.matchScore)
                              .slice(0, 5)
                              .map((member, idx) => (
                                <div
                                  key={member.id}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                      <User className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                      <div className="font-medium text-gray-900">
                                        {member.name}
                                      </div>
                                      <div className="text-sm text-gray-600">
                                        {member.role}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm font-medium text-gray-900">
                                      {member.matchScore}% match
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      {member.availability}% disponible
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* Talent Bank Section */}
        {showTalentBank && (
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Banco de Talentos
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Colaboradores disponibles para nuevas iniciativas
              </p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {talentBank.map((person) => (
                  <div
                    key={person.id}
                    className="rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {person.name}
                        </h4>
                        <p className="text-sm text-gray-600">{person.role}</p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getRotationReadinessColor(person.rotationReadiness)}`}
                      >
                        {person.rotationReadiness}
                      </span>
                    </div>

                    <div className="mb-3">
                      <div className="text-xs text-gray-500 mb-1">
                        Top Skills
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {person.skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 mb-3">
                      <div>Experiencia: {person.experience}</div>
                      <div>Último proyecto: {person.lastProject}</div>
                      <div>Próximo rol: {person.preferredNextRole}</div>
                    </div>

                    <button
                      onClick={() => {
                        // Find a member object for talent bank person or create a temporary one
                        const tempMember = {
                          id: person.id,
                          name: person.name,
                          role: person.role,
                          skills: person.skills.map((skill, index) => ({
                            name: skill,
                            level: 85 + index * 2, // Simulate skill levels
                            category: index % 2 === 0 ? "tech" : "business"
                          })),
                          availability: person.availability,
                          currentStartups: []
                        };
                        setSelectedMember(tempMember);
                        setIsAssignModalOpen(true);
                      }}
                      className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Asignar a Iniciativa
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {/* Workload Distribution */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Distribución de Carga de Trabajo
              </h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="overflow-x-auto">
              <ResponsiveContainer width="100%" height={300} minWidth={300}>
                <BarChart data={workloadData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="workload"
                    fill="#EF4444"
                    name="Carga de Trabajo %"
                  />
                  <Bar
                    dataKey="availability"
                    fill="#10B981"
                    name="Disponibilidad %"
                  />
                </BarChart>
              </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Skills Distribution */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Distribución de Skills
              </h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="overflow-x-auto">
              <ResponsiveContainer width="100%" height={300} minWidth={300}>
                <PieChart>
                  <Pie
                    dataKey="count"
                    data={skillsDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ category, count }) => `${category}: ${count}`}
                  >
                    {skillsDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Grid/List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Directorio de Colaboradores
              </h3>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                {/* Filters */}
                <select
                  value={filterSkill}
                  onChange={(e) => setFilterSkill(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 text-sm sm:text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                >
                  <option value="all">Todos los Skills</option>
                  <option value="tech">Tech</option>
                  <option value="design">Design</option>
                  <option value="product">Product</option>
                  <option value="business">Business</option>
                  <option value="marketing">Marketing</option>
                </select>

                {/* View Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded transition-colors ${
                      viewMode === "grid" ? "bg-white shadow-sm" : ""
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded transition-colors ${
                      viewMode === "list" ? "bg-white shadow-sm" : ""
                    }`}
                  >
                    <Users className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="rounded-lg p-6 hover:shadow-md transition-shadow bg-gray-50"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {member.name}
                          </h4>
                          <p className="text-sm text-gray-600">{member.role}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {member.location}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getWorkloadColor(member.workload)}`}
                      >
                        {member.workload}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">
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

                      <div>
                        <div className="text-xs text-gray-500 mb-1">
                          Top Skills
                        </div>
                        <div className="space-y-1">
                          {member.skills.slice(0, 3).map((skill, idx) => {
                            const level = getSkillLevel(skill.level);
                            return (
                              <div
                                key={idx}
                                className="flex items-center justify-between"
                              >
                                <span className="text-xs text-gray-700">
                                  {skill.name}
                                </span>
                                <div className="flex items-center gap-1">
                                  <div className="w-12 bg-gray-200 rounded-full h-1">
                                    <div
                                      className={`h-1 rounded-full ${level.color}`}
                                      style={{ width: `${skill.level}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    {skill.level}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex justify-between text-sm">
                        <div>
                          <span className="text-gray-600">Disponibilidad:</span>
                          <span className="font-medium text-gray-900 ml-1">
                            {member.availability}%
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Performance:</span>
                          <span className="font-medium text-gray-900 ml-1">
                            {member.performance}%
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between text-sm">
                        <div>
                          <span className="text-gray-600">Participación:</span>
                          <span className="font-medium text-gray-900 ml-1">
                            {member.participationScore}%
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Rotación:</span>
                          <span
                            className={`px-1 py-0.5 text-xs rounded ${getRotationReadinessColor(member.rotationReadiness)}`}
                          >
                            {member.rotationReadiness}
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedMember(member);
                            setIsProfileModalOpen(true);
                          }}
                          className="flex-1 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 bg-gray-50"
                        >
                          Ver Perfil
                        </button>
                        <button
                          onClick={() => {
                            setSelectedMember(member);
                            setIsAssignModalOpen(true);
                          }}
                          className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Asignar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Colaborador
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Iniciativas
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Skills Principales
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Disponibilidad
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Performance
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Rotación
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {member.name}
                              </div>
                              <div className="text-xs text-gray-600">
                                {member.role}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {member.currentStartups
                              .slice(0, 2)
                              .map((startup, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded"
                                >
                                  {startup}
                                </span>
                              ))}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {member.skills.slice(0, 2).map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {member.availability}%
                            </span>
                            <div className="w-12 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${member.availability}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium">
                            {member.performance}%
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getRotationReadinessColor(member.rotationReadiness)}`}
                          >
                            {member.rotationReadiness}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-1">
                            <button
                              onClick={() => {
                                setSelectedMember(member);
                                setIsProfileModalOpen(true);
                              }}
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Ver Perfil"
                            >
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Editar"
                            >
                              <Edit className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedMember(member);
                                setIsAssignModalOpen(true);
                              }}
                              className="p-1 hover:bg-gray-100 rounded"
                              title="Asignar a Iniciativa"
                            >
                              <Shuffle className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        <CreateTeamMemberModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={(memberData) => {
            setTeamMembers((prev) => [...prev, memberData]);
            setIsCreateModalOpen(false);
          }}
        />

        <MemberProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => {
            setIsProfileModalOpen(false);
            setSelectedMember(null);
          }}
          member={selectedMember}
        />

        <AssignMemberModal
          isOpen={isAssignModalOpen}
          onClose={() => {
            setIsAssignModalOpen(false);
            setSelectedMember(null);
          }}
          member={selectedMember}
          initiatives={initiatives}
          onAssign={handleAssignMember}
        />
      </div>
    </Layout>
  );
}
