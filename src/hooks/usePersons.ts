import { useState, useEffect } from 'react';
import type { Person } from '../types';
import { ALL_PERSONS as STATIC_PERSONS } from '../data/mockPersons';
import { cloudStorage } from '../services/cloudStorage';

// v5: 强制清除所有旧缓存，使用与 ALL_PERSONS 完全一致的 ID
const STORAGE_KEY = 'qlab_persons_v5';

/** TeamMember 的简化类型（与 SettingsPage 中保存的格式匹配） */
interface StoredMember {
  id: string;
  name: string;
  role: string;
  roleLabel: string;
  subRole: string;
  researchDirection: string;
  status: string;
  joinDate?: string;
  enrollmentYear?: number;
  programDuration?: number;
  exitDate?: string;
  contractEndDate?: string;
  graduationDate?: string;
  collabSuggestions?: Record<string, {
    partnerName: string;
    result: string;
    timestamp: string;
  }>;
}

/** 从 localStorage 读取编辑后的人员数据，合并到静态数据 */
function mergeWithLocalStorage(staticPersons: Person[]): Person[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return staticPersons;

    const storedMembers: StoredMember[] = JSON.parse(raw);
    if (!Array.isArray(storedMembers) || storedMembers.length === 0) return staticPersons;
    const storedMap = new Map(storedMembers.map((m) => [m.id, m]));

    return staticPersons.map((p) => {
      const stored = storedMap.get(p.id);
      if (!stored) return p;
      return {
        ...p,
        name: stored.name ?? p.name,
        role: (stored.role as Person['role']) || p.role,
        roleLabel: stored.roleLabel ?? p.roleLabel,
        subRole: stored.subRole ?? p.subRole,
        joinDate: stored.joinDate ?? p.joinDate,
        enrollmentYear: stored.enrollmentYear ?? p.enrollmentYear,
        programDuration: stored.programDuration ?? p.programDuration,
        exitDate: stored.exitDate ?? p.exitDate,
        contractEndDate: stored.contractEndDate ?? p.contractEndDate,
        graduationDate: stored.graduationDate ?? p.graduationDate,
        researchDirection: stored.researchDirection ?? p.researchDirection,
        status: (stored.status as Person['status']) || p.status,
        collabSuggestions: stored.collabSuggestions ?? p.collabSuggestions,
      };
    });
  } catch {
    return staticPersons;
  }
}

/**
 * 使用同步后的人员数据。
 * 自动从 localStorage 读取 SettingsPage 的编辑结果，合并到静态数据中。
 * 云端模式下会从云端优先加载数据。
 * 所有页面应使用此 Hook 替代直接导入 ALL_PERSONS。
 */
export function usePersons(): Person[] {
  const [persons, setPersons] = useState<Person[]>(() =>
    mergeWithLocalStorage(STATIC_PERSONS)
  );

  useEffect(() => {
    // 从云端加载（loadAllData 内部已做本地优先合并并保存到 localStorage）
    cloudStorage.loadAllData().then(() => {
      // loadAllData 已将合并后的数据保存到 localStorage，直接刷新
      setPersons(mergeWithLocalStorage(STATIC_PERSONS));
    }).catch(() => {
      // 云端加载失败，使用本地数据
      setPersons(mergeWithLocalStorage(STATIC_PERSONS));
    });

    // 监听 localStorage 变化（同一标签页内的同步）
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setPersons(mergeWithLocalStorage(STATIC_PERSONS));
      }
    };
    window.addEventListener('storage', handleStorage);

    // 监听自定义事件（同一标签页内 SettingsPage 保存后触发）
    const handleCustom = () => {
      setPersons(mergeWithLocalStorage(STATIC_PERSONS));
    };
    window.addEventListener('qlab-persons-updated', handleCustom);

    // 监听云端数据变化
    const unsubscribe = cloudStorage.onDataChange(() => {
      setPersons(mergeWithLocalStorage(STATIC_PERSONS));
    });

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('qlab-persons-updated', handleCustom);
      unsubscribe();
    };
  }, []);

  return persons;
}

/**
 * 非 Hook 版本，用于组件外部或 PdfReportGenerator 等独立场景。
 * 直接读取 localStorage 并合并静态数据。
 */
export function getSyncedPersons(): Person[] {
  return mergeWithLocalStorage(STATIC_PERSONS);
}

/**
 * 触发全局人员数据更新事件。
 * SettingsPage 保存后应调用此函数通知所有页面刷新。
 */
export function notifyPersonsUpdated(): void {
  window.dispatchEvent(new CustomEvent('qlab-persons-updated'));
}
