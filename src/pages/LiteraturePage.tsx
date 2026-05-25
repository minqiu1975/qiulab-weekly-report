import LiteratureSearch from '../components/LiteratureSearch';
import { BookOpen } from 'lucide-react';

export default function LiteraturePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-600" />
          文献调研
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">搜索研究主题，获取arXiv和Semantic Scholar文献数据</p>
      </div>
      <LiteratureSearch />
    </div>
  );
}
