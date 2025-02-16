"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Plus } from "lucide-react"
import type { TreeNode } from "@/types"

interface TreeViewProps {
  initialData: TreeNode[]
}

export function TreeView({ initialData }: TreeViewProps) {
  const [tree, setTree] = useState<TreeNode[]>(initialData)

  const toggleNode = (nodeId: string) => {
    const toggleNodeRecursive = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, isExpanded: !node.isExpanded }
        }
        if (node.children) {
          return { ...node, children: toggleNodeRecursive(node.children) }
        }
        return node
      })
    }
    setTree(toggleNodeRecursive(tree))
  }

  const renderTree = (nodes: TreeNode[]) => {
    return nodes.map((node) => (
      <div key={node.id} className="ml-4 relative">
        <div className="flex items-center gap-1 py-1">
          {node.children && node.children.length > 0 ? (
            <button onClick={() => toggleNode(node.id)} className="p-0.5 hover:bg-gray-100 rounded">
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
          <span className="text-sm text-gray-700">{node.label}</span>
          {node.label === "System Code" && <Plus className="h-4 w-4 text-[#253BFF] ml-1" />}
        </div>
        {node.isExpanded && node.children && (
          <div className="relative">
            <div className="absolute left-[9px] top-0 bottom-0 w-px bg-gray-200" />
            {renderTree(node.children)}
          </div>
        )}
      </div>
    ))
  }

  return <div className="border rounded-lg p-4">{renderTree(tree)}</div>
}

