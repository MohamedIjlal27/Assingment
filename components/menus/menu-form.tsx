"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MenuItem } from "@/lib/store/menuSlice"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store"

interface MenuFormProps {
  selectedMenu: MenuItem | null;
  onUpdate: (name: string) => void;
  onDelete: () => void;
}

export function MenuForm({ selectedMenu, onUpdate, onDelete }: MenuFormProps) {
  const menus = useSelector((state: RootState) => state.menu.items);

  const findParentMenu = (parentId: string, items: MenuItem[]): MenuItem | null => {
    for (const item of items) {
      if (item.id === parentId) {
        return item;
      }
      if (item.children) {
        const found = findParentMenu(parentId, item.children);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const getParentName = (parentId: string | null | undefined): string => {
    if (!parentId) return "Root";
    const parent = findParentMenu(parentId, menus);
    return parent ? parent.name : "Root";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    if (name) {
      onUpdate(name);
    }
  };

  if (!selectedMenu) {
    return (
      <div className="p-6 bg-gray-50 rounded-2xl">
        <p className="text-gray-500">Select a menu item to edit</p>
      </div>
    );
  }

  const parentName = getParentName(selectedMenu.parentId);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-gray-50 rounded-2xl" key={selectedMenu.id}>
      <div>
        <Label htmlFor="menuId">Menu ID</Label>
        <Input
          id="menuId"
          name="menuId"
          value={selectedMenu.id}
          disabled
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="depth">Depth</Label>
        <Input
          id="depth"
          name="depth"
          value={selectedMenu.depth}
          disabled
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="parentData">Parent Menu</Label>
        <Input
          id="parentData"
          name="parentData"
          value={parentName}
          disabled
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="name">Menu Name</Label>
        <Input
          id="name"
          name="name"
          key={`name-${selectedMenu.id}`}
          defaultValue={selectedMenu.name}
          className="mt-2"
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" className="bg-[#253BFF] hover:bg-[#1a2db3]">
          Save Changes
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={onDelete}
          className="flex-1"
        >
          Delete
        </Button>
      </div>
    </form>
  );
}

