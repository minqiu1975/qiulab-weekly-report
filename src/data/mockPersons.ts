import type { Person } from '../types';

// ==================== 研究员 (1人) ====================
export const RESEARCHERS: Person[] = [
  { id: 'p1', name: '严巍', role: 'researcher', roleLabel: '研究员', subRole: '研究员', joinDate: '2021-03-15', contractEndDate: '2027-03-14', researchDirection: '等离激元光操控、涡旋光学、微纳波导固态界面光学微操控', status: 'active', lastSeenWeek: '2026.05.09' },
];

// ==================== 副研究员 (0人) ====================
export const ASSOCIATE_RESEARCHERS: Person[] = [
  // 当前无副研究员
];

// ==================== 助理研究员 (6人) ====================
export const ASSISTANT_RESEARCHERS: Person[] = [
  { id: 'p3', name: '谢宇', role: 'assistant_researcher', roleLabel: '助理研究员', subRole: '助理研究员', joinDate: '2022-06-15', researchDirection: 'SiC微槽天线与FIB加工', status: 'active', lastSeenWeek: '2026.05.09' },
  { id: 'p4', name: '邵露青', role: 'assistant_researcher', roleLabel: '助理研究员', subRole: '助理研究员', joinDate: '2023-09-01', researchDirection: '光纤激光直写与TEM分析', status: 'active', lastSeenWeek: '2026.05.09' },
  { id: 'p5', name: '陈瑞溢', role: 'assistant_researcher', roleLabel: '助理研究员', subRole: '助理研究员', joinDate: '2022-01-10', researchDirection: '激光彩钛与TiN防伪', status: 'active', lastSeenWeek: '2026.05.09' },
  { id: 'p6', name: '潘婧', role: 'assistant_researcher', roleLabel: '助理研究员', subRole: '助理研究员', joinDate: '2022-03-01', researchDirection: '光计算与光纤超表面', status: 'active', lastSeenWeek: '2026.05.09' },
  { id: 'p7', name: '薛环一', role: 'assistant_researcher', roleLabel: '助理研究员', subRole: '助理研究员', joinDate: '2022-09-01', researchDirection: '扫描热显微镜与TEM表征', status: 'active', lastSeenWeek: '2026.05.09' },
  { id: 'p8', name: '赵康', role: 'assistant_researcher', roleLabel: '助理研究员', subRole: '助理研究员', joinDate: '2023-01-10', researchDirection: '冰刻技术与生物光子学', status: 'active', lastSeenWeek: '2026.05.09' },
];

// ==================== 博士后 (4人) ====================
export const POSTDOCS: Person[] = [
  { id: 'p9', name: '吕未', role: 'postdoc', roleLabel: '博士后', subRole: '博士后', joinDate: '2023-09-01', exitDate: '2026-08-31', researchDirection: '微纳光子学、光场调控', status: 'active', lastSeenWeek: '2026.05.09' },
  { id: 'p10', name: '孙歆语', role: 'postdoc', roleLabel: '博士后', subRole: '博士后', joinDate: '2023-03-15', exitDate: '2026-03-14', researchDirection: '冰刻剥离与范德华接触', status: 'active', lastSeenWeek: '2026.05.09' },
  { id: 'p11', name: '刘天远', role: 'postdoc', roleLabel: '博士后', subRole: '博士后', joinDate: '2024-01-10', exitDate: '2027-01-09', researchDirection: '随机介质涡旋光学', status: 'active', lastSeenWeek: '2026.05.09' },
  { id: 'x1', name: '薛淑雯', role: 'postdoc', roleLabel: '博士后', subRole: '博士后', joinDate: '2023-06-01', exitDate: '2026-05-31', researchDirection: '消色差超透镜与跨波段成像', status: 'active', lastSeenWeek: '2026.02.12' },
];

