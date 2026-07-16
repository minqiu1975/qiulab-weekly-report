/**
 * 全局日期上下文
 * 
 * 所有涉及日期计算的地方（prompt构建、AI分析等）必须使用此模块，
 * 确保AI不会凭训练数据猜测错误日期。
 */

/** 获取当前日期（可覆盖用于测试） */
export function getToday(): Date {
  // 如果环境变量指定了测试日期，使用测试日期
  if (typeof window !== 'undefined' && (window as any).__TEST_DATE__) {
    return new Date((window as any).__TEST_DATE__);
  }
  return new Date();
}

/** 当前日期中文字符串（YYYY年M月D日） */
export function getTodayStr(): string {
  const d = getToday();
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

/** 当前日期ISO字符串（YYYY-MM-DD） */
export function getTodayIso(): string {
  return getToday().toISOString().slice(0, 10);
}

/** 当前年月字符串（YYYY年M月） */
export function getYearMonthStr(): string {
  const d = getToday();
  return `${d.getFullYear()}年${d.getMonth() + 1}月`;
}

/** 计算两个日期之间的月份差（目标日期 - 当前日期） */
export function monthsUntil(targetDateStr: string): number {
  const target = new Date(targetDateStr + 'T00:00:00');
  const now = getToday();
  return (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
}

/** 格式化时间信息（用于prompt） */
export function formatTimeInfo(params: {
  graduationDate?: string;
  exitDate?: string;
  contractEndDate?: string;
  programDuration?: number;
  enrollmentYear?: number;
  role: string;
}): { planningInfo: string; planningNote: string } {
  let planningInfo = '';
  let planningNote = '';

  // 博士生：毕业时间计算
  if (params.role === 'phd' && (params.graduationDate || (params.enrollmentYear && params.programDuration))) {
    const gradDateStr = params.graduationDate;
    const fallbackYear = params.enrollmentYear && params.programDuration
      ? params.enrollmentYear + params.programDuration
      : null;
    const gradDate = gradDateStr
      ? new Date(gradDateStr + 'T00:00:00')
      : (fallbackYear ? new Date(fallbackYear, 5, 1) : getToday());
    const gradYear = gradDate.getFullYear();
    const gradMonth = gradDate.getMonth() + 1;
    const m = monthsUntil(gradDateStr || `${fallbackYear}-06-01`);

    if (m < 0) {
      const overdue = Math.abs(m);
      const overdueStr = overdue >= 12 ? `${Math.floor(overdue / 12)}年${overdue % 12}个月` : `${overdue}个月`;
      planningInfo = `\n学制：${params.programDuration || '?'}年制，应${gradYear}年${gradMonth}月毕业，⚠️ 已延毕${overdueStr}`;
      planningNote = '\n【紧急】该人员为博士生，已超期未毕业！评估时必须关注其延毕原因和加速毕业的紧迫性。';
    } else if (m <= 6) {
      planningInfo = `\n学制：${params.programDuration || '?'}年制，预计${gradYear}年${gradMonth}月毕业，⏰ 仅剩${m}个月`;
      planningNote = '\n【注意】该人员为博士生，毕业在即，评估时请关注其毕业冲刺进展。';
    } else {
      planningInfo = `\n学制：${params.programDuration || '?'}年制，预计${gradYear}年${gradMonth}月毕业（还剩${m}个月）`;
      planningNote = '\n【注意】该人员为博士生，评估时请考虑其毕业时间规划。';
    }
  }
  // 博士后：出站时间计算
  else if (params.role === 'postdoc' && params.exitDate) {
    const m = monthsUntil(params.exitDate);
    if (m < 0) {
      const overdue = Math.abs(m);
      const overdueStr = overdue >= 12 ? `${Math.floor(overdue / 12)}年${overdue % 12}个月` : `${overdue}个月`;
      planningInfo = `\n出站日期：${params.exitDate}，⚠️ 已超期${overdueStr}`;
      planningNote = '\n【紧急】该博士后已超期未出站！评估时必须关注超期原因和出站进展。';
    } else if (m <= 6) {
      planningInfo = `\n出站日期：${params.exitDate}，⏰ 仅剩${m}个月`;
      planningNote = '\n【注意】该博士后出站在即，评估时请关注出站冲刺进展。';
    } else {
      planningInfo = `\n出站日期：${params.exitDate}（还剩${m}个月）`;
      planningNote = '\n【注意】该人员为博士后，评估时请考虑其出站规划。';
    }
  }
  // 研究员：合同到期
  else if ((params.role === 'researcher' || params.role === 'associate_researcher' || params.role === 'assistant_researcher') && params.contractEndDate) {
    const m = monthsUntil(params.contractEndDate);
    if (m < 0) {
      const overdue = Math.abs(m);
      const overdueStr = overdue >= 12 ? `${Math.floor(overdue / 12)}年${overdue % 12}个月` : `${overdue}个月`;
      planningInfo = `\n合同到期：${params.contractEndDate}，⚠️ 已过期${overdueStr}`;
      planningNote = '\n【紧急】该研究员合同已过期！评估时必须关注续约进展。';
    } else if (m <= 6) {
      planningInfo = `\n合同到期：${params.contractEndDate}，⏰ 仅剩${m}个月`;
      planningNote = '\n【注意】该研究员合同即将到期，评估时请关注续约进展。';
    } else {
      planningInfo = `\n合同到期：${params.contractEndDate}（还剩${m}个月）`;
    }
  }

  return { planningInfo, planningNote };
}

/** 获取AI系统提示词中必须包含的日期前缀 */
export function getDatePrefix(): string {
  return `【强制要求】当前真实日期是${getTodayStr()}。所有涉及时间、日期、毕业倒计时、出站倒计时、合同到期的计算，必须以此日期为唯一基准。严禁基于训练数据猜测日期。如果用户问"现在""当前""今年"，指的就是${getToday().getFullYear()}年。`;
}
