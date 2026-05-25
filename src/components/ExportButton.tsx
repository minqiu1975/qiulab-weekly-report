import { useState } from 'react';
import { Button } from './ui/button';
import { Check, FileDown } from 'lucide-react';

interface Props {
  label?: string;
  fileName?: string;
  data?: Record<string, unknown>;
}

export default function ExportButton({
  label = '导出数据',
  fileName = 'export.json',
  data,
}: Props) {
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    const exportData = data || { exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      className="gap-1"
    >
      {exported ? (
        <Check className="w-4 h-4 text-emerald-500" />
      ) : (
        <FileDown className="w-4 h-4" />
      )}
      {exported ? '已导出' : label}
    </Button>
  );
}