// ==================== 博士生 (18人) ====================
export const PHD_STUDENTS: Person[] = [
  { id: 'd1', name: '陈博取', role: 'phd', roleLabel: '博士生', subRole: '2021级', enrollmentYear: 2021, programDuration: 5, graduationDate: '2026-06-30', joinDate: '2021-09-01', researchDirection: 'SiC并行激光加工与可调超表面', status: 'graduated', lastSeenWeek: '2026.05.09' },
  { id: 'd2', name: '卢奕含', role: 'phd', roleLabel: '博士生', subRole: '2021级', enrollmentYear: 2021, programDuration: 5, graduationDate: '2026-06-30', joinDate: '2021-09-01', researchDirection: 'SiC超表面审稿回复', status: 'graduated', lastSeenWeek: '2026.05.09' },
  { id: 'd3', name: '齐利民', role: 'phd', roleLabel: '博士生', subRole: '2021级', enrollmentYear: 2021, programDuration: 5, graduationDate: '2026-06-30', joinDate: '2021-09-01', researchDirection: 'SiC光子学表征', status: 'graduated', lastSeenWeek: '2026.05.09' },
  { id: 'd4', name: '孙潇雨', role: 'phd', roleLabel: '博士生', subRole: '2021级', enrollmentYear: 2021, programDuration: 5, graduationDate: '2026-06-30', joinDate: '2021-09-01', researchDirection: 'SiC微孔制备与毕业论文', status: 'active', lastSeenWeek: '2026.05.09' },
  { id: 'd5', name: '邓卉彤', role: 'phd', roleLabel: '博士生', subRole: '2021级', enrollmentYear: 2021, programDuration: 5, graduationDate: '2026-06-30', joinDate: '2021-09-01', researchDirection: '毕业论文修改与盲审回复', status: 'graduated', lastSeenWeek: '2026.05.09' },
  { id: 'd6', name: '周子博', role: 'phd', roleLabel: '博士生', subRole: '2022级', enrollmentYear: 2022, programDuration: 5, graduationDate: '2026-06-30', joinDate: '2022-09-01', researchDirection: '毕业论文修改与答辩准备', status: 'graduated', lastSeenWeek: '2026.05.09' },
  { id: 'd7', name: '裴海月', role: 'phd', roleLabel: '博士生', subRole: '2022级', enrollmentYear: 2022, programDuration: 5, graduationDate: '2027-06-30', joinDate: '2022-09-01', researchDirection: '低温制冷系统与嵌入式芯片', status: 'active', lastSeenWeek: '2026.05.09' },
  { id: 'd8', name: '杨治蓉', role: 'phd', roleLabel: '博士生', subRole: '2022级', enrollmentYear: 2022, programDuration: 5, graduationDate: '2027-06-30', joinDate: '2022-09-01', researchDirection: '冰刻金属结构与水熊虫光热', status: 'active', lastSeenWeek: '2026.05.09' },
  { id: 'd19', name: '王启南', role: 'phd', roleLabel: '博士生', subRole: '2022级', enrollmentYear: 2022, programDuration: 5, graduationDate: '2027-06-30', joinDate: '2022-09-01', researchDirection: '钙钛矿探测器与TRPL表征', status: 'active', lastSeenWeek: '2026.05.09' },
  { id: 'd9', name: '马墨南', role: 'phd', roleLabel: '博士生', subRole: '2022级', enrollmentYear: 2022, programDuration: 5, graduationDate: '2027-06-30', joinDate: '2022-09-01', researchDirection: 'OTE光热驱动与金片操控', status: 'active', lastSeenWeek: '2026.05.09' },
  { id: 'd10', name: '欧阳祖希', role: 'phd', roleLabel: '博士生', subRole: '2023级', enrollmentYear: 2023, programDuration: 5, graduationDate: '2028-06-30', joinDate: '2023-09-01', researchDirection: '纳米多孔碳与冰刻应用', status: 'active', lastSeenWeek: '2026.05.09' },
  { id: 'd11', name: '李晓萱', role: 'phd', roleLabel: '博士生', subRole: '2023级', enrollmentYear: 2023, programDuration: 5, graduationDate: '2028-06-30', joinDate: '2023-09-01', researchDirection: '金刚石超透镜与冷台设计', status: 'active', lastSeenWeek: '2026.05.09' },
  { id: 'd12', name: '欧玟', role: 'phd', roleLabel: '博士生', subRole: '2023级', enrollmentYear: 2023, programDuration: 5, graduationDate: '2028-06-30', joinDate: '2023-09-01', researchDirection: '柔性有机光伏', status: 'active', lastSeenWeek: '2026.05.09' },
  { id: 'd13', name: '章子鉴', role: 'phd', roleLabel: '博士生', subRole: '2024级', enrollmentYear: 2024, programDuration: 5, graduationDate: '2029-06-30', joinDate: '2024-09-01', researchDirection: 'SiC消色差超透镜与高功率', status: 'active', lastSeenWeek: '2026.05.09' },
  { id: 'd14', name: '李志浩', role: 'phd', roleLabel: '博士生', subRole: '2024级', enrollmentYear: 2024, programDuration: 5, graduationDate: '2029-06-30', joinDate: '2024-09-01', researchDirection: 'SiC超透镜与片上集成', status: 'active', lastSeenWeek: '2026.05.09' },
  { id: 'd15', name: '陈飞霖', role: 'phd', roleLabel: '博士生', subRole: '2025级', enrollmentYear: 2025, programDuration: 5, graduationDate: '2030-06-30', joinDate: '2025-09-01', researchDirection: 'SThM扫描热显微镜', status: 'active', lastSeenWeek: '2026.05.09' },
  { id: 'd16', name: '林春博', role: 'phd', roleLabel: '博士生', subRole: '2025级', enrollmentYear: 2025, programDuration: 5, graduationDate: '2030-06-30', joinDate: '2025-09-01', researchDirection: '电子束力与光操控', status: 'active', lastSeenWeek: '2026.05.09' },
  { id: 'd17', name: '虞阳', role: 'phd', roleLabel: '博士生', subRole: '2025级', enrollmentYear: 2025, programDuration: 5, graduationDate: '2030-06-30', joinDate: '2025-09-01', researchDirection: 'SiC悬臂梁计算光谱仪', status: 'active', lastSeenWeek: '2026.05.09' },
];

