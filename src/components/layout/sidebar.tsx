"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Package,
  ClipboardList,
  BarChart3,
  Settings,
  HelpCircle,
} from "lucide-react"
import { CVAIcon } from "@/components/ui/cva-icon"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Households", href: "/dashboard/households", icon: Users },
  { name: "Distributions", href: "/dashboard/distributions", icon: Package },
  { name: "Cases", href: "/dashboard/cases", icon: ClipboardList },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
]

const secondaryNav = [
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help", href: "/dashboard/help", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r bg-white lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <CVAIcon className="h-8 w-8" />
        <span className="font-semibold text-gray-900">CVA Hub</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-rcrc-red/10 text-rcrc-red"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="my-4 border-t" />

        <div className="space-y-1">
          {secondaryNav.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-rcrc-red/10 text-rcrc-red"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="rounded-lg bg-slate-50 p-3">
          <p className="text-xs font-medium text-gray-900">IFRC CVA Programme</p>
          <p className="text-xs text-gray-500">v0.1.0 - Prototype</p>
        </div>
      </div>
    </aside>
  )
}
