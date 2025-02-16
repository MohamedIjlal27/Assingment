import type React from "react"
export interface TreeNode {
  id: string
  label: string
  children?: TreeNode[]
  isExpanded?: boolean
}

export interface NavItemProps {
  icon: React.ElementType
  label: string
  isActive?: boolean
  isHighlighted?: boolean
}

export interface FormData {
  menuId: string
  depth: string
  parentData: string
  name: string
}

