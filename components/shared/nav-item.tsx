import type { NavItemProps } from "@/types"

export function NavItem({ icon: Icon, label, isActive, isHighlighted }: NavItemProps) {
  return (
    <button
      className={`
        flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm
        ${isHighlighted ? "bg-[#9ff443] text-black" : "text-gray-300"}
        ${isActive ? "bg-gray-800" : "hover:bg-gray-800"}
      `}
    >
      <Icon className="h-5 w-5 opacity-80" />
      <span className="opacity-90">{label}</span>
    </button>
  )
}

