import React from 'react';
import { Badge } from '@/components/ui/badge';

interface VerdictPillProps {
  verdict: string;
  confidence: number;
}

const VerdictPill: React.FC<VerdictPillProps> = ({ verdict, confidence }) => {
  const getVerdictConfig = (verdict: string) => {
    const map: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      true: { label: "Likely True", variant: "default" },
      false: { label: "Likely False", variant: "destructive" },
      mixed: { label: "Mixed", variant: "secondary" },
      undetermined: { label: "Undetermined", variant: "outline" },
      "True": { label: "True", variant: "default" },
      "Mostly True": { label: "Mostly True", variant: "default" },
      "Misleading": { label: "Misleading", variant: "destructive" },
      "Partially False": { label: "Partially False", variant: "destructive" },
      "Partially Verified": { label: "Partially Verified", variant: "secondary" },
      "False": { label: "False", variant: "destructive" },
      "Unclear": { label: "Unclear", variant: "outline" },
      "Not Found": { label: "Not Found", variant: "outline" },
    };
    return map[verdict] || map.undetermined;
  };

  const config = getVerdictConfig(verdict);
  
  return (
    <div className="flex items-center gap-3 mb-4">
      <Badge variant={config.variant} className="text-sm font-medium px-3 py-1">
        {config.label}
      </Badge>
      <div className="text-sm text-muted-foreground">
        Confidence: {confidence?.toFixed ? confidence.toFixed(2) : (confidence * 100).toFixed(0)}%
      </div>
    </div>
  );
};

export default VerdictPill;