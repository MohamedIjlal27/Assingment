"use client"

import { Button } from "@/components/ui/button"

export function ExpandButton({ onExpandAll }: { onExpandAll: () => void }) {
  return (
    <Button 
      className="..." 
      onClick={onExpandAll}
    >
      Expand All
    </Button>
  )
} 