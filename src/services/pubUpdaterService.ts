/**
 * 文献数据库更新服务
 *
 * 通过 Semantic Scholar API 获取仇旻教授的最新论文，
 * 与本地数据库合并去重，重新计算合作关系。
 *
 * API 文档：https://api.semanticscholar.org/api-docs/
 */

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  keywords: string[];
  citationCount?: number;
  publicationDate?: string;
  abstract?: string;
  fieldsOfStudy?: string[];
}

export interface CollabNode {
  id: string;
  name: string;
  paperCount: number;
  group: 'core' | 'active' | 'periphery';
}

export interface CollabLink {
  source: string;
  target: string;
  value: number;
}

export interface UpdateResult {
  newPapers: Paper[];
  totalPapers: number;
  updatedNodes: CollabNode[];
  updatedLinks: CollabLink[];
  yearDistribution: Record<number, number>;
}

/** 从论文标题提取中文关键词 */
function extractKeywords(title: string, fieldsOfStudy?: string[]): string[] {
  const keywords: string[] = [];

  // 常见光子学/材料学关键词映射
  const keywordMap: Record<string, string[]> = {
    'metalens': ['metalens', '超透镜'],
    'metasurface': ['metasurface', '超表面'],
    'SiC': ['SiC', '碳化硅'],
    'silicon carbide': ['SiC', '碳化硅'],
    'waveguide': ['waveguide', '光波导'],
    'photonic': ['photonic', '光子'],
    'plasmon': ['plasmon', '等离激元'],
    'perovskite': ['perovskite', '钙钛矿'],
    'thermal': ['thermal', '热'],
    'cooling': ['cooling', '制冷'],
    'laser': ['laser', '激光'],
    'nanofabrication': ['nanofabrication', '纳米加工'],
    'ice lithography': ['ice lithography', '冰刻'],
    'topological': ['topological', '拓扑'],
    'optical': ['optical', '光学'],
    'nano': ['nano', '纳米'],
    'solar': ['solar', '太阳能'],
    'AR': ['AR', '增强现实'],
    'VR': ['VR', '虚拟现实'],
    'radiative': ['radiative', '辐射'],
    'neural': ['neural', '神经'],
  };

  const lowerTitle = title.toLowerCase();
  for (const [en, bilingual] of Object.entries(keywordMap)) {
    if (lowerTitle.includes(en.toLowerCase())) {
      keywords.push(...bilingual);
    }
  }

  // 添加研究领域关键词
  if (fieldsOfStudy) {
    for (const field of fieldsOfStudy) {
      if (!keywords.includes(field)) {
        keywords.push(field);
      }
    }
  }

  return [...new Set(keywords)];
}

/** 重新计算合作关系图 */
function buildCollaborationGraph(papers: Paper[]): { nodes: CollabNode[]; links: CollabLink[] } {
  const authorPapers = new Map<string, Set<number>>();
  const coauthorCount = new Map<string, Map<string, number>>();

  papers.forEach((paper, idx) => {
    const authorList = paper.authors;
    for (const author of authorList) {
      if (!authorPapers.has(author)) authorPapers.set(author, new Set());
      authorPapers.get(author)!.add(idx);
    }
    // 统计合作关系
    for (let i = 0; i < authorList.length; i++) {
      for (let j = i + 1; j < authorList.length; j++) {
        const a = authorList[i];
        const b = authorList[j];
        if (!coauthorCount.has(a)) coauthorCount.set(a, new Map());
        if (!coauthorCount.has(b)) coauthorCount.set(b, new Map());
        const countA = coauthorCount.get(a)!.get(b) || 0;
        coauthorCount.get(a)!.set(b, countA + 1);
        const countB = coauthorCount.get(b)!.get(a) || 0;
        coauthorCount.get(b)!.set(a, countB + 1);
      }
    }
  });

  // 构建 nodes
  const sortedAuthors = Array.from(authorPapers.entries())
    .sort((a, b) => b[1].size - a[1].size);

  const authorToId = new Map<string, string>();
  const nodes: CollabNode[] = sortedAuthors.map(([name, papers], idx) => {
    const id = `author_${idx}`;
    authorToId.set(name, id);
    let group: 'core' | 'active' | 'periphery' = 'periphery';
    if (idx < 8) group = 'core';
    else if (papers.size >= 3) group = 'active';
    return { id, name, paperCount: papers.size, group };
  });

  // 构建 links
  const linkSet = new Set<string>();
  const links: CollabLink[] = [];
  for (const [aName, bMap] of coauthorCount) {
    for (const [bName, count] of bMap) {
      const pairKey = [aName, bName].sort().join('|');
      if (linkSet.has(pairKey)) continue;
      linkSet.add(pairKey);
      const aId = authorToId.get(aName);
      const bId = authorToId.get(bName);
      if (aId && bId) {
        links.push({ source: aId, target: bId, value: count });
      }
    }
  }

  return { nodes, links };
}

