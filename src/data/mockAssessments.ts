import type { Assessment } from '../types';

export const MOCK_ASSESSMENTS: Assessment[] = [
  {
    id: 'a1', personId: 'p1', personName: '严巍',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 75, riskLevel: 'low', summary: '补充PL文章仿真，修改OL文章',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['补充PL文章仿真，修改OL文章'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '论文推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['补充PL文章仿真，修改OL文章'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['论文推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a2', personId: 'p2', personName: '陈瑞溢',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 80, riskLevel: 'low', summary: '皮秒激光打印设备参数化扫描，多基底测试',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['皮秒激光打印设备参数化扫描，多基底测试'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '设备调试', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['皮秒激光打印设备参数化扫描，多基底测试'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['设备调试'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a3', personId: 'p3', personName: '潘婧',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 70, riskLevel: 'low', summary: '提交专利交底书，撰写权利要求书',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['提交专利交底书，撰写权利要求书'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '专利布局', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['提交专利交底书，撰写权利要求书'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['专利布局'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a4', personId: 'p4', personName: '谢宇',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 85, riskLevel: 'low', summary: 'fs加工微孔阵列仿真，补充散射截面数据',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['fs加工微孔阵列仿真，补充散射截面数据'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '仿真推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['fs加工微孔阵列仿真，补充散射截面数据'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['仿真推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a5', personId: 'p5', personName: '薛环一',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 70, riskLevel: 'low', summary: '优化低温扫描热噪声，设计探针cooling方案',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['优化低温扫描热噪声，设计探针cooling方案'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '设备优化', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['优化低温扫描热噪声，设计探针cooling方案'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['设备优化'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a6', personId: 'p6', personName: '赵康',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 75, riskLevel: 'low', summary: '修改青年科学基金，生物冰刻实验',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['修改青年科学基金，生物冰刻实验'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '基金申请', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['修改青年科学基金，生物冰刻实验'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['基金申请'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a7', personId: 'p7', personName: '孙歆语',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 70, riskLevel: 'low', summary: '耦合强度演化理论推导，完善实验数据',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['耦合强度演化理论推导，完善实验数据'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '理论推导', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['耦合强度演化理论推导，完善实验数据'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['理论推导'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a8', personId: 'p8', personName: '薛淑雯',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 65, riskLevel: 'medium', summary: '双面超透镜可行性调研，申请书统稿',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['双面超透镜可行性调研，申请书统稿'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '文献调研', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['双面超透镜可行性调研，申请书统稿'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['文献调研'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a9', personId: 'p9', personName: '邵露青',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 70, riskLevel: 'low', summary: '完成7个样品低温测试，数据分析中',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['完成7个样品低温测试，数据分析中'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '低温测试', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['完成7个样品低温测试，数据分析中'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['低温测试'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a10', personId: 'p10', personName: '刘天远',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 70, riskLevel: 'low', summary: '重构摘要和introduction，尝试描述topological phase transition',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['重构摘要和introduction，尝试描述topological phase transition'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '理论攻坚', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['重构摘要和introduction，尝试描述topological phase transition'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['理论攻坚'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a11', personId: 'd1', personName: '林春博',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 75, riskLevel: 'low', summary: '纳米线实验方案规划，力学染色概念提出',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['纳米线实验方案规划，力学染色概念提出'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '方案规划', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['纳米线实验方案规划，力学染色概念提出'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['方案规划'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a12', personId: 'd2', personName: '李志浩',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 80, riskLevel: 'low', summary: 'SORD文章整理，SiC review，光计算合作交流',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['SORD文章整理，SiC review，光计算合作交流'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '多线并进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['SORD文章整理，SiC review，光计算合作交流'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['多线并进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a13', personId: 'd3', personName: '欧玟',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 60, riskLevel: 'medium', summary: '完成动物伦理申请，柔性基底制备',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['完成动物伦理申请，柔性基底制备'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '实验准备', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['完成动物伦理申请，柔性基底制备'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['实验准备'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a14', personId: 'd4', personName: '王旭杰',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 55, riskLevel: 'medium', summary: '小电镜维修，冰刻实验辅助',
    progressAssessment: {
      workloadScore: 55, qualityScore: 55, milestoneAchievement: '稳步推进',
      highlights: ['小电镜维修，冰刻实验辅助'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '设备维护', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['小电镜维修，冰刻实验辅助'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['设备维护'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a15', personId: 'd5', personName: '陈博取',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 85, riskLevel: 'low', summary: '毕业论文3-5章完成，Device文章接收，光计算合作',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['毕业论文3-5章完成，Device文章接收，光计算合作'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '论文冲刺', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['毕业论文3-5章完成，Device文章接收，光计算合作'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['论文冲刺'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a16', personId: 'd6', personName: '齐利民',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 80, riskLevel: 'low', summary: '博士毕业论文初稿45000字完成',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['博士毕业论文初稿45000字完成'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '论文初稿', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['博士毕业论文初稿45000字完成'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['论文初稿'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a17', personId: 'd7', personName: '卢奕含',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 70, riskLevel: 'low', summary: '大论文正文完成，Light审稿仿真',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['大论文正文完成，Light审稿仿真'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '论文撰写', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['大论文正文完成，Light审稿仿真'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['论文撰写'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a18', personId: 'd8', personName: '孙潇雨',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 85, riskLevel: 'low', summary: 'SiC微孔加工参数系统扫描，红外反射率测试',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['SiC微孔加工参数系统扫描，红外反射率测试'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '实验推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['SiC微孔加工参数系统扫描，红外反射率测试'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['实验推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a19', personId: 'd9', personName: '裴海月',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 70, riskLevel: 'low', summary: '小型化文章定稿投稿，温控模块故障维修',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['小型化文章定稿投稿，温控模块故障维修'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '文章投稿', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['小型化文章定稿投稿，温控模块故障维修'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['文章投稿'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a20', personId: 'd10', personName: '杨治蓉',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 60, riskLevel: 'medium', summary: '冷台故障维修，催化实验验证',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['冷台故障维修，催化实验验证'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '设备维修', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['冷台故障维修，催化实验验证'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['设备维修'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a21', personId: 'd11', personName: '周子博',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 65, riskLevel: 'medium', summary: '修改大论文格式，提交资格审查',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['修改大论文格式，提交资格审查'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '毕业准备', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['修改大论文格式，提交资格审查'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['毕业准备'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a22', personId: 'd12', personName: '邓卉彤',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 60, riskLevel: 'medium', summary: '修改大论文排版，准备预答辩PPT',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['修改大论文排版，准备预答辩PPT'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '毕业准备', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['修改大论文排版，准备预答辩PPT'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['毕业准备'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a23', personId: 'd13', personName: '王启南',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 60, riskLevel: 'medium', summary: '透明有机太阳能电池初稿修改，钙钛矿器件制备',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['透明有机太阳能电池初稿修改，钙钛矿器件制备'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '器件制备', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['透明有机太阳能电池初稿修改，钙钛矿器件制备'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['器件制备'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a24', personId: 'd14', personName: '欧阳祖希',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 60, riskLevel: 'medium', summary: 'Sci.Bull修改完成待投，润湿实验',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['Sci.Bull修改完成待投，润湿实验'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '文章投稿', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['Sci.Bull修改完成待投，润湿实验'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['文章投稿'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a25', personId: 'd15', personName: '马墨南',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 70, riskLevel: 'low', summary: 'PL文章图片修改，SiC衬底光刻标记',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['PL文章图片修改，SiC衬底光刻标记'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '实验推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['PL文章图片修改，SiC衬底光刻标记'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['实验推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a26', personId: 'd16', personName: '李晓萱',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 85, riskLevel: 'low', summary: '金刚石超透镜制备，void器件测试，C掩模工艺',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['金刚石超透镜制备，void器件测试，C掩模工艺'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '多线并进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['金刚石超透镜制备，void器件测试，C掩模工艺'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['多线并进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a27', personId: 'd17', personName: '章子鉴',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 55, riskLevel: 'medium', summary: '样品消色差测试，开题报告撰写1/3',
    progressAssessment: {
      workloadScore: 55, qualityScore: 55, milestoneAchievement: '稳步推进',
      highlights: ['样品消色差测试，开题报告撰写1/3'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '开题准备', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['样品消色差测试，开题报告撰写1/3'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['开题准备'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a28', personId: 'd18', personName: '陈飞霖',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 70, riskLevel: 'low', summary: '新版扫描热台设计下单，Bi2Se3材料制备',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['新版扫描热台设计下单，Bi2Se3材料制备'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '设备开发', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['新版扫描热台设计下单，Bi2Se3材料制备'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['设备开发'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a29', personId: 'd19', personName: '虞阳',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 80, riskLevel: 'low', summary: '八向分束结构仿真，倾斜光栅效率90%',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['八向分束结构仿真，倾斜光栅效率90%'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '仿真推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['八向分束结构仿真，倾斜光栅效率90%'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['仿真推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a30', personId: 'd20', personName: '郑豪杰',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 55, riskLevel: 'medium', summary: '钛合金样品精加工，论文作图学习',
    progressAssessment: {
      workloadScore: 55, qualityScore: 55, milestoneAchievement: '稳步推进',
      highlights: ['钛合金样品精加工，论文作图学习'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '实验推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['钛合金样品精加工，论文作图学习'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['实验推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a31', personId: 'd21', personName: '陈代吉',
    weekNumber: 1, weekLabel: '2026.03.06', generatedAt: '2026.03.06',
    overallScore: 45, riskLevel: 'high', summary: '光电子学理论学习',
    progressAssessment: {
      workloadScore: 45, qualityScore: 45, milestoneAchievement: '稳步推进',
      highlights: ['光电子学理论学习'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '理论学习', severity: 'high', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'high', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['光电子学理论学习'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['理论学习'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a32', personId: 'p1', personName: '严巍',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 75, riskLevel: 'low', summary: '粗糙表面d-parameters计算，PIERS文章准备',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['粗糙表面d-parameters计算，PIERS文章准备'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '论文推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['粗糙表面d-parameters计算，PIERS文章准备'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['论文推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a33', personId: 'p2', personName: '陈瑞溢',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 80, riskLevel: 'low', summary: '全彩图片一键化打印，钛合金参数优化',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['全彩图片一键化打印，钛合金参数优化'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '工艺优化', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['全彩图片一键化打印，钛合金参数优化'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['工艺优化'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a34', personId: 'p3', personName: '潘婧',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 75, riskLevel: 'low', summary: '专利律师沟通，光计算论文修改70%，展示墙设计',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['专利律师沟通，光计算论文修改70%，展示墙设计'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '多线并进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['专利律师沟通，光计算论文修改70%，展示墙设计'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['多线并进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a35', personId: 'p4', personName: '谢宇',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 85, riskLevel: 'low', summary: '正文图2/3调整，实验数据处理，文章润色',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['正文图2/3调整，实验数据处理，文章润色'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '文章撰写', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['正文图2/3调整，实验数据处理，文章润色'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['文章撰写'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a36', personId: 'p5', personName: '薛环一',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 75, riskLevel: 'low', summary: '冷台支撑改善噪声，探针cooling设计',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['冷台支撑改善噪声，探针cooling设计'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '设备优化', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['冷台支撑改善噪声，探针cooling设计'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['设备优化'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a37', personId: 'p6', personName: '赵康',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 70, riskLevel: 'low', summary: '青年基金正式提交，生物冰刻实验',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['青年基金正式提交，生物冰刻实验'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '基金提交', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['青年基金正式提交，生物冰刻实验'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['基金提交'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a38', personId: 'p7', personName: '孙歆语',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 70, riskLevel: 'low', summary: '耦合强度理论归纳，Fig.3重绘',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['耦合强度理论归纳，Fig.3重绘'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '理论完善', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['耦合强度理论归纳，Fig.3重绘'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['理论完善'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a39', personId: 'p8', personName: '薛淑雯',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 70, riskLevel: 'low', summary: '双面超透镜脚本优化，青年基金提交',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['双面超透镜脚本优化，青年基金提交'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '基金提交', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['双面超透镜脚本优化，青年基金提交'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['基金提交'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a40', personId: 'p9', personName: '邵露青',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 80, riskLevel: 'low', summary: '低温PL实验全部完成，退火温度优化为600度',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['低温PL实验全部完成，退火温度优化为600度'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '数据分析', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['低温PL实验全部完成，退火温度优化为600度'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['数据分析'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a41', personId: 'p10', personName: '刘天远',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 70, riskLevel: 'low', summary: '有效Hamiltonian推导，拓扑荷定义',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['有效Hamiltonian推导，拓扑荷定义'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '理论推导', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['有效Hamiltonian推导，拓扑荷定义'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['理论推导'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a42', personId: 'd1', personName: '林春博',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 75, riskLevel: 'low', summary: '冰刻实验，光压平台测试，纳米线方案更新',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['冰刻实验，光压平台测试，纳米线方案更新'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '实验推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['冰刻实验，光压平台测试，纳米线方案更新'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['实验推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a43', personId: 'd2', personName: '李志浩',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 80, riskLevel: 'low', summary: 'SORD修改，开题报告PPT，消色差透镜设计',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['SORD修改，开题报告PPT，消色差透镜设计'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '多线并进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['SORD修改，开题报告PPT，消色差透镜设计'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['多线并进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a44', personId: 'd3', personName: '欧玟',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 65, riskLevel: 'medium', summary: '柔性器件弯曲测试，多电极测试方案',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['柔性器件弯曲测试，多电极测试方案'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '柔性器件', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['柔性器件弯曲测试，多电极测试方案'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['柔性器件'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a45', personId: 'd4', personName: '王旭杰',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 50, riskLevel: 'medium', summary: '冰刻实验辅助，铜胶带镀膜尝试',
    progressAssessment: {
      workloadScore: 50, qualityScore: 50, milestoneAchievement: '稳步推进',
      highlights: ['冰刻实验辅助，铜胶带镀膜尝试'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '实验辅助', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['冰刻实验辅助，铜胶带镀膜尝试'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['实验辅助'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a46', personId: 'd5', personName: '陈博取',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 70, riskLevel: 'low', summary: '毕业论文配图校正，Device文章proof',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['毕业论文配图校正，Device文章proof'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '毕业论文', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['毕业论文配图校正，Device文章proof'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['毕业论文'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a47', personId: 'd6', personName: '齐利民',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 80, riskLevel: 'low', summary: '毕业论文初稿完成，毕业流程办理',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['毕业论文初稿完成，毕业流程办理'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '毕业准备', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['毕业论文初稿完成，毕业流程办理'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['毕业准备'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a48', personId: 'd7', personName: '卢奕含',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 75, riskLevel: 'low', summary: 'Light审稿仿真完成，力学仿真',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['Light审稿仿真完成，力学仿真'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '审稿回复', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['Light审稿仿真完成，力学仿真'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['审稿回复'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a49', personId: 'd8', personName: '孙潇雨',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 80, riskLevel: 'low', summary: '微孔形貌优化，偏振测试，大面积加工',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['微孔形貌优化，偏振测试，大面积加工'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '实验优化', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['微孔形貌优化，偏振测试，大面积加工'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['实验优化'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a50', personId: 'd9', personName: '裴海月',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 70, riskLevel: 'low', summary: '温控模块重新采购，嵌入式芯片测试',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['温控模块重新采购，嵌入式芯片测试'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '设备维修', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['温控模块重新采购，嵌入式芯片测试'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['设备维修'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a51', personId: 'd10', personName: '杨治蓉',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 65, riskLevel: 'medium', summary: '冷台维修完成，催化验证实验',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['冷台维修完成，催化验证实验'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '设备维修', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['冷台维修完成，催化验证实验'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['设备维修'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a52', personId: 'd11', personName: '周子博',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 70, riskLevel: 'low', summary: '大论文摘要修改，预答辩PPT 70%',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['大论文摘要修改，预答辩PPT 70%'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '毕业准备', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['大论文摘要修改，预答辩PPT 70%'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['毕业准备'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a53', personId: 'd12', personName: '邓卉彤',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 65, riskLevel: 'medium', summary: '大论文校稿，准备预答辩试讲',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['大论文校稿，准备预答辩试讲'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '毕业准备', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['大论文校稿，准备预答辩试讲'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['毕业准备'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a54', personId: 'd13', personName: '王启南',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 65, riskLevel: 'medium', summary: '钙钛矿探测器器件测试，形貌表征',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['钙钛矿探测器器件测试，形貌表征'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '器件优化', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['钙钛矿探测器器件测试，形貌表征'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['器件优化'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a55', personId: 'd14', personName: '欧阳祖希',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 65, riskLevel: 'medium', summary: 'Sci.Bull投稿，多孔润湿应用设计',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['Sci.Bull投稿，多孔润湿应用设计'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '文章投稿', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['Sci.Bull投稿，多孔润湿应用设计'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['文章投稿'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a56', personId: 'd15', personName: '马墨南',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 75, riskLevel: 'low', summary: 'SiC衬底送样生长金片，单脉冲nm级驱动',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['SiC衬底送样生长金片，单脉冲nm级驱动'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '实验推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['SiC衬底送样生长金片，单脉冲nm级驱动'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['实验推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a57', personId: 'd16', personName: '李晓萱',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 85, riskLevel: 'low', summary: '金刚石超透镜热稳定性，void器件第二版',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['金刚石超透镜热稳定性，void器件第二版'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '多线并进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['金刚石超透镜热稳定性，void器件第二版'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['多线并进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a58', personId: 'd17', personName: '章子鉴',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 70, riskLevel: 'low', summary: '消色差测试完成，开题报告框架讨论',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['消色差测试完成，开题报告框架讨论'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '开题准备', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['消色差测试完成，开题报告框架讨论'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['开题准备'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a59', personId: 'd18', personName: '陈飞霖',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 75, riskLevel: 'low', summary: '新版扫描热台测试，震动7nm，小文章数据',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['新版扫描热台测试，震动7nm，小文章数据'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '设备开发', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['新版扫描热台测试，震动7nm，小文章数据'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['设备开发'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a60', personId: 'd19', personName: '虞阳',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 75, riskLevel: 'low', summary: 'AR扩瞳方案应用，悬臂梁反射镜加工',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['AR扩瞳方案应用，悬臂梁反射镜加工'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '应用探索', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['AR扩瞳方案应用，悬臂梁反射镜加工'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['应用探索'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a61', personId: 'd20', personName: '郑豪杰',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 55, riskLevel: 'medium', summary: '小型钛合金样品制备，中期答辩准备',
    progressAssessment: {
      workloadScore: 55, qualityScore: 55, milestoneAchievement: '稳步推进',
      highlights: ['小型钛合金样品制备，中期答辩准备'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '实验推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['小型钛合金样品制备，中期答辩准备'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['实验推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a62', personId: 'd21', personName: '陈代吉',
    weekNumber: 2, weekLabel: '2026.03.13', generatedAt: '2026.03.13',
    overallScore: 45, riskLevel: 'high', summary: '光电子学理论学习',
    progressAssessment: {
      workloadScore: 45, qualityScore: 45, milestoneAchievement: '稳步推进',
      highlights: ['光电子学理论学习'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '理论学习', severity: 'high', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'high', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['光电子学理论学习'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['理论学习'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a63', personId: 'p1', personName: '严巍',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 75, riskLevel: 'low', summary: 'PL文章仿真优化，BEM程序编写，d参数计算',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['PL文章仿真优化，BEM程序编写，d参数计算'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '论文推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['PL文章仿真优化，BEM程序编写，d参数计算'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['论文推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a64', personId: 'p2', personName: '陈瑞溢',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 85, riskLevel: 'low', summary: '全彩一键打印3分钟完成，单色工艺定标',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['全彩一键打印3分钟完成，单色工艺定标'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '工艺突破', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['全彩一键打印3分钟完成，单色工艺定标'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['工艺突破'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a65', personId: 'p3', personName: '潘婧',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 75, riskLevel: 'low', summary: '光计算论文修改70%，展示墙设计更新',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['光计算论文修改70%，展示墙设计更新'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '论文修改', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['光计算论文修改70%，展示墙设计更新'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['论文修改'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a66', personId: 'p4', personName: '谢宇',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 85, riskLevel: 'low', summary: '图2/3调整补充，正文润色，支撑文件完善',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['图2/3调整补充，正文润色，支撑文件完善'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '文章撰写', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['图2/3调整补充，正文润色，支撑文件完善'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['文章撰写'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a67', personId: 'p5', personName: '薛环一',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 75, riskLevel: 'low', summary: '噪声降至2nm，21K下扫描，探针cooling验证',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['噪声降至2nm，21K下扫描，探针cooling验证'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '设备突破', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['噪声降至2nm，21K下扫描，探针cooling验证'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['设备突破'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a68', personId: 'p6', personName: '赵康',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 75, riskLevel: 'low', summary: '青年基金定稿提交，长春光标委会议',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['青年基金定稿提交，长春光标委会议'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '基金提交', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['青年基金定稿提交，长春光标委会议'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['基金提交'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a69', personId: 'p7', personName: '孙歆语',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 70, riskLevel: 'low', summary: '理论数据归纳，两个分类讨论',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['理论数据归纳，两个分类讨论'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '理论完善', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['理论数据归纳，两个分类讨论'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['理论完善'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a70', personId: 'p8', personName: '薛淑雯',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 75, riskLevel: 'low', summary: '双面超透镜脚本优化，150um仿真完成',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['双面超透镜脚本优化，150um仿真完成'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '仿真优化', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['双面超透镜脚本优化，150um仿真完成'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['仿真优化'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a71', personId: 'p9', personName: '邵露青',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 85, riskLevel: 'low', summary: '低温PL数据分析完成，退火600度最佳',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['低温PL数据分析完成，退火600度最佳'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '数据分析', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['低温PL数据分析完成，退火600度最佳'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['数据分析'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a72', personId: 'p10', personName: '刘天远',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 70, riskLevel: 'low', summary: '二维Hamiltonian推导，涡旋光理论验证',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['二维Hamiltonian推导，涡旋光理论验证'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '理论攻坚', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['二维Hamiltonian推导，涡旋光理论验证'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['理论攻坚'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a73', personId: 'd1', personName: '林春博',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 75, riskLevel: 'low', summary: 'Blender绘图，纳米线实验，ESEM数据',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['Blender绘图，纳米线实验，ESEM数据'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '多线并进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['Blender绘图，纳米线实验，ESEM数据'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['多线并进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a74', personId: 'd2', personName: '李志浩',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 80, riskLevel: 'low', summary: 'SORD修改，博士开题报告PPT完成',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['SORD修改，博士开题报告PPT完成'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '开题准备', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['SORD修改，博士开题报告PPT完成'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['开题准备'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a75', personId: 'd3', personName: '欧玟',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 65, riskLevel: 'medium', summary: '有机太阳能电池激活小鼠坐骨神经',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['有机太阳能电池激活小鼠坐骨神经'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '动物实验', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['有机太阳能电池激活小鼠坐骨神经'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['动物实验'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a76', personId: 'd4', personName: '王旭杰',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 55, riskLevel: 'medium', summary: '李小波实验室处理硅藻，冻存实验准备',
    progressAssessment: {
      workloadScore: 55, qualityScore: 55, milestoneAchievement: '稳步推进',
      highlights: ['李小波实验室处理硅藻，冻存实验准备'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '实验准备', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['李小波实验室处理硅藻，冻存实验准备'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['实验准备'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a77', personId: 'd5', personName: '陈博取',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 70, riskLevel: 'low', summary: '预答辩报告准备，Device文章proof',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['预答辩报告准备，Device文章proof'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '预答辩', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['预答辩报告准备，Device文章proof'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['预答辩'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a78', personId: 'd6', personName: '齐利民',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 80, riskLevel: 'low', summary: '毕业论文预答辩完成，毕业材料提交',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['毕业论文预答辩完成，毕业材料提交'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '预答辩', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['毕业论文预答辩完成，毕业材料提交'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['预答辩'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a79', personId: 'd7', personName: '卢奕含',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 70, riskLevel: 'low', summary: 'Light审稿意见撰写，稳定性测试',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['Light审稿意见撰写，稳定性测试'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '审稿回复', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['Light审稿意见撰写，稳定性测试'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['审稿回复'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a80', personId: 'd8', personName: '孙潇雨',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 85, riskLevel: 'low', summary: '反射率降至8.5%，大面积5x5mm加工',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['反射率降至8.5%，大面积5x5mm加工'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '实验突破', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['反射率降至8.5%，大面积5x5mm加工'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['实验突破'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a81', personId: 'd9', personName: '裴海月',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 70, riskLevel: 'low', summary: 'PCB温控模块完成，芯片漏气未解决',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['PCB温控模块完成，芯片漏气未解决'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '设备攻坚', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['PCB温控模块完成，芯片漏气未解决'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['设备攻坚'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a82', personId: 'd10', personName: '杨治蓉',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 65, riskLevel: 'medium', summary: '冷台冰堵排查，催化方案不可行',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['冷台冰堵排查，催化方案不可行'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '设备维修', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['冷台冰堵排查，催化方案不可行'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['设备维修'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a83', personId: 'd11', personName: '周子博',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 70, riskLevel: 'low', summary: '大论文排版校稿，预答辩完成',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['大论文排版校稿，预答辩完成'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '预答辩', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['大论文排版校稿，预答辩完成'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['预答辩'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a84', personId: 'd12', personName: '邓卉彤',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 65, riskLevel: 'medium', summary: '大论文校稿，预答辩完成',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['大论文校稿，预答辩完成'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '预答辩', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['大论文校稿，预答辩完成'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['预答辩'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a85', personId: 'd13', personName: '王启南',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 65, riskLevel: 'medium', summary: '钙钛矿PEIE浓度优化，器件形貌表征',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['钙钛矿PEIE浓度优化，器件形貌表征'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '器件优化', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['钙钛矿PEIE浓度优化，器件形貌表征'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['器件优化'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a86', personId: 'd14', personName: '欧阳祖希',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 65, riskLevel: 'medium', summary: '多孔润湿加密实验，微流控调研',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['多孔润湿加密实验，微流控调研'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '应用探索', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['多孔润湿加密实验，微流控调研'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['应用探索'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a87', personId: 'd15', personName: '马墨南',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 80, riskLevel: 'low', summary: '光热弹性波驱动扫描完成，15nJ阈值',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['光热弹性波驱动扫描完成，15nJ阈值'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '实验突破', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['光热弹性波驱动扫描完成，15nJ阈值'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['实验突破'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a88', personId: 'd16', personName: '李晓萱',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 85, riskLevel: 'low', summary: '金刚石超透镜热稳定性，长时间辐照测试',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['金刚石超透镜热稳定性，长时间辐照测试'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '多线并进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['金刚石超透镜热稳定性，长时间辐照测试'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['多线并进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a89', personId: 'd17', personName: '章子鉴',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 70, riskLevel: 'low', summary: '开题答辩完成，消色差透镜设计',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['开题答辩完成，消色差透镜设计'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '开题答辩', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['开题答辩完成，消色差透镜设计'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['开题答辩'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a90', personId: 'd18', personName: '陈飞霖',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 80, riskLevel: 'low', summary: '扫描热台低温21K测试通过，控温设计',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['扫描热台低温21K测试通过，控温设计'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '设备突破', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['扫描热台低温21K测试通过，控温设计'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['设备突破'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a91', personId: 'd19', personName: '虞阳',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 80, riskLevel: 'low', summary: '3x3并行激光束70%效率，湿法去金属改进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['3x3并行激光束70%效率，湿法去金属改进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '工艺优化', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['3x3并行激光束70%效率，湿法去金属改进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['工艺优化'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a92', personId: 'd20', personName: '郑豪杰',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 55, riskLevel: 'medium', summary: '结构色样品制备，中期检查报告',
    progressAssessment: {
      workloadScore: 55, qualityScore: 55, milestoneAchievement: '稳步推进',
      highlights: ['结构色样品制备，中期检查报告'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '中期报告', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['结构色样品制备，中期检查报告'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['中期报告'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a93', personId: 'd21', personName: '陈代吉',
    weekNumber: 3, weekLabel: '2026.03.20', generatedAt: '2026.03.20',
    overallScore: 45, riskLevel: 'high', summary: '光电子学理论学习',
    progressAssessment: {
      workloadScore: 45, qualityScore: 45, milestoneAchievement: '稳步推进',
      highlights: ['光电子学理论学习'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '理论学习', severity: 'high', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'high', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['光电子学理论学习'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['理论学习'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a94', personId: 'p1', personName: '严巍',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 80, riskLevel: 'low', summary: 'd参数仿真完成，PL文章初稿完成，PIERS准备',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['d参数仿真完成，PL文章初稿完成，PIERS准备'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '论文冲刺', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['d参数仿真完成，PL文章初稿完成，PIERS准备'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['论文冲刺'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a95', personId: 'p2', personName: '陈瑞溢',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 80, riskLevel: 'low', summary: '全彩图片库建立，单色少色工艺确定',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['全彩图片库建立，单色少色工艺确定'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '工艺优化', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['全彩图片库建立，单色少色工艺确定'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['工艺优化'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a96', personId: 'p3', personName: '潘婧',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 75, riskLevel: 'low', summary: '光计算论文完成，国家奖培训会',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['光计算论文完成，国家奖培训会'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '多线并进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['光计算论文完成，国家奖培训会'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['多线并进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a97', personId: 'p4', personName: '谢宇',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 90, riskLevel: 'low', summary: '热辐射实验完成，正文全文撰写，图4绘制',
    progressAssessment: {
      workloadScore: 90, qualityScore: 90, milestoneAchievement: '稳步推进',
      highlights: ['热辐射实验完成，正文全文撰写，图4绘制'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '文章冲刺', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['热辐射实验完成，正文全文撰写，图4绘制'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['文章冲刺'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a98', personId: 'p5', personName: '薛环一',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 70, riskLevel: 'low', summary: '光电流器件制备，探针cooling零件采购',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['光电流器件制备，探针cooling零件采购'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '器件制备', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['光电流器件制备，探针cooling零件采购'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['器件制备'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a99', personId: 'p6', personName: '赵康',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 80, riskLevel: 'low', summary: 'PhotoniX审稿回复，报奖材料准备',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['PhotoniX审稿回复，报奖材料准备'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '审稿回复', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['PhotoniX审稿回复，报奖材料准备'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['审稿回复'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a100', personId: 'p7', personName: '孙歆语',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 75, riskLevel: 'low', summary: '集体耦合强度推导，FP/GM模式演变',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['集体耦合强度推导，FP/GM模式演变'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '理论完善', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['集体耦合强度推导，FP/GM模式演变'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['理论完善'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a101', personId: 'p8', personName: '薛淑雯',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 75, riskLevel: 'low', summary: '双面超透镜仿真，非线性消色差文献学习',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['双面超透镜仿真，非线性消色差文献学习'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '仿真优化', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['双面超透镜仿真，非线性消色差文献学习'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['仿真优化'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a102', personId: 'p9', personName: '邵露青',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 80, riskLevel: 'low', summary: '寿命测试光路搭建，审稿回复修改',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['寿命测试光路搭建，审稿回复修改'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '光路搭建', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['寿命测试光路搭建，审稿回复修改'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['光路搭建'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a103', personId: 'p10', personName: '刘天远',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 70, riskLevel: 'low', summary: '扰动导致拓扑相变推导中',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['扰动导致拓扑相变推导中'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '理论攻坚', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['扰动导致拓扑相变推导中'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['理论攻坚'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a104', personId: 'd1', personName: '林春博',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 60, riskLevel: 'medium', summary: '光压定标数据处理，文章构思',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['光压定标数据处理，文章构思'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '数据处理', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['光压定标数据处理，文章构思'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['数据处理'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a105', personId: 'd2', personName: '李志浩',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 80, riskLevel: 'low', summary: '博士开题完成，消色差透镜非线性算法',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['博士开题完成，消色差透镜非线性算法'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '开题完成', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['博士开题完成，消色差透镜非线性算法'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['开题完成'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a106', personId: 'd3', personName: '欧玟',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 85, riskLevel: 'low', summary: '柔性PI电池激活小鼠坐骨神经，大鼠实验',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['柔性PI电池激活小鼠坐骨神经，大鼠实验'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '动物突破', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['柔性PI电池激活小鼠坐骨神经，大鼠实验'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['动物突破'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a107', personId: 'd4', personName: '王旭杰',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 50, riskLevel: 'medium', summary: '写中期报告，铜胶带剥离尝试',
    progressAssessment: {
      workloadScore: 50, qualityScore: 50, milestoneAchievement: '稳步推进',
      highlights: ['写中期报告，铜胶带剥离尝试'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '中期报告', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['写中期报告，铜胶带剥离尝试'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['中期报告'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a108', personId: 'd5', personName: '陈博取',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 80, riskLevel: 'low', summary: '大论文逻辑系统性调整，章节重排',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['大论文逻辑系统性调整，章节重排'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '论文修改', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['大论文逻辑系统性调整，章节重排'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['论文修改'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a109', personId: 'd6', personName: '齐利民',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 60, riskLevel: 'medium', summary: '预答辩后第一章修改',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['预答辩后第一章修改'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '论文修改', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['预答辩后第一章修改'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['论文修改'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a110', personId: 'd7', personName: '卢奕含',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 75, riskLevel: 'low', summary: 'Light审稿意见20页，响应速度测试',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['Light审稿意见20页，响应速度测试'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '审稿冲刺', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['Light审稿意见20页，响应速度测试'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['审稿冲刺'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a111', personId: 'd8', personName: '孙潇雨',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 80, riskLevel: 'low', summary: '文章初稿引言撰写，图1/SI图绘制',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['文章初稿引言撰写，图1/SI图绘制'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '文章撰写', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['文章初稿引言撰写，图1/SI图绘制'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['文章撰写'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a112', personId: 'd9', personName: '裴海月',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 65, riskLevel: 'medium', summary: '温控初步解决，芯片漏气未解决，降温250K',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['温控初步解决，芯片漏气未解决，降温250K'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '设备攻坚', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['温控初步解决，芯片漏气未解决，降温250K'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['设备攻坚'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a113', personId: 'd10', personName: '杨治蓉',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 60, riskLevel: 'medium', summary: '冷台冰堵未解决，酶固定位点方案不可行',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['冷台冰堵未解决，酶固定位点方案不可行'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '设备维修', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['冷台冰堵未解决，酶固定位点方案不可行'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['设备维修'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a114', personId: 'd11', personName: '周子博',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 75, riskLevel: 'low', summary: '大论文修改完成，送审申请，查重准备',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['大论文修改完成，送审申请，查重准备'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '论文冲刺', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['大论文修改完成，送审申请，查重准备'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['论文冲刺'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a115', personId: 'd12', personName: '邓卉彤',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 60, riskLevel: 'medium', summary: '大论文章节关联修改',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['大论文章节关联修改'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '论文修改', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['大论文章节关联修改'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['论文修改'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a116', personId: 'd13', personName: '王启南',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 65, riskLevel: 'medium', summary: '钙钛矿薄膜旋涂优化，界面层优化',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['钙钛矿薄膜旋涂优化，界面层优化'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '器件优化', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['钙钛矿薄膜旋涂优化，界面层优化'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['器件优化'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a117', personId: 'd14', personName: '欧阳祖希',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 70, riskLevel: 'low', summary: '多孔加密实验完成，微流控调研',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['多孔加密实验完成，微流控调研'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '应用推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['多孔加密实验完成，微流控调研'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['应用推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a118', personId: 'd15', personName: '马墨南',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 80, riskLevel: 'low', summary: '摩擦系数测量方案，石墨烯制备，FIB加工',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['摩擦系数测量方案，石墨烯制备，FIB加工'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '多线并进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['摩擦系数测量方案，石墨烯制备，FIB加工'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['多线并进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a119', personId: 'd16', personName: '李晓萱',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 90, riskLevel: 'low', summary: '对标物镜热稳定性对比，超透镜焦点稳定',
    progressAssessment: {
      workloadScore: 90, qualityScore: 90, milestoneAchievement: '稳步推进',
      highlights: ['对标物镜热稳定性对比，超透镜焦点稳定'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '多线并进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['对标物镜热稳定性对比，超透镜焦点稳定'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['多线并进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a120', personId: 'd17', personName: '章子鉴',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 75, riskLevel: 'low', summary: '开题答辩未通过，工作安排制定到八月',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['开题答辩未通过，工作安排制定到八月'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '开题答辩', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['开题答辩未通过，工作安排制定到八月'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['开题答辩'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a121', personId: 'd18', personName: '陈飞霖',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 75, riskLevel: 'low', summary: '扫描热验证样品制备，控温实验',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['扫描热验证样品制备，控温实验'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '设备推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['扫描热验证样品制备，控温实验'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['设备推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a122', personId: 'd19', personName: '虞阳',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 80, riskLevel: 'low', summary: '角分辨测试样品准备，悬臂梁时空涡旋',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['角分辨测试样品准备，悬臂梁时空涡旋'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '测试准备', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['角分辨测试样品准备，悬臂梁时空涡旋'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['测试准备'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a123', personId: 'd20', personName: '郑豪杰',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 60, riskLevel: 'medium', summary: '中期报告完成，新样品光谱测试',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['中期报告完成，新样品光谱测试'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '中期报告', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['中期报告完成，新样品光谱测试'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['中期报告'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a124', personId: 'd21', personName: '陈代吉',
    weekNumber: 4, weekLabel: '2026.03.27', generatedAt: '2026.03.27',
    overallScore: 45, riskLevel: 'high', summary: '光电子学理论学习',
    progressAssessment: {
      workloadScore: 45, qualityScore: 45, milestoneAchievement: '稳步推进',
      highlights: ['光电子学理论学习'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '理论学习', severity: 'high', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'high', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['光电子学理论学习'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['理论学习'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a125', personId: 'p1', personName: '严巍',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a126', personId: 'p2', personName: '陈瑞溢',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a127', personId: 'p3', personName: '潘婧',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a128', personId: 'p4', personName: '谢宇',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a129', personId: 'p5', personName: '薛环一',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a130', personId: 'p6', personName: '赵康',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a131', personId: 'p7', personName: '孙歆语',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a132', personId: 'p8', personName: '薛淑雯',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 65, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a133', personId: 'p9', personName: '邵露青',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a134', personId: 'p10', personName: '刘天远',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a135', personId: 'd1', personName: '林春博',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a136', personId: 'd2', personName: '李志浩',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a137', personId: 'd3', personName: '欧玟',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 60, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a138', personId: 'd4', personName: '王旭杰',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 55, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 55, qualityScore: 55, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a139', personId: 'd5', personName: '陈博取',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a140', personId: 'd6', personName: '齐利民',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a141', personId: 'd7', personName: '卢奕含',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a142', personId: 'd8', personName: '孙潇雨',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a143', personId: 'd9', personName: '裴海月',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a144', personId: 'd10', personName: '杨治蓉',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 60, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a145', personId: 'd11', personName: '周子博',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 65, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a146', personId: 'd12', personName: '邓卉彤',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 60, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a147', personId: 'd13', personName: '王启南',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 60, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a148', personId: 'd14', personName: '欧阳祖希',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 60, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a149', personId: 'd15', personName: '马墨南',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a150', personId: 'd16', personName: '李晓萱',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a151', personId: 'd17', personName: '章子鉴',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 55, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 55, qualityScore: 55, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a152', personId: 'd18', personName: '陈飞霖',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a153', personId: 'd19', personName: '虞阳',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a154', personId: 'd20', personName: '郑豪杰',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 55, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 55, qualityScore: 55, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a155', personId: 'd21', personName: '陈代吉',
    weekNumber: 5, weekLabel: '2026.04.03', generatedAt: '2026.04.03',
    overallScore: 45, riskLevel: 'high', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 45, qualityScore: 45, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'high', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'high', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a156', personId: 'p1', personName: '严巍',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a157', personId: 'p2', personName: '陈瑞溢',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a158', personId: 'p3', personName: '潘婧',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a159', personId: 'p4', personName: '谢宇',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a160', personId: 'p5', personName: '薛环一',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a161', personId: 'p6', personName: '赵康',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a162', personId: 'p7', personName: '孙歆语',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a163', personId: 'p8', personName: '薛淑雯',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a164', personId: 'p9', personName: '邵露青',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a165', personId: 'p10', personName: '刘天远',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a166', personId: 'd1', personName: '林春博',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a167', personId: 'd2', personName: '李志浩',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a168', personId: 'd3', personName: '欧玟',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 65, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a169', personId: 'd4', personName: '王旭杰',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 50, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 50, qualityScore: 50, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a170', personId: 'd5', personName: '陈博取',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a171', personId: 'd6', personName: '齐利民',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a172', personId: 'd7', personName: '卢奕含',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a173', personId: 'd8', personName: '孙潇雨',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a174', personId: 'd9', personName: '裴海月',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a175', personId: 'd10', personName: '杨治蓉',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 65, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a176', personId: 'd11', personName: '周子博',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a177', personId: 'd12', personName: '邓卉彤',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 65, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a178', personId: 'd13', personName: '王启南',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 65, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a179', personId: 'd14', personName: '欧阳祖希',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 65, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a180', personId: 'd15', personName: '马墨南',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a181', personId: 'd16', personName: '李晓萱',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a182', personId: 'd17', personName: '章子鉴',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a183', personId: 'd18', personName: '陈飞霖',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a184', personId: 'd19', personName: '虞阳',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a185', personId: 'd20', personName: '郑豪杰',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 55, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 55, qualityScore: 55, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a186', personId: 'd21', personName: '陈代吉',
    weekNumber: 6, weekLabel: '2026.04.10', generatedAt: '2026.04.10',
    overallScore: 45, riskLevel: 'high', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 45, qualityScore: 45, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'high', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'high', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a187', personId: 'p1', personName: '严巍',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a188', personId: 'p2', personName: '陈瑞溢',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a189', personId: 'p3', personName: '潘婧',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a190', personId: 'p4', personName: '谢宇',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 90, riskLevel: 'low', summary: '文章冲刺',
    progressAssessment: {
      workloadScore: 90, qualityScore: 90, milestoneAchievement: '稳步推进',
      highlights: ['文章冲刺'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '文章冲刺', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['文章冲刺'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['文章冲刺'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a191', personId: 'p5', personName: '薛环一',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a192', personId: 'p6', personName: '赵康',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a193', personId: 'p7', personName: '孙歆语',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a194', personId: 'p8', personName: '薛淑雯',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a195', personId: 'p9', personName: '邵露青',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a196', personId: 'p10', personName: '刘天远',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a197', personId: 'd1', personName: '林春博',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a198', personId: 'd2', personName: '李志浩',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a199', personId: 'd3', personName: '欧玟',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 65, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a200', personId: 'd4', personName: '王旭杰',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 55, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 55, qualityScore: 55, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a201', personId: 'd5', personName: '陈博取',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a202', personId: 'd6', personName: '齐利民',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a203', personId: 'd7', personName: '卢奕含',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a204', personId: 'd8', personName: '孙潇雨',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a205', personId: 'd9', personName: '裴海月',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a206', personId: 'd10', personName: '杨治蓉',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 65, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a207', personId: 'd11', personName: '周子博',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a208', personId: 'd12', personName: '邓卉彤',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 65, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a209', personId: 'd13', personName: '王启南',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 65, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a210', personId: 'd14', personName: '欧阳祖希',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 65, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a211', personId: 'd15', personName: '马墨南',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a212', personId: 'd16', personName: '李晓萱',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a213', personId: 'd17', personName: '章子鉴',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a214', personId: 'd18', personName: '陈飞霖',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a215', personId: 'd19', personName: '虞阳',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a216', personId: 'd20', personName: '郑豪杰',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 55, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 55, qualityScore: 55, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a217', personId: 'd21', personName: '陈代吉',
    weekNumber: 7, weekLabel: '2026.04.17', generatedAt: '2026.04.17',
    overallScore: 45, riskLevel: 'high', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 45, qualityScore: 45, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'high', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'high', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a218', personId: 'p1', personName: '严巍',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a219', personId: 'p2', personName: '陈瑞溢',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a220', personId: 'p3', personName: '潘婧',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a221', personId: 'p4', personName: '谢宇',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a222', personId: 'p5', personName: '薛环一',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a223', personId: 'p6', personName: '赵康',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a224', personId: 'p7', personName: '孙歆语',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a225', personId: 'p8', personName: '薛淑雯',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a226', personId: 'p9', personName: '邵露青',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a227', personId: 'p10', personName: '刘天远',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a228', personId: 'd1', personName: '林春博',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 60, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a229', personId: 'd2', personName: '李志浩',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a230', personId: 'd3', personName: '欧玟',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a231', personId: 'd4', personName: '王旭杰',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 50, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 50, qualityScore: 50, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a232', personId: 'd5', personName: '陈博取',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a233', personId: 'd6', personName: '齐利民',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 60, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a234', personId: 'd7', personName: '卢奕含',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a235', personId: 'd8', personName: '孙潇雨',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a236', personId: 'd9', personName: '裴海月',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 65, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a237', personId: 'd10', personName: '杨治蓉',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 60, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a238', personId: 'd11', personName: '周子博',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a239', personId: 'd12', personName: '邓卉彤',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 60, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a240', personId: 'd13', personName: '王启南',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 65, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a241', personId: 'd14', personName: '欧阳祖希',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a242', personId: 'd15', personName: '马墨南',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a243', personId: 'd16', personName: '李晓萱',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 90, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 90, qualityScore: 90, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a244', personId: 'd17', personName: '章子鉴',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a245', personId: 'd18', personName: '陈飞霖',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a246', personId: 'd19', personName: '虞阳',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a247', personId: 'd20', personName: '郑豪杰',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 60, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a248', personId: 'd21', personName: '陈代吉',
    weekNumber: 8, weekLabel: '2026.04.24', generatedAt: '2026.04.24',
    overallScore: 45, riskLevel: 'high', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 45, qualityScore: 45, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'high', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'high', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a249', personId: 'p1', personName: '严巍',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a250', personId: 'p2', personName: '陈瑞溢',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a251', personId: 'p3', personName: '潘婧',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a252', personId: 'p4', personName: '谢宇',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 90, riskLevel: 'low', summary: '文章冲刺',
    progressAssessment: {
      workloadScore: 90, qualityScore: 90, milestoneAchievement: '稳步推进',
      highlights: ['文章冲刺'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '文章冲刺', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['文章冲刺'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['文章冲刺'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a253', personId: 'p5', personName: '薛环一',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a254', personId: 'p6', personName: '赵康',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a255', personId: 'p7', personName: '孙歆语',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a256', personId: 'p8', personName: '薛淑雯',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a257', personId: 'p9', personName: '邵露青',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a258', personId: 'p10', personName: '刘天远',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a259', personId: 'd1', personName: '林春博',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 65, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a260', personId: 'd2', personName: '李志浩',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a261', personId: 'd3', personName: '欧玟',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a262', personId: 'd4', personName: '王旭杰',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 50, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 50, qualityScore: 50, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a263', personId: 'd5', personName: '陈博取',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a264', personId: 'd6', personName: '齐利民',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 60, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a265', personId: 'd7', personName: '卢奕含',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a266', personId: 'd8', personName: '孙潇雨',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a267', personId: 'd9', personName: '裴海月',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a268', personId: 'd10', personName: '杨治蓉',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 65, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a269', personId: 'd11', personName: '周子博',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a270', personId: 'd12', personName: '邓卉彤',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 65, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a271', personId: 'd13', personName: '王启南',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 65, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a272', personId: 'd14', personName: '欧阳祖希',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a273', personId: 'd15', personName: '马墨南',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a274', personId: 'd16', personName: '李晓萱',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 90, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 90, qualityScore: 90, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a275', personId: 'd17', personName: '章子鉴',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a276', personId: 'd18', personName: '陈飞霖',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a277', personId: 'd19', personName: '虞阳',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a278', personId: 'd20', personName: '郑豪杰',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 60, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 60, qualityScore: 60, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a279', personId: 'd21', personName: '陈代吉',
    weekNumber: 9, weekLabel: '2026.04.30', generatedAt: '2026.04.30',
    overallScore: 45, riskLevel: 'high', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 45, qualityScore: 45, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'high', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'high', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a280', personId: 'p1', personName: '严巍',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a281', personId: 'p2', personName: '陈瑞溢',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a282', personId: 'p3', personName: '潘婧',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a283', personId: 'p4', personName: '谢宇',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 90, riskLevel: 'low', summary: '文章冲刺',
    progressAssessment: {
      workloadScore: 90, qualityScore: 90, milestoneAchievement: '稳步推进',
      highlights: ['文章冲刺'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '文章冲刺', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['文章冲刺'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['文章冲刺'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a284', personId: 'p5', personName: '薛环一',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a285', personId: 'p6', personName: '赵康',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a286', personId: 'p7', personName: '孙歆语',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a287', personId: 'p8', personName: '薛淑雯',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a288', personId: 'p9', personName: '邵露青',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a289', personId: 'p10', personName: '刘天远',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 75, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 75, qualityScore: 75, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a290', personId: 'd1', personName: '林春博',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a291', personId: 'd2', personName: '李志浩',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a292', personId: 'd3', personName: '欧玟',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a293', personId: 'd4', personName: '王旭杰',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 55, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 55, qualityScore: 55, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a294', personId: 'd5', personName: '陈博取',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a295', personId: 'd6', personName: '齐利民',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 65, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a296', personId: 'd7', personName: '卢奕含',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a297', personId: 'd8', personName: '孙潇雨',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a298', personId: 'd9', personName: '裴海月',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a299', personId: 'd10', personName: '杨治蓉',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 65, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a300', personId: 'd11', personName: '周子博',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a301', personId: 'd12', personName: '邓卉彤',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a302', personId: 'd13', personName: '王启南',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a303', personId: 'd14', personName: '欧阳祖希',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 70, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 70, qualityScore: 70, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a304', personId: 'd15', personName: '马墨南',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a305', personId: 'd16', personName: '李晓萱',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 90, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 90, qualityScore: 90, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a306', personId: 'd17', personName: '章子鉴',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 80, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 80, qualityScore: 80, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a307', personId: 'd18', personName: '陈飞霖',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a308', personId: 'd19', personName: '虞阳',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 85, riskLevel: 'low', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 85, qualityScore: 85, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'low', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'low', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a309', personId: 'd20', personName: '郑豪杰',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 65, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 65, qualityScore: 65, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
  {
    id: 'a310', personId: 'd21', personName: '陈代吉',
    weekNumber: 10, weekLabel: '2026.05.09', generatedAt: '2026.05.09',
    overallScore: 50, riskLevel: 'medium', summary: '稳步推进',
    progressAssessment: {
      workloadScore: 50, qualityScore: 50, milestoneAchievement: '稳步推进',
      highlights: ['稳步推进'], concerns: []
    },
    problemDiagnosis: {
      bottleneckType: '稳步推进', severity: 'medium', rootCause: '常规研究进展',
      suggestedSolution: '持续推进', estimatedResolveTime: '1-2周'
    },
    pathAnalysis: {
      directionRationality: 80, techRouteRisk: 'medium', frontierComparison: '方向合理',
      competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向'
    },
    actionRecommendations: {
      immediateActions: ['稳步推进'], shortTermGoals: ['完成当前实验'],
      midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论']
    },
    literatureSurvey: { papers: [], topKeywords: ['稳步推进'], fieldTrend: '稳步发展' },
    outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] }
  },
];

export function getLatestAssessment(personId: string): Assessment | undefined {
  const list = MOCK_ASSESSMENTS.filter((a) => a.personId === personId);
  return list.length > 0 ? list[list.length - 1] : undefined;
}

/** 获取最新评估（静态基线 + 动态上传数据合并）
 * 如果动态存储中有更新的数据，用动态数据覆盖静态评估
 */
export function getLatestAssessmentMerged(personId: string, personName?: string): Assessment | undefined {
  // 1. 先获取静态基线
  const staticAssessment = getLatestAssessment(personId);

  // 2. 检查动态存储是否有更新的数据
  try {
    const dynStr = localStorage.getItem('qlab_dynamic_trends') || '{}';
    const dynHistoryStr = localStorage.getItem('qlab_dynamic_history') || '{}';
    const dynLabels = JSON.parse(localStorage.getItem('qlab_dynamic_labels') || '[]') as string[];
    const dynamicTrends = JSON.parse(dynStr) as Record<string, Record<string, { progress: number; problems: number; characterTag: string; summary: string }>>;
    const dynamicHistory = JSON.parse(dynHistoryStr) as Record<string, Record<string, string>>;

    if (dynLabels.length === 0) return staticAssessment;

    // 找到最新的动态标签
    const sortedLabels = [...dynLabels].sort();
    const latestLabel = sortedLabels[sortedLabels.length - 1];

    // 检查该成员是否有动态数据
    const dynWeek = dynamicTrends[latestLabel];
    const personTrend = dynWeek?.[personId] || dynWeek?.[personName || ''];

    if (!personTrend) return staticAssessment;

    // 有动态数据：用动态数据构建/覆盖 assessment
    const progress = personTrend.progress || 70;
    const problems = personTrend.problems || 0;
    // 动态历史保存时用的是 personId，同时尝试 personId 和人名
    const dynHistoryForPerson = dynamicHistory[latestLabel]?.[personId] || dynamicHistory[latestLabel]?.[personName || ''];
    const summary = personTrend.summary || (dynHistoryForPerson || '持续推进科研工作');

    // 计算 score 和 risk（基于 progress 和 problems）
    const overallScore = progress;
    const riskLevel = problems >= 2 ? 'high' : problems >= 1 ? 'medium' : 'low';

    // 如果有静态评估，复制并更新关键字段；否则创建新的
    if (staticAssessment) {
      return {
        ...staticAssessment,
        weekNumber: sortedLabels.length,
        weekLabel: latestLabel,
        generatedAt: latestLabel,
        overallScore,
        riskLevel,
        summary,
        progressAssessment: {
          ...staticAssessment.progressAssessment,
          workloadScore: progress,
          qualityScore: progress,
          highlights: [summary],
        },
        problemDiagnosis: {
          ...staticAssessment.problemDiagnosis,
          severity: riskLevel,
        },
      };
    }

    // 无静态评估，创建新的（简化版）
    return {
      id: `dyn-${personId}-${latestLabel}`,
      personId,
      personName: personName || personId,
      weekNumber: sortedLabels.length,
      weekLabel: latestLabel,
      generatedAt: latestLabel,
      overallScore,
      riskLevel,
      summary,
      progressAssessment: {
        workloadScore: progress, qualityScore: progress, milestoneAchievement: summary,
        highlights: [summary], concerns: problems >= 1 ? ['存在问题需要关注'] : [],
      },
      problemDiagnosis: {
        bottleneckType: '实验推进', severity: riskLevel, rootCause: problems >= 1 ? '遇到困难' : '常规研究进展',
        suggestedSolution: '持续推进', estimatedResolveTime: '1-2周',
      },
      pathAnalysis: {
        directionRationality: 80, techRouteRisk: riskLevel, frontierComparison: '方向合理',
        competitiveness: '中等', adjustmentSuggestion: '持续推进当前方向',
      },
      actionRecommendations: {
        immediateActions: [summary], shortTermGoals: ['完成当前实验'],
        midTermPlan: ['文章撰写'], collaborationSuggestions: ['与导师讨论'],
      },
      literatureSurvey: { papers: [], topKeywords: [summary.slice(0, 20)], fieldTrend: '稳步发展' },
      outcomePrediction: { paperProbability: 70, patentProbability: 30, expectedTimeline: '6个月', recommendedJournals: ['Optics Letters'] },
    };
  } catch {
    return staticAssessment;
  }
}
