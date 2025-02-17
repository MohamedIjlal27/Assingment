"use client"

import * as React from "react"
import { ChevronDown, ChevronRight, Grid } from "lucide-react"
import { MenuForm } from "@/components/menus/menu-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Sidebar from "@/components/Sidebar"
import { useMenu } from "@/lib/hooks/useMenu"
import { MenuItem } from "@/lib/store/menuSlice"
import { useDispatch } from "react-redux"
import { toggleNode, toggleAllNodes } from "@/lib/store/menuSlice"
import Image from "next/image"
import { AddMenuModal } from "@/components/menus/add-menu-modal"

export default function SystemManagement() {
  const dispatch = useDispatch();
  const {
    items,
    loading,
    error,
    loadMenus,
    createNewMenu,
    addNewMenuItem,
    updateItem,
    deleteItem,
  } = useMenu();
  const [selectedMenu, setSelectedMenu] = React.useState<MenuItem | null>(null);
  const [selectedRootMenu, setSelectedRootMenu] = React.useState<MenuItem | null>(null);
  const [isNewMenuModalOpen, setIsNewMenuModalOpen] = React.useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = React.useState(false);
  const [selectedParentId, setSelectedParentId] = React.useState<string | null>(null);

  React.useEffect(() => {
    loadMenus();
  }, []);

  // Filter root menus (depth === 0)
  const rootMenus = React.useMemo(() => {
    return items.filter(item => item.depth === 0);
  }, [items]);

  // Get the current tree to display (selected root menu and its children)
  const currentTree = React.useMemo(() => {
    if (!selectedRootMenu) return [];
    // Find the current version of the selected root menu from items
    const currentRoot = items.find(item => item.id === selectedRootMenu.id);
    return currentRoot ? [currentRoot] : [];
  }, [selectedRootMenu, items]);

  const handleToggleNode = (nodeId: string) => {
    dispatch(toggleNode(nodeId));
  };

  const handleToggleAllNodes = (expand: boolean) => {
    dispatch(toggleAllNodes(expand));
  };

  const handleAddItem = (parentId: string) => {
    setSelectedParentId(parentId);
    setIsAddItemModalOpen(true);
  };

  const findLastChildInNextLayer = (node: MenuItem): string => {
    // If the node has no children, use this node's ID as parent
    if (!node.children || node.children.length === 0) {
      return node.id;
    }

    // Find the last child that has the next depth level
    const nextDepthChildren = node.children.filter(
      child => child.depth === node.depth + 1
    );

    if (nextDepthChildren.length === 0) {
      return node.id;
    }

    // Get the last child in the next layer
    const lastChild = nextDepthChildren[nextDepthChildren.length - 1];
    return lastChild.id;
  };

  const findParentName = (parentId: string | undefined): string => {
    if (!parentId) return "Root";
    
    const findInTree = (nodes: MenuItem[]): string => {
      for (const node of nodes) {
        if (node.id === parentId) {
          return node.name;
        }
        if (node.children) {
          const found = findInTree(node.children);
          if (found) return found;
        }
      }
      return "Root";
    };

    return findInTree(items);
  };

  const renderTree = (nodes: MenuItem[]) => {
    return nodes.map((node) => (
      <div key={node.id} className="ml-4 relative">
        <div className="flex items-center gap-1 py-1">
          {node.children && node.children.length > 0 ? (
            <button 
              onClick={() => handleToggleNode(node.id)} 
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
            {node.depth !== 0 && <div className="absolute -left-4 top-1/2 w-3 h-px bg-gray-200" />}
          </div>
          <span 
            className="text-sm text-gray-700 cursor-pointer"
            onClick={() => setSelectedMenu(node)}
          >
            {node.name}
          </span>
          {/* Show add button for root items with no children or non-root items */}
          {(node.depth === 0 && (!node.children || node.children.length === 0)) || node.depth > 0 ? (
            <button
              onClick={() => {
                const targetParentId = findLastChildInNextLayer(node);
                handleAddItem(targetParentId);
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Image 
                src="/AddIcon.svg" 
                alt="Add" 
                width={26} 
                height={26}
              />
            </button>
          ) : null}
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
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

          <div className="flex gap-[220px]">
            <div className="w-[400px]">
              <div className="mb-6">
                <Label htmlFor="menu" className="text-gray-500">
                  Menu
                </Label>
                <Select
                  onValueChange={(value) => {
                    const menu = items.find((item) => item.id === value);
                    if (menu) {
                      setSelectedRootMenu(menu);
                      setSelectedMenu(null); // Clear selected menu when changing root menu
                    }
                  }}
                  value={selectedRootMenu?.id}
                >
                  <SelectTrigger className="w-[349px] text-gray-900 h-[52px] bg-[#F9FAFB] border-0 py-4 px-6 text-lg font-normal rounded-[16px]">
                    <SelectValue placeholder="Select menu" />
                  </SelectTrigger>
                  <SelectContent className="w-[349px] max-h-[300px] rounded-[16px] overflow-auto">
                    {rootMenus.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 mb-4">
                <Button
                  variant="default"
                  onClick={() => handleToggleAllNodes(true)}
                  className="bg-[#101828] hover:bg-[#1f2937]"
                >
                  Expand All
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleToggleAllNodes(false)}
                  className="text-gray-700 border-gray-300"
                >
                  Collapse All
                </Button>
                <Button
                  variant="default"
                  onClick={() => setIsNewMenuModalOpen(true)}
                  className="bg-[#253BFF] hover:bg-[#1a2db3]"
                >
                  New Menu
                </Button>
              </div>

              <div className="rounded p-2 w-fit">
                {currentTree.length > 0 ? renderTree(currentTree) : (
                  <div className="text-gray-500">Select a menu to view its structure</div>
                )}
              </div>
            </div>

            <div className="w-[400px]">
              <MenuForm
                selectedMenu={selectedMenu}
                parentName={selectedMenu ? findParentName(selectedMenu.parentId) : undefined}
                onUpdate={(name) => {
                  if (selectedMenu) {
                    updateItem(selectedMenu.id, name);
                  }
                }}
                onDelete={() => {
                  if (selectedMenu) {
                    if (window.confirm("Are you sure you want to delete this menu item?")) {
                      deleteItem(selectedMenu.id);
                      setSelectedMenu(null);
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <AddMenuModal
        isOpen={isNewMenuModalOpen}
        onClose={() => setIsNewMenuModalOpen(false)}
        onSubmit={(name) => createNewMenu(name)}
        title="Create New Menu"
        description="Enter a name for the new root menu."
      />

      <AddMenuModal
        isOpen={isAddItemModalOpen}
        onClose={() => {
          setIsAddItemModalOpen(false);
          setSelectedParentId(null);
        }}
        onSubmit={(name) => {
          if (selectedParentId) {
            const targetParentId = findLastChildInNextLayer(
              items.find(item => item.id === selectedParentId)!
            );
            addNewMenuItem(targetParentId, name);
          }
        }}
        title="Add Menu Item"
        description="Enter a name for the new menu item."
      />
    </div>
  );
}

