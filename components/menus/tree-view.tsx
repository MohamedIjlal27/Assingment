"use client"

import { useDispatch, useSelector } from "react-redux"
import { ChevronDown, ChevronRight, Plus } from "lucide-react"
import { MenuItem, toggleNode } from "@/lib/store/menuSlice"
import { RootState } from "@/lib/store"

interface TreeViewProps {
  onAddClick?: (parentId: string) => void;
}

export function TreeView({ onAddClick }: TreeViewProps) {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.menu.items);

  const handleToggle = (nodeId: string) => {
    dispatch(toggleNode(nodeId));
  };

  const renderTree = (nodes: MenuItem[]) => {
    return nodes.map((node) => (
      <div key={node.id} className="ml-4 relative">
        <div className="flex items-center gap-1 py-1">
          {node.children && node.children.length > 0 ? (
            <button 
              onClick={() => handleToggle(node.id)} 
              className="p-0.5 hover:bg-gray-100 rounded"
            >
              {node.isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-400" />
              )}
            </button>
          ) : (
            <div className="w-5" />
          )}
          <div className="relative">
            {node.id !== "1" && <div className="absolute -left-4 top-1/2 w-3 h-px bg-gray-200" />}
          </div>
          <span className="text-sm text-gray-700">{node.name}</span>
          <button 
            onClick={() => onAddClick?.(node.id)}
            className="p-0.5 hover:bg-gray-100 rounded"
          >
            <Plus className="h-4 w-4 text-[#253BFF]" />
          </button>
        </div>
        {node.isExpanded && node.children && (
          <div className="relative">
            <div className="absolute left-[9px] top-0 bottom-0 w-px bg-gray-200" />
            {renderTree(node.children)}
          </div>
        )}
      </div>
    ));
  };

  return <div className="border rounded-lg p-4">{renderTree(items)}</div>;
}

