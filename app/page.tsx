"use client"

import * as React from "react"
import { ChevronDown, ChevronRight, Grid, LayoutGrid, Menu, Plus, Settings, Users } from "lucide-react"
import { MenuForm } from "@/components/menus/menu-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Sidebar from "@/components/Sidebar"

interface TreeNode {
  id: string
  label: string
  children?: TreeNode[]
  isExpanded?: boolean
}

const initialTree: TreeNode[] = [
  {
    id: "1",
    label: "system management",
    children: [
      {
        id: "2",
        label: "System Management",
        children: [
          {
            id: "3",
            label: "Systems",
            children: [],
          },
          {
            id: "4",
            label: "System Code",
            children: [
              {
                id: "5",
                label: "Code Registration",
                children: [],
              },
            ],
          },
          {
            id: "6",
            label: "Code Registration - 2",
            children: [],
          },
          {
            id: "7",
            label: "Properties",
            children: [],
          },
          {
            id: "8",
            label: "Menus",
            children: [
              {
                id: "9",
                label: "Menu Registration",
                children: [],
              },
            ],
          },
          {
            id: "10",
            label: "API List",
            children: [
              {
                id: "11",
                label: "API Registration",
                children: [],
              },
              {
                id: "12",
                label: "API Edit",
                children: [],
              },
            ],
          },
          {
            id: "13",
            label: "Users & Groups",
            children: [
              {
                id: "14",
                label: "Users",
                children: [
                  {
                    id: "15",
                    label: "User Account Registration",
                    children: [],
                  },
                ],
              },
              {
                id: "16",
                label: "Groups",
                children: [
                  {
                    id: "17",
                    label: "User Group Registration",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: "18",
            label: "사용자 승인",
            children: [
              {
                id: "19",
                label: "사용자 승인 상세",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
]

export default function SystemManagement() {
  const [tree, setTree] = React.useState<TreeNode[]>(initialTree)
  const [expandAll, setExpandAll] = React.useState(false)
  const [formData, setFormData] = React.useState({
    menuId: "56320ee9-6af6-11ed-a7ba-f220afe5e4a9",
    depth: "3",
    parentData: "Systems",
    name: "System Code",
  })

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

  const toggleAllNodes = (expand: boolean) => {
    const toggleAllRecursive = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map((node) => {
        if (node.children) {
          return {
            ...node,
            isExpanded: expand,
            children: toggleAllRecursive(node.children),
          }
        }
        return node
      })
    }
    setTree(toggleAllRecursive(tree))
    setExpandAll(expand)
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

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      {/* Main Content */}
      <div className="overflow-hidden h-full">
        <div className="p-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span>Menus</span>
          </div>
          <div className="flex items-center gap-2 mb-8">
            <div className="p-2 bg-blue-600 rounded">
              <Grid className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-semibold">Menus</h1>
          </div>

          {/* Updated layout: Flex container for tree and form */}
          <div className="flex gap-[220px]">
            {/* Left side: Tree view */}
            <div className="w-[400px]">
              <div className="mb-6">
                <Label htmlFor="menu" className="text-gray-500">
                  Menu
                </Label>
                <Select defaultValue="system-management">
                  <SelectTrigger className="w-[349px] text-gray-900 h-[52px] bg-[#F9FAFB] border-0 py-4 px-6 text-lg font-normal rounded-[16px]">
                    <SelectValue placeholder="Select menu" />
                  </SelectTrigger>
                  <SelectContent className="w-[349px] h-[52px] rounded-[16px]">
                    <SelectItem value="system-management">system management</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 mb-4">
                <Button variant="default" onClick={() => toggleAllNodes(true)} className="bg-[#101828] hover:bg-[#1f2937]">
                  Expand All
                </Button>
                <Button variant="outline" onClick={() => toggleAllNodes(false)} className="text-gray-700 border-gray-300">
                  Collapse All
                </Button>
              </div>

              <div className="rounded p-2 w-fit">
                {renderTree(tree)}
              </div>
            </div>

            {/* Right side: Menu form */}
            <div className="w-[400px]">
              <MenuForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

