import type { LiteratureItem } from '../types';

/**
 * PAINT Lab (Photonics And Instrumentation for NanoTechnology)
 * 仇旻实验室 - 西湖大学工学院
 * 发表论文数据，来源: https://qiu.lab.westlake.edu.cn/ky/fblw.htm
 * 数据通过public/papers.json动态加载，此文件保留搜索函数
 */

/**
 * 搜索文献 - 同时匹配英文标题、中文标题、作者、期刊和关键词
 */
export function searchLiterature(query: string, allPapers: LiteratureItem[]): LiteratureItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return allPapers;

  return allPapers
    .filter((item) => {
      if (item.title.toLowerCase().includes(q)) return true;
      if ((item as any).zhTitle?.includes(q)) return true;
      if (item.authors.some((a: string) => a.toLowerCase().includes(q))) return true;
      if (item.source?.toLowerCase().includes(q)) return true;
      if ((item as any).keywords?.some((kw: string) => kw.toLowerCase().includes(q))) return true;
      if (item.abstract?.toLowerCase().includes(q)) return true;
      return false;
    })
    .sort((a, b) => ((b as any).relevanceScore || 0) - ((a as any).relevanceScore || 0));
}

/**
 * 获取所有唯一关键词
 */
export function getAllKeywords(allPapers: LiteratureItem[]): string[] {
  const keywords = new Set<string>();
  allPapers.forEach((item: any) => {
    (item.keywords || []).forEach((kw: string) => {
      if (/[\u4e00-\u9fff]/.test(kw)) keywords.add(kw);
    });
  });
  return Array.from(keywords);
}
