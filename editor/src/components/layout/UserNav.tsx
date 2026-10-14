import type { FC } from "react"
import { ChevronDown, Globe, LogOut, Shield, User } from "lucide-react"
import { hasRole, logout, useAuth } from "@/utils/hooks/useAuth.ts"
import { UserRole, type UserType } from "@/utils/types/user.ts"
import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import { Button } from "@/components/ui/button.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import { ADMIN_URL } from "@/utils/constants/routes.ts"

const formatRole = (role?: UserRole): string => {
  switch (role) {
    case UserRole.Admin:
      return "Administrátor"
    case UserRole.Manager:
      return "Manažer"
    case UserRole.Editor:
      return "Editor"
    default:
      return "Uživatel"
  }
}

const getInitials = (user?: UserType): string => {
  if (!user) return "U"
  if (user.firstname && user.surname) {
    return `${user.firstname[0]}${user.surname[0]}`.toUpperCase()
  }
  if (user.nickname) {
    return user.nickname.slice(0, 2).toUpperCase()
  }
  return "U"
}

export const UserNav: FC = () => {
  const { user } = useAuth()
  const initials = getInitials(user)
  const roleName = formatRole(user?.role)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex h-9 items-center gap-2.5 rounded-full px-2 py-1 hover:bg-accent sm:rounded-lg sm:px-2.5"
          aria-label="Uživatelský profil"
        >
          {/* Avatar s indikátorem přihlášení */}
          <div className="relative">
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span
              className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full bg-emerald-500 ring-2 ring-background"
              title="Přihlášen"
              aria-hidden="true"
            />
          </div>

          {/* Jméno a role (na desktopu) */}
          <div className="hidden flex-col items-start text-left sm:flex">
            <span className="max-w-[140px] truncate text-xs font-medium leading-tight">
              {user?.nickname || user?.email || "Uživatel"}
            </span>
            <span className="text-[10px] text-muted-foreground leading-tight">
              {roleName}
            </span>
          </div>

          <ChevronDown className="hidden size-3.5 text-muted-foreground opacity-60 sm:block" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-semibold leading-none">
                {user?.nickname || "Uživatel"}
              </p>
              <Badge variant="secondary" className="text-[10px] font-medium">
                {roleName}
              </Badge>
            </div>
            {user?.email && (
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            )}
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Přihlášen jako {roleName.toLowerCase()}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {hasRole(user, [UserRole.Admin, UserRole.Manager]) && (
          <DropdownMenuItem asChild>
            <a href={ADMIN_URL} className="flex cursor-pointer items-center gap-2">
              <Shield className="size-4" />
              <span>Administrace</span>
            </a>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <a href="/profile" className="flex cursor-pointer items-center gap-2">
            <User className="size-4" />
            <span>Můj profil (web)</span>
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a href="/" className="flex cursor-pointer items-center gap-2">
            <Globe className="size-4" />
            <span>Přejít na hlavní web</span>
          </a>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={logout}
          className="flex cursor-pointer items-center gap-2"
        >
          <LogOut className="size-4" />
          <span>Odhlásit se</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
