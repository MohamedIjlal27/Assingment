import { Button } from "@/components/ui/button"

interface TreeControlsProps {
  onExpandAll: () => void
  onCollapseAll: () => void
}

export function TreeControls({ onExpandAll, onCollapseAll }: TreeControlsProps) {
  return (
    <div className="flex gap-2 mb-4">
      <Button variant="default" onClick={onExpandAll} className="bg-[#101828] hover:bg-[#1f2937]">
        Expand All
      </Button>
      <Button variant="outline" onClick={onCollapseAll} className="text-gray-700 border-gray-300">
        Collapse All
      </Button>
    </div>
  )
}