// ==================== 本科生 (2人) ====================
export const UNDERGRADUATES: Person[] = [
  { id: 'x3', name: '郑豪杰', role: 'phd', roleLabel: '博士生', subRole: '2026级', enrollmentYear: 2026, programDuration: 5, graduationDate: '2031-06-30', joinDate: '2022-09-01', researchDirection: '本科毕业论文', status: 'active', lastSeenWeek: '2026.05.09' },
  { id: 'x2', name: '王旭杰', role: 'phd', roleLabel: '博士生', subRole: '2026级', enrollmentYear: 2026, programDuration: 5, graduationDate: '2031-06-30', joinDate: '2021-09-01', researchDirection: '冰刻生物机器人与冷冻保存', status: 'active', lastSeenWeek: '2026.02.12' },
];

// ==================== 访问学生 (1人) ====================
export const VISITORS: Person[] = [
  { id: 'x4', name: '陈代吉', role: 'visitor', roleLabel: '访问学生', subRole: '访问学生', joinDate: '2022-09-01', researchDirection: '光电子学理论学习', status: 'active', lastSeenWeek: '2026.05.09' },
];

// ==================== 已出站/已毕业 (0人) ====================
export const ALUMNI: Person[] = [
  // 当前无已出站/已毕业人员（都在各自原类别中）
];

// ==================== 全员汇总 ====================

export const ALL_PERSONS: Person[] = [
  ...RESEARCHERS,
  ...ASSOCIATE_RESEARCHERS,
  ...ASSISTANT_RESEARCHERS,
  ...POSTDOCS,
  ...PHD_STUDENTS,
  ...UNDERGRADUATES,
  ...VISITORS,
  ...ALUMNI,
];

