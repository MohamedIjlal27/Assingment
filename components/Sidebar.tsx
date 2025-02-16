"use client"

import React from 'react'
import { useState } from "react"
import Image from "next/image"
import { LayoutGrid, Grid, Settings, Users, Menu } from "lucide-react"

// Import icons
import FolderIcon from "@/public/Folder.svg"
import UnselectedFolderIcon from "@/public/UnselectedFolder.svg"
import MenuIcon from "@/public/MenuIcon.svg"

export interface SidebarItemControl {
  text: string
  icon: React.ReactElement
  link?: string
  external?: boolean
  subItems?: SidebarItemControl[]
}

export function useSidebarItemControls(): SidebarItemControl[] {
  return [
    {
      text: "Systems",
      icon: <Image src={FolderIcon} alt="Folder" width={20} height={20} />,
      subItems: [
        { text: "System Code", icon: <Grid /> },
        { text: "Properties", icon: <Settings /> },
        { text: "Menus", icon: <Grid /> },
        { text: "API List", icon: <Grid /> },
      ],
    },
    {
      text: "Users & Group",
      icon: <Image src={FolderIcon} alt="Folder" width={20} height={20} />,
    },
    {
      text: "Competition",
      icon: <Image src={FolderIcon} alt="Folder" width={20} height={20} />,
    },
  ]
}

function NavItem({
  item,
  onClick,
  isActive,
  isSubMenuActive,
}: {
  item: SidebarItemControl;
  onClick?: () => void;
  isActive?: boolean;
  isSubMenuActive?: boolean;
}) {
  return (
    <button
      className={`
        flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm
        ${isSubMenuActive ? "bg-[#9ff443] text-black" : "text-[#667085] hover:bg-gray-800"}
      `}
      onClick={onClick}
    >
      <span className="flex items-center">
        {React.cloneElement(item.icon, {
          className: isActive ? "text-white" : "text-[#667085]",
        })}
      </span>
      <span className={isActive ? "text-white" : "opacity-90"}>{item.text}</span>
    </button>
  )
}

export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null)
  const sidebarItems = useSidebarItemControls()

  const handleMenuClick = (itemText: string, subItems?: SidebarItemControl[]) => {
    setActiveMenu(activeMenu === itemText ? null : itemText)
  }

  const handleSubMenuClick = (subItemText: string) => {
    setActiveSubMenu(activeSubMenu === subItemText ? null : subItemText);
  }

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
          {sidebarItems.map((item) => (
            <div key={item.text}>
              <NavItem
                item={{
                  ...item,
                  icon: activeMenu === item.text ? item.icon : <Image src={UnselectedFolderIcon} alt="Unselected Folder" width={20} height={20} />
                }}
                isActive={activeMenu === item.text}
                onClick={() => handleMenuClick(item.text, item.subItems)}
              />
              {activeMenu === item.text && item.subItems && (
                <div className="space-y-1">
                  {item.subItems.map((subItem) => (
                    <NavItem
                      key={subItem.text}
                      item={subItem}
                      isSubMenuActive={activeSubMenu === subItem.text}
                      onClick={() => handleSubMenuClick(subItem.text)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}