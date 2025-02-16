
import { MenuHeader } from "@/components/menus/menu-header"
import { MenuSelect } from "@/components/menus/menu-select"
import { TreeControls } from "@/components/menus/tree-controls"
import { TreeView } from "@/components/menus/tree-view"
import { MenuForm } from "@/components/menus/menu-form"
import { initialTree } from "@/lib/data"

export default function MenusPage() {
  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <MenuHeader />
          <div className="mb-6">
            <h2 className="text-xl text-gray-700 mb-2">Menu</h2>
            <div className="bg-[#F9FAFB] rounded-lg">
              <MenuSelect />
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex-1">
              <TreeControls
                onExpandAll={() => console.log("Expand all")}
                onCollapseAll={() => console.log("Collapse all")}
              />
              <TreeView initialData={initialTree} />
            </div>
            <div className="w-80">
              <MenuForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