/** 核心服务类 */
class PublicationUpdater {
  private baseUrl = 'https://api.semanticscholar.org/graph/v1';
  private minQiuAuthorId: string | null = null;

  /** 搜索仇旻教授（多策略回退） */
  async searchMinQiu(): Promise<{ authorId: string; name: string; paperCount: number } | null> {
    const queries = [
      'Min+Qiu+Westlake',
      'Min+Qiu',
    ];

    for (const query of queries) {
      try {
        const res = await fetch(
          `${this.baseUrl}/author/search?query=${query}&fields=name,affiliations,paperCount,hIndex&limit=100`
        );
        if (!res.ok) continue;
        const data = await res.json();
        if (!data.data || data.data.length === 0) continue;

        // 优先找 affiliations 包含 westlake 的
        for (const author of data.data) {
          const affils = (author.affiliations || []).join(' ').toLowerCase();
          if (affils.includes('westlake') || affils.includes('西湖')) {
            this.minQiuAuthorId = author.authorId;
            return {
              authorId: author.authorId,
              name: author.name,
              paperCount: author.paperCount || 0,
            };
          }
        }

        // 备选：按 paperCount 排序取最高的（paperCount > 50 才可能是仇教授）
        const sorted = [...data.data].sort(
          (a: any, b: any) => (b.paperCount || 0) - (a.paperCount || 0)
        );
        const best = sorted[0];
        if (best && (best.paperCount || 0) > 20) {
          this.minQiuAuthorId = best.authorId;
          return {
            authorId: best.authorId,
            name: best.name,
            paperCount: best.paperCount || 0,
          };
        }
      } catch { /* 继续下一个查询 */ }
    }

    // 如果搜索都失败，使用已知的仇旻教授 authorId 作为硬编码回退
    const knownId = '2058749048'; // Semantic Scholar 上的 Min Qiu (M. Qiu, 154篇)
    try {
      const res = await fetch(
        `${this.baseUrl}/author/${knownId}?fields=name,paperCount,hIndex,affiliations`
      );
      if (res.ok) {
        const author = await res.json();
        this.minQiuAuthorId = knownId;
        return {
          authorId: knownId,
          name: author.name || 'Min Qiu',
          paperCount: author.paperCount || 0,
        };
      }
    } catch { /* ignore */ }

    throw new Error('未找到仇旻教授，请检查网络连接或稍后重试');
  }

