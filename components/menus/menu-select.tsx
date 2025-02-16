import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown } from "lucide-react"

export function MenuSelect() {
  return (
    <Select defaultValue="system-management">
      <SelectTrigger className="w-full bg-[#F9FAFB] border-0 text-gray-900 py-4 px-6 text-lg font-normal">
        <SelectValue placeholder="Select menu" />
        <ChevronDown className="h-5 w-5 text-gray-400" />
      </SelectTrigger>
      <SelectContent className="bg-[#F9FAFB] border-0 w-[600px] p-6">
        <SelectItem value="system-management" className="text-lg py-4 px-4">system management</SelectItem>
      </SelectContent>
    </Select>
  )
}

