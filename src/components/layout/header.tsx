"use client"

import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { LogOut, Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  user: User
}

export function Header({ user }: HeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-white px-6">
      {/* Search */}
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search households, beneficiaries..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rcrc-red" />
        </Button>

        <div className="flex items-center gap-3 border-l pl-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {user.email?.split("@")[0]}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleSignOut}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
