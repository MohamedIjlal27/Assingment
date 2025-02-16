"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { FormData } from "@/types"

const initialFormData: FormData = {
  menuId: "56320ee9-6af6-11ed-a7ba-f220afe5e4a9",
  depth: "3",
  parentData: "Systems",
  name: "System Code",
}

export function MenuForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="menuId" className="text-gray-500">
          Menu ID
        </Label>
        <Input id="menuId" value={formData.menuId} readOnly className="bg-[#F9FAFB] text-gray-900" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="depth" className="text-gray-500">
          Depth
        </Label>
        <Input id="depth" value={formData.depth} readOnly className="bg-[#F9FAFB] text-gray-900" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="parentData" className="text-gray-500">
          Parent Data
        </Label>
        <Input id="parentData" value={formData.parentData} readOnly className="bg-[#F9FAFB] text-gray-900" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-gray-500">
          Name
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          className="text-gray-900"
        />
      </div>
      <Button
        className="w-full bg-[#253BFF] hover:bg-[#1E2FCC] text-white mt-4"
        onClick={() => {
          console.log("Saving:", formData)
        }}
      >
        Save
      </Button>
    </div>
  )
}

