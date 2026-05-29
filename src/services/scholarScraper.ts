/**
 * Google Scholar 引用数据抓取服务
 *
 * 由于 Google Scholar 有 CORS 限制，前端直接抓取通常会被阻止。
 * 策略：
 * 1. 优先尝试通过 CORS 代理获取
 * 2. 失败时回退到本地静态数据
 * 3. 提供手动更新入口
 */

export interface ScholarStats {
  allTime: { citations: number; hIndex: number; i10Index: number };
  since2021: { citations: number; hIndex: number; i10Index: number };
}

export interface ScholarCitationData {
  authorId: string;
  name: string;
  affiliation: string;
  homepage: string;
  fields: string[];
  stats: ScholarStats;
  yearlyCitations: Record<string, number>;
  lastUpdated: string;
}

const SCHOLAR_URL = 'https://scholar.google.com/citations';
const AUTHOR_ID = 'FgSUsGoAAAAJ';
const STORAGE_KEY = 'qiulab_scholar_citations';
const STATIC_URL = './scholar_citations.json';

/** 加载本地数据（静态 JSON + localStorage 覆盖） */
export async function loadScholarData(): Promise<ScholarCitationData> {
  // 先加载静态数据
  let data: ScholarCitationData;
  try {
    const res = await fetch(STATIC_URL);
    data = await res.json();
  } catch {
    // 使用内置回退数据
    data = getFallbackData();
  }

  // 检查 localStorage 是否有更新的数据
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as ScholarCitationData;
      // 只接受更近的数据
      if (new Date(parsed.lastUpdated) > new Date(data.lastUpdated)) {
        data = parsed;
      }
    }
  } catch { /* ignore */ }

  return data;
}

/** 尝试从 Google Scholar 抓取最新数据 */
export async function scrapeScholarData(): Promise<ScholarCitationData> {
  const errors: string[] = [];

  // 策略1: 直接 fetch（几乎总会因 CORS 失败）
  try {
    const url = `${SCHOLAR_URL}?user=${AUTHOR_ID}&hl=zh-CN`;
    const res = await fetch(url, { mode: 'no-cors' });
    if (res.ok || res.type === 'opaque') {
      // no-cors 模式下无法读取响应体
      throw new Error('CORS blocked');
    }
  } catch (e: any) {
    errors.push(`Direct fetch: ${e.message}`);
  }

  // 策略2: 通过 corsproxy 代理
  try {
    const proxyUrls = [
      `https://corsproxy.io/?${encodeURIComponent(`${SCHOLAR_URL}?user=${AUTHOR_ID}&hl=zh-CN`)}`,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(`${SCHOLAR_URL}?user=${AUTHOR_ID}&hl=zh-CN`)}`,
    ];

    for (const proxyUrl of proxyUrls) {
      try {
        const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(15000) });
        if (res.ok) {
          const html = await res.text();
          const parsed = parseScholarHtml(html);
          if (parsed.stats.allTime.citations > 0) {
            // 保存到 localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
            return parsed;
          }
        }
      } catch (e: any) {
        errors.push(`Proxy: ${e.message}`);
      }
    }
  } catch { /* ignore */ }

  // 所有策略失败，抛出带提示的错误
  throw new Error(
    'Google Scholar 抓取失败（CORS 限制）。\n' +
    '建议：直接访问 https://scholar.google.com/citations?user=FgSUsGoAAAAJ 查看最新数据。'
  );
}

/** 手动更新数据（用户从 Google Scholar 复制粘贴） */
export function manualUpdate(data: Partial<ScholarCitationData>): ScholarCitationData {
  const existing = getFallbackData();
  const merged: ScholarCitationData = {
    ...existing,
    ...data,
    lastUpdated: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  return merged;
}

/** 解析 Google Scholar HTML */
function parseScholarHtml(html: string): ScholarCitationData {
  // 提取统计数字
  const citationsMatch = html.match(/引用次数[\s\S]*?总计[\s\S]*?(\d+)[\s\S]*?2021\s*年至今[\s\S]*?(\d+)/);
  const hIndexMatch = html.match(/h\s*指数[\s\S]*?(\d+)[\s\S]*?(\d+)/);
  const i10Match = html.match(/i10\s*指数[\s\S]*?(\d+)[\s\S]*?(\d+)/);

  // 提取年度引用数据
  const yearlyCitations: Record<string, number> = {};
  // 寻找年份-引用数对
  const yearPattern = /(\d{4})\s*[\n\r]\s*(\d+)/g;
  let m: RegExpExecArray | null;
  while ((m = yearPattern.exec(html)) !== null) {
    const year = m[1];
    const count = parseInt(m[2], 10);
    if (count > 0 && count < 100000) {
      yearlyCitations[year] = count;
    }
  }

  // 如果从 HTML 中提取失败，尝试从 script 数据中提取
  if (Object.keys(yearlyCitations).length === 0) {
    // Google Scholar 将数据嵌入在页面 JS 中
    const dataMatch = html.match(/var\s+data\s*=\s*(\[\[.*?\]\])/);
    if (dataMatch) {
      try {
        const chartData = JSON.parse(dataMatch[1].replace(/'/g, '"'));
        for (const [year, count] of chartData) {
          yearlyCitations[String(year)] = Number(count);
        }
      } catch { /* ignore */ }
    }
  }

  const allCitations = citationsMatch ? parseInt(citationsMatch[1], 10) : 0;
  const since2021Citations = citationsMatch ? parseInt(citationsMatch[2], 10) : 0;

  return {
    authorId: AUTHOR_ID,
    name: 'Min Qiu',
    affiliation: 'Westlake University',
    homepage: 'https://qiu.lab.westlake.edu.cn',
    fields: ['Nanophotonics', 'SiC Photonics', 'Photonics', 'Optoelectronics', 'Ice Lithography'],
    stats: {
      allTime: {
        citations: allCitations,
        hIndex: hIndexMatch ? parseInt(hIndexMatch[1], 10) : 0,
        i10Index: i10Match ? parseInt(i10Match[1], 10) : 0,
      },
      since2021: {
        citations: since2021Citations,
        hIndex: hIndexMatch ? parseInt(hIndexMatch[2], 10) : 0,
        i10Index: i10Match ? parseInt(i10Match[2], 10) : 0,
      },
    },
    yearlyCitations,
    lastUpdated: new Date().toISOString(),
  };
}

/** 内置回退数据（与 scholar_citations.json 同步） */
function getFallbackData(): ScholarCitationData {
  return {
    authorId: AUTHOR_ID,
    name: 'Min Qiu',
    affiliation: 'Westlake University',
    homepage: 'https://qiu.lab.westlake.edu.cn',
    fields: ['Nanophotonics', 'SiC Photonics', 'Photonics', 'Optoelectronics', 'Ice Lithography'],
    stats: {
      allTime: { citations: 27596, hIndex: 86, i10Index: 300 },
      since2021: { citations: 13116, hIndex: 56, i10Index: 187 },
    },
    yearlyCitations: {
      '2001': 81, '2002': 113, '2003': 187, '2004': 280, '2005': 384,
      '2006': 443, '2007': 414, '2008': 565, '2009': 716, '2010': 684,
      '2011': 725, '2012': 811, '2013': 988, '2014': 1054, '2015': 977,
      '2016': 912, '2017': 1020, '2018': 1221, '2019': 1243, '2020': 1491,
      '2021': 1785, '2022': 1998, '2023': 2343, '2024': 2498, '2025': 3095,
      '2026': 1381,
    },
    lastUpdated: '2025-05-29T08:00:00.000Z',
  };
}
