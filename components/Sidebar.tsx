"use client"

import React from 'react'
import { useState } from "react"
import Image from "next/image"
import { Grid } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store"
import { MenuItem } from "@/lib/store/menuSlice"

// Import icons
import MenuIcon from "@/public/MenuIcon.svg"
import FolderIcon from "@/public/Folder.svg"
import UnselectedFolderIcon from "@/public/UnselectedFolder.svg"

export interface SidebarItemControl {
  text: string
  icon: React.ReactElement
  isMainMenu?: boolean
  parentName?: string
}

function convertMenuItemsToSidebarControls(menuItems: MenuItem[]): SidebarItemControl[] {
  const result: SidebarItemControl[] = [];
  
  menuItems.forEach(item => {
    // Add the main menu item
    result.push({
      text: item.name,
      icon: <Image src={FolderIcon} alt="Folder" width={20} height={20} />,
      isMainMenu: true
    });
    
    // Add children only if the main menu is expanded
    if (item.children) {
      item.children.forEach(child => {
        result.push({
          text: child.name,
          icon: <Grid />,
          parentName: item.name
        });
        
        // Add grandchildren
        if (child.children) {
          child.children.forEach(grandChild => {
            result.push({
              text: grandChild.name,
              icon: <Grid />,
              parentName: item.name
            });
          });
        }
      });
    }
  });
  
  return result;
}

function NavItem({
  item,
  onClick,
  isActive,
  isSubMenuActive,
  isInActiveGroup,
}: {
  item: SidebarItemControl;
  onClick?: () => void;
  isActive?: boolean;
  isSubMenuActive?: boolean;
  isInActiveGroup?: boolean;
}) {
  // Determine background and text colors based on state and item type
  const getStyles = () => {
    if (isInActiveGroup) {
      return "bg-[#1D2939] text-white";
    }
    if (!item.isMainMenu && isActive) {
      return "bg-[#9FF443] text-black";
    }
    return "text-[#667085]";
  };

  return (
    <button
      className={`
        flex items-center gap-3 w-full px-3 py-2 text-sm
        ${getStyles()}
        ${item.isMainMenu ? "hover:bg-[#1D2939] hover:text-white" : "hover:bg-[#9FF443] hover:text-black"}
        transition-colors duration-200
        ${isInActiveGroup ? "" : "rounded-lg"}
      `}
      onClick={onClick}
    >
      <span className="flex items-center">
        {item.isMainMenu ? (
          <Image 
            src={isInActiveGroup ? FolderIcon : UnselectedFolderIcon} 
            alt="Folder" 
            width={20} 
            height={20} 
          />
        ) : (
          React.cloneElement(item.icon, {
            className: isActive ? "text-black" : isInActiveGroup ? "text-white" : "text-[#667085]",
          })
        )}
      </span>
      <span>
        {item.text}
      </span>
    </button>
  )
}

export default function Sidebar() {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activeMainMenu, setActiveMainMenu] = useState<string | null>(null);
  
  // Get menu items from Redux store
  const menuItems = useSelector((state: RootState) => state.menu.items);

  const handleItemClick = (item: SidebarItemControl) => {
    if (item.isMainMenu) {
      // Toggle expanded state for main menu
      setExpandedMenu(expandedMenu === item.text ? null : item.text);
      setActiveMainMenu(item.text);
      setActiveItem(item.text);
    } else {
      // Handle submenu click - keep the main menu selected
      setActiveItem(item.text);
    }
  };

  // Filter items based on expanded state
  const visibleItems = convertMenuItemsToSidebarControls(menuItems).filter(item => 
    item.isMainMenu || // Always show main menus
    (item.parentName && item.parentName === expandedMenu) // Show submenu items only if parent is expanded
  );

  // Group items by their parent menu
  const groupedItems: { [key: string]: SidebarItemControl[] } = {};
  visibleItems.forEach(item => {
    if (item.isMainMenu) {
      groupedItems[item.text] = [item];
    } else if (item.parentName) {
      if (groupedItems[item.parentName]) {
        groupedItems[item.parentName].push(item);
      }
    }
  });

  return (
    <div className="p-4">
      <div className="w-[240px] h-[1032px] bg-[#101828] text-gray-300 p-4 rounded-[24px]">
        <div className="flex items-center justify-between mb-8">
          <span className="text-white font-semibold">CLOIT</span>
          <button className="p-1.5 hover:bg-gray-800 rounded">
            <Image src={MenuIcon} alt="Menu" width={20} height={20} />
          </button>
        </div>
        <nav className="space-y-1">
          {Object.entries(groupedItems).map(([mainMenu, items]) => (
            <div 
              key={mainMenu}
              className={`
                overflow-hidden rounded-lg
                ${expandedMenu === mainMenu ? "mb-1" : ""}
              `}
            >
              {items.map((item, index) => (
                <NavItem
                  key={item.text}
                  item={item}
                  isActive={item.isMainMenu ? activeMainMenu === item.text : activeItem === item.text}
                  isSubMenuActive={activeItem === item.text && !item.isMainMenu}
                  isInActiveGroup={expandedMenu === mainMenu}
                  onClick={() => handleItemClick(item)}
                />
              ))}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}