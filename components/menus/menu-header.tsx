import { Grid } from "lucide-react"

export function MenuHeader() {
  return (
    <>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span>Menus</span>
      </div>
      <div className="flex items-center gap-2 mb-8">
        <div className="p-2 bg-blue-600 rounded">
          <Grid className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-2xl font-semibold">Menus</h1>
      </div>
    </>
  )
}

