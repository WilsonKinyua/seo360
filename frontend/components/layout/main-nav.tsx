"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  FolderOpen,
  Search,
  Hash,
  Users,
  FileText,
  FileBarChart,
  Settings,
  Menu,
  ChevronDown,
  ChevronRight,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { MAIN_NAVIGATION, type NavigationItem } from "@/lib/constants"

// Icon mapping
const iconMap = {
  LayoutDashboard,
  FolderOpen,
  Search,
  Hash,
  Users,
  FileText,
  FileBarChart,
  Settings,
  Eye: Search,
  TrendingUp: Hash,
  BarChart3: FileBarChart,
  GitCompare: Users,
  Target: Users,
  Wand2: FileText,
  Lightbulb: FileText,
  Layout: FileText,
  Zap,
  UserCheck: Users
}

interface MainNavProps {
  className?: string
}

interface NavItemProps {
  item: NavigationItem
  isActive: boolean
  isExpanded?: boolean
  onToggle?: () => void
  level?: number
}

function NavItem({ item, isActive, isExpanded, onToggle, level = 0 }: NavItemProps) {
  const Icon = iconMap[item.icon as keyof typeof iconMap] || LayoutDashboard
  const hasChildren = item.children && item.children.length > 0
  const pathname = usePathname()

  const isChildActive = hasChildren && item.children?.some(child =>
    pathname.startsWith(child.href)
  )

  return (
    <div className="space-y-1">
      <div className="relative">
        {hasChildren ? (
          <button
            onClick={onToggle}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors",
              "hover:bg-gray-100 dark:hover:bg-gray-800",
              (isActive || isChildActive) && "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300",
              level > 0 && "ml-4"
            )}
          >
            <div className="flex items-center gap-3">
              <Icon className="h-4 w-4" />
              <span>{item.title}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.title === "Audit" && (
                <Badge variant="secondary" className="text-xs">
                  3
                </Badge>
              )}
              {hasChildren && (
                isExpanded ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )
              )}
            </div>
          </button>
        ) : (
          <Link
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
              "hover:bg-gray-100 dark:hover:bg-gray-800",
              isActive && "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300",
              level > 0 && "ml-4"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="space-y-1 ml-6">
          {item.children?.map((child) => {
            const ChildIcon = iconMap[child.icon as keyof typeof iconMap] || Search
            const isChildItemActive = pathname === child.href || pathname.startsWith(child.href + "/")

            return (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                  isChildItemActive && "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                )}
              >
                <ChildIcon className="h-3 w-3" />
                <span>{child.title}</span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    // Auto-expand items that have active children
    const expanded: string[] = []
    MAIN_NAVIGATION.forEach(item => {
      if (item.children?.some(child => pathname.startsWith(child.href))) {
        expanded.push(item.title)
      }
    })
    return expanded
  })

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const navContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-3 py-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-sm">
          SEO
        </div>
        <span className="font-bold text-lg">SEO360</span>
      </div>

      <Separator />

      {/* Navigation Items */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1 py-2">
          {MAIN_NAVIGATION.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href))
            const isExpanded = expandedItems.includes(item.title)

            return (
              <NavItem
                key={item.href}
                item={item}
                isActive={isActive}
                isExpanded={isExpanded}
                onToggle={() => toggleExpanded(item.title)}
              />
            )
          })}
        </div>
      </ScrollArea>

      <Separator />

      {/* Bottom Navigation */}
      <div className="px-3 py-2 space-y-1">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            pathname.startsWith("/settings") && "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
          )}
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Navigation */}
      <div className={cn("hidden md:flex fixed left-0 top-0 h-full z-30", className)}>
        <div className="w-64 h-full border-r bg-white dark:bg-gray-950">
          {navContent}
        </div>
      </div>

      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-gray-950"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          {navContent}
        </SheetContent>
      </Sheet>
    </>
  )
} 