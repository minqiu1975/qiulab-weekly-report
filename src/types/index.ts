export type Role =
  | 'researcher'          // 研究员
  | 'associate_researcher' // 副研究员
  | 'assistant_researcher' // 助理研究员
  | 'postdoc'             // 博士后
  | 'phd'                 // 博士生
  | 'undergraduate'       // 本科生
  | 'visitor'             // 访问学生
  | 'alumni';             // 已毕业/已出站

export type ReportStatus = 'pending' | 'parsing' | 'completed' | 'error';

export type RiskLevel = 'low' | 'medium' | 'high';

export type PersonStatus = 'active' | 'graduated' | 'left' | 'sick' | 'vacation' | 'business_trip' | 'inactive';

export interface Person {
  id: string;
  name: string;
  role: Role;
  roleLabel: string;
  subRole?: string;
  avatar?: string;
  joinDate: string;
  researchDirection: string;
  status: PersonStatus;
  lastSeenWeek: string;
  /** 入学年份（仅博士生和本科生） */
  enrollmentYear?: number;
  /** 学制（仅博士生），默认5年，可选4年 */
  programDuration?: number;
  /** 出站/毕业日期（仅博士后），格式 YYYY-MM-DD */
  exitDate?: string;
  /** 合同到期日期（仅研究员），格式 YYYY-MM-DD */
  contractEndDate?: string;
  /** 预计毕业日期（仅博士生/本科生），格式 YYYY-MM-DD，由学制自动计算，也可手动编辑 */
  graduationDate?: string;
}

export interface WeeklyWorkItem {
  content: string;
  category: string;
  hours?: number;
}

export interface PersonStatusChange {
  name: string;
  type: 'new' | 'left' | 'returned' | 'sick' | 'vacation' | 'business_trip';
  previousWeek?: string;
}

export interface WeeklyReport {
  id: string;
  personId: string;
  personName: string;
  weekNumber: number;
  weekLabel: string;
  submittedAt: string;
  status: ReportStatus;
  workItems: WeeklyWorkItem[];
  problems: string[];
  nextWeekPlan: string[];
  fileName?: string;
  fileSize?: number;
  personStatusChanges: PersonStatusChange[];
}

export interface ProgressAssessment {
  workloadScore: number;
  qualityScore: number;
  milestoneAchievement: string;
  highlights: string[];
  concerns: string[];
}

export interface ProblemDiagnosis {
  bottleneckType: string;
  severity: RiskLevel;
  rootCause: string;
  suggestedSolution: string;
  estimatedResolveTime: string;
}

export interface PathAnalysis {
  directionRationality: number;
  techRouteRisk: RiskLevel;
  frontierComparison: string;
  competitiveness: string;
  adjustmentSuggestion: string;
}

export interface ActionRecommendations {
  immediateActions: string[];
  shortTermGoals: string[];
  midTermPlan: string[];
  collaborationSuggestions: string[];
}

export interface LiteratureSurvey {
  papers: Array<{
    title: string;
    authors: string;
    year: number;
    source: string;
    relevance: string;
  }>;
  topKeywords: string[];
  fieldTrend: string;
}

export interface OutcomePrediction {
  paperProbability: number;
  patentProbability: number;
  expectedTimeline: string;
  recommendedJournals: string[];
}

export interface Assessment {
  id: string;
  personId: string;
  personName: string;
  weekNumber: number;
  weekLabel: string;
  generatedAt: string;
  progressAssessment: ProgressAssessment;
  problemDiagnosis: ProblemDiagnosis;
  pathAnalysis: PathAnalysis;
  actionRecommendations: ActionRecommendations;
  overallScore: number;
  riskLevel: RiskLevel;
  summary: string;
  literatureSurvey: LiteratureSurvey;
  outcomePrediction: OutcomePrediction;
}

export interface TrendPoint {
  weekNumber: number;
  weekLabel: string;
  workloadScore: number;
  progressScore: number;
  problemCount: number;
  overallScore: number;
  isAnomaly?: boolean;
  anomalyReason?: string;
}

export interface PersonTrend {
  personId: string;
  personName: string;
  data: TrendPoint[];
}

export interface LiteratureItem {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  year: number;
  source: string;
  url: string;
  citationCount: number;
  relevanceScore: number;
}

export interface CollaborationNode {
  id: string;
  name: string;
  role: Role;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface CollaborationLink {
  source: string;
  target: string;
  strength: number;
  topics: string[];
}

export interface CollaborationPair {
  personA: string;
  personB: string;
  similarityScore: number;
  commonTopics: string[];
  reason: string;
  recommendedProjects: string[];
}

export interface CollaborationData {
  nodes: CollaborationNode[];
  links: CollaborationLink[];
  recommendedPairs: CollaborationPair[];
}

export interface UploadFile {
  id: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  status: ReportStatus;
  parsedReportId?: string;
  errorMessage?: string;
}

export interface SystemSettings {
  kimiApiConfigured: boolean;
  kimiModelVersion: string;
  lastSyncTime: string;
  totalReports: number;
  totalAssessments: number;
}

export interface BaselineDocument {
  id: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  description: string;
  chunkCount: number;
}

export interface RagQueryResult {
  query: string;
  results: {
    content: string;
    source: string;
    similarity: number;
  }[];
}
