import type { Person } from '../types';
import { getPersonRiskLevel } from '../data/mockPersons';
import { User, Microscope, GraduationCap } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

interface Props {
  person: Person;
  onClick?: (person: Person) => void;
}

/** 将角色类别转为缩写，确保在窄空间内完整显示 */
function getRoleAbbreviation(subRole?: string): string {
  if (!subRole) return '';
  const map: Record<string, string> = {
    '研究员': '研究员',
    '副研究员': '副研',
    '助理研究员': '助研',
    '博士后': '博后',
    '博士生(毕业生)': '毕业生',
    '博士生(高年级)': '高年级',
    '博士生(低年级)': '低年级',
    '本科生': '本科生',
    '访问人员': '访问',
  };
  return map[subRole] || subRole;
}

export default function PersonStatusCard({ person, onClick }: Props) {
  const riskLevel = getPersonRiskLevel(person.id);

  const statusConfig = {
    low: { bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-500', text: 'text-emerald-700', label: '正常' },
    medium: { bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500', text: 'text-amber-700', label: '有风险' },
    high: { bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500', text: 'text-red-700', label: '高风险' },
  };

  const config = statusConfig[riskLevel];
  const RoleIcon = person.role === 'phd' ? GraduationCap : person.role === 'postdoc' ? Microscope : User;
  const roleAbbr = getRoleAbbreviation(person.subRole);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={() => onClick?.(person)}
          className={`w-full text-left rounded-lg border ${config.border} ${config.bg} p-3 transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]`}
        >
          {/* 第一行：图标 + 名字（不截断） + 角色缩写 + 状态 */}
          <div className="flex items-center gap-2 min-w-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${config.bg === 'bg-emerald-50' ? 'bg-emerald-100' : config.bg === 'bg-amber-50' ? 'bg-amber-100' : 'bg-red-100'}`}>
              <RoleIcon className={`w-4 h-4 ${config.text}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center flex-wrap gap-x-1.5 gap-y-0.5">
                {/* 名字：绝对不允许截断 */}
                <span className="font-medium text-sm text-slate-800 whitespace-nowrap">{person.name}</span>
                {/* 角色缩写 */}
                {roleAbbr && (
                  <span className="text-[10px] px-1 py-0.5 rounded bg-slate-200/70 text-slate-500 whitespace-nowrap">
                    {roleAbbr}
                  </span>
                )}
              </div>
              {/* 研究方向：允许截断 */}
              <div className="text-[11px] text-slate-500 truncate">{person.researchDirection}</div>
            </div>
            {/* 状态指示器：固定宽度，不压缩 */}
            <div className="flex items-center gap-1 flex-shrink-0 self-start mt-0.5">
              <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
              <span className={`text-[10px] font-medium ${config.text} whitespace-nowrap hidden sm:inline`}>{config.label}</span>
            </div>
          </div>
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={4} className="max-w-[240px]">
        <div className="space-y-1">
          <p className="font-medium text-xs">{person.name} · {roleAbbr}</p>
          <p className="text-[11px] opacity-90">{person.researchDirection}</p>
          <p className="text-[10px] opacity-70">状态: {config.label}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
