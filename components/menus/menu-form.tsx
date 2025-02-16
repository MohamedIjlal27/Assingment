"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MenuItem } from "@/lib/store/menuSlice"

interface MenuFormProps {
  selectedMenu: MenuItem | null;
  parentName?: string;
  onUpdate: (name: string) => void;
  onDelete: () => void;
}

export function MenuForm({ selectedMenu, parentName, onUpdate, onDelete }: MenuFormProps) {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-gray-50 rounded-2xl">
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
          value={parentName || "Root"}
          disabled
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="name">Menu Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={selectedMenu.name}
          className="mt-2"
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" className="flex-1">
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