/** 在职人员（不含已出站/已毕业） */
export const ACTIVE_PERSONS: Person[] = ALL_PERSONS.filter(p => p.status !== 'inactive' && p.status !== 'graduated' && p.status !== 'left');

/** 按角色分组的在职人员 */
export const ACTIVE_BY_ROLE = {
  researcher: ACTIVE_PERSONS.filter(p => p.role === 'researcher'),
  associate_researcher: ACTIVE_PERSONS.filter(p => p.role === 'associate_researcher'),
  assistant_researcher: ACTIVE_PERSONS.filter(p => p.role === 'assistant_researcher'),
  postdoc: ACTIVE_PERSONS.filter(p => p.role === 'postdoc'),
  phd: ACTIVE_PERSONS.filter(p => p.role === 'phd'),
  undergraduate: ACTIVE_PERSONS.filter(p => p.role === 'undergraduate'),
  visitor: ACTIVE_PERSONS.filter(p => p.role === 'visitor'),
};

/** 角色中文标签映射 */
export const ROLE_LABEL_MAP: Record<string, string> = {
  researcher: '研究员',
  associate_researcher: '副研究员',
  assistant_researcher: '助理研究员',
  postdoc: '博士后',
  phd: '博士生',
  undergraduate: '本科生',
  visitor: '访问学生',
  alumni: '已出站/已毕业',
};

/** 角色显示顺序 */
export const ROLE_ORDER = [
  'researcher',
  'associate_researcher',
  'assistant_researcher',
  'postdoc',
  'phd',
  'undergraduate',
  'visitor',
];

/** 入学年份选项（2020-2035） */
export const ENROLLMENT_YEAR_OPTIONS = Array.from({ length: 16 }, (_, i) => 2020 + i);

/** 按角色和入学年份分组显示用的标签
 * subRole 存年份如 "2025级" 或 "已毕业(2022级)"，显示时由本函数组合
 */
export function getPersonDisplayLabel(person: Person): string {
  // 博士生/本科生：roleLabel + (subRole) 如 "博士生(2025级)"
  if ((person.role === 'phd' || person.role === 'undergraduate') && person.subRole) {
    return `${person.roleLabel}(${person.subRole})`;
  }
  // 其他角色返回 subRole 或映射标签
  return person.subRole || ROLE_LABEL_MAP[person.role] || person.roleLabel;
}

export const getPersonById = (id: string): Person | undefined =>
  ALL_PERSONS.find((p) => p.id === id);

export const getPersonRiskLevel = (personId: string): 'low' | 'medium' | 'high' => {
  const seed = personId.charCodeAt(1) + (personId.charCodeAt(0) || 0);
  if (seed % 5 === 0) return 'high';
  if (seed % 3 === 0) return 'medium';
  return 'low';
};

// ==================== SettingsPage 用默认成员 ====================

/** TeamMember 接口（与 SettingsPage 一致） */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleLabel: string;
  subRole: string;
  researchDirection: string;
  status: string;
  joinDate: string;
  group: string;
  enrollmentYear?: number;
  programDuration?: number;
  exitDate?: string;
  contractEndDate?: string;
  graduationDate?: string;
}

/** 将 Person 转换为 TeamMember（用于 SettingsPage 默认数据） */
function personToTeamMember(person: Person): TeamMember {
  return {
    id: person.id,
    name: person.name,
    role: person.role,
    roleLabel: person.roleLabel,
    subRole: person.subRole || '',
    researchDirection: person.researchDirection,
    status: person.status,
    joinDate: person.joinDate,
    group: person.role === 'alumni' ? 'alumni' : person.role,
    enrollmentYear: person.enrollmentYear,
    programDuration: person.programDuration,
    exitDate: person.exitDate,
    contractEndDate: person.contractEndDate,
    graduationDate: person.graduationDate,
  };
}

/** SettingsPage 默认成员（从 ALL_PERSONS 自动生成，确保 ID 完全一致） */
export const DEFAULT_SETTINGS_MEMBERS: TeamMember[] = ALL_PERSONS.map(personToTeamMember);