  /** 获取仇旻教授的所有论文 */
  async fetchAllPapers(
    onProgress?: (current: number, total: number) => void
  ): Promise<Paper[]> {
    if (!this.minQiuAuthorId) {
      const author = await this.searchMinQiu();
      if (!author) throw new Error('未找到仇旻教授');
    }

    const allPapers: Paper[] = [];
    let offset = 0;
    const limit = 100;
    let total = 0;

    while (true) {
      const res = await fetch(
        `${this.baseUrl}/author/${this.minQiuAuthorId}/papers?` +
        `fields=title,authors,year,citationCount,publicationDate,journal,abstract,fieldsOfStudy&` +
        `limit=${limit}&offset=${offset}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (!data.data || data.data.length === 0) break;

      total = data.total || 0;

      for (const p of data.data) {
        const authors = (p.authors || [])
          .map((a: any) => a.name)
          .filter((n: string) => n);

        const paper: Paper = {
          id: p.paperId || `${p.title?.slice(0, 20)}_${p.year}`,
          title: p.title || 'Untitled',
          authors,
          journal: p.journal?.name || p.publicationDate || '',
          year: p.year || 0,
          keywords: extractKeywords(p.title || '', p.fieldsOfStudy),
          citationCount: p.citationCount || 0,
          publicationDate: p.publicationDate,
          abstract: p.abstract,
          fieldsOfStudy: p.fieldsOfStudy,
        };
        allPapers.push(paper);
      }

      offset += limit;
      onProgress?.(Math.min(offset, total), total);

      if (offset >= total) break;
      // 安全限制，最多500篇
      if (offset >= 500) break;
    }

    onProgress?.(total, total);
    return allPapers;
  }

  /** 与本地论文合并去重 */
  mergeWithLocal(
    remotePapers: Paper[],
    localPapers: Paper[]
  ): { merged: Paper[]; newCount: number } {
    const existingTitles = new Set(
      localPapers.map((p) => p.title.toLowerCase().trim())
    );
    const newPapers: Paper[] = [];

    for (const rp of remotePapers) {
      const titleKey = rp.title.toLowerCase().trim();
      if (!existingTitles.has(titleKey)) {
        newPapers.push(rp);
        existingTitles.add(titleKey);
      }
    }

    // 合并：本地论文保留，新增论文追加
    const merged = [...localPapers, ...newPapers];
    return { merged, newCount: newPapers.length };
  }

  /** 完整更新流程 */
  async updateDatabase(
    localPapers: Paper[],
    onProgress?: (stage: string, current: number, total: number) => void
  ): Promise<UpdateResult> {
    // 1. 搜索作者
    onProgress?.('正在定位仇旻教授...', 0, 100);
    await this.searchMinQiu();

    // 2. 获取论文
    onProgress?.('正在获取论文列表...', 10, 100);
    const remotePapers = await this.fetchAllPapers((c, t) => {
      const pct = t > 0 ? Math.round((c / t) * 70) + 10 : 10;
      onProgress?.(`已获取 ${c}/${t} 篇论文...`, pct, 100);
    });

    // 3. 合并去重
    onProgress?.('正在合并去重...', 80, 100);
    const { merged } = this.mergeWithLocal(remotePapers, localPapers);

    // 4. 重新计算合作关系
    onProgress?.('正在分析合作关系...', 90, 100);
    const { nodes, links } = buildCollaborationGraph(merged);

    // 5. 统计年份分布
    const yearDistribution: Record<number, number> = {};
    for (const p of merged) {
      if (p.year > 0) {
        yearDistribution[p.year] = (yearDistribution[p.year] || 0) + 1;
      }
    }

    onProgress?.('完成！', 100, 100);

    return {
      newPapers: merged.slice(localPapers.length),
      totalPapers: merged.length,
      updatedNodes: nodes,
      updatedLinks: links,
      yearDistribution,
    };
  }

  /** 尝试从实验室网站抓取（可能受 CORS 限制，作为补充） */
  async fetchFromLabWebsite(): Promise<Paper[]> {
    try {
      // 尝试通过 proxy 或直接请求
      await fetch('https://qiu.lab.westlake.edu.cn/publications.html', {
        mode: 'no-cors',
      });
      // no-cors 模式下无法读取响应内容，此方法实际上不可用
      // 返回空数组，依赖 Semantic Scholar
      return [];
    } catch {
      return [];
    }
  }
}

export const pubUpdater = new PublicationUpdater();
