"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  CreditCard,
  HelpCircle,
  Plus,
  Check,
  AlertCircle,
  TrendingUp,
  Activity,
  ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"
import { dummyUser, dummyProjects } from "@/lib/data/dummy-data"
import { formatDate } from "@/lib/utils"

interface HeaderProps {
  className?: string
}

// Dummy notifications data
const dummyNotifications = [
  {
    id: "1",
    type: "audit_completed",
    title: "SEO Audit Completed",
    message: "example-store.com audit finished with 78% score",
    timestamp: "2024-01-20T10:30:00Z",
    read: false,
    url: "/audit/site_1"
  },
  {
    id: "2",
    type: "ranking_improved",
    title: "Ranking Improved",
    message: "'best seo tools' moved to position 3 (+2)",
    timestamp: "2024-01-20T09:15:00Z",
    read: false,
    url: "/keywords/kw_1"
  },
  {
    id: "3",
    type: "new_backlink",
    title: "New Backlink Detected",
    message: "High-quality backlink from seoblog.com",
    timestamp: "2024-01-19T16:45:00Z",
    read: true,
    url: "/backlinks"
  },
  {
    id: "4",
    type: "issue_found",
    title: "Critical Issue Found",
    message: "12 pages missing meta descriptions",
    timestamp: "2024-01-19T14:20:00Z",
    read: true,
    url: "/audit/site_1/technical"
  }
]

const notificationIcons = {
  audit_completed: Check,
  ranking_improved: TrendingUp,
  new_backlink: Activity,
  issue_found: AlertCircle
}

const notificationColors = {
  audit_completed: "text-green-600",
  ranking_improved: "text-blue-600",
  new_backlink: "text-purple-600",
  issue_found: "text-red-600"
}

export function Header({ className }: HeaderProps) {
  const [selectedProject, setSelectedProject] = useState(dummyProjects[0].id)
  const [searchQuery, setSearchQuery] = useState("")
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const unreadCount = dummyNotifications.filter(n => !n.read).length
  const currentProject = dummyProjects.find(p => p.id === selectedProject)

  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId)
    // In real app, this would update the global project context
  }

  const handleNotificationClick = (notification: typeof dummyNotifications[0]) => {
    // Mark as read and navigate
    console.log("Navigate to:", notification.url)
    setNotificationsOpen(false)
  }

  const markAllAsRead = () => {
    // In real app, this would make an API call
    console.log("Mark all notifications as read")
  }

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60",
      className
    )}>
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left section - Project selector and search */}
        <div className="flex items-center gap-4 flex-1">
          {/* Project Selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 hidden sm:block">
              Project:
            </span>
            <Select value={selectedProject} onValueChange={handleProjectChange}>
              <SelectTrigger className="w-[200px] h-9">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="truncate">{currentProject?.name}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {dummyProjects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        project.status === "active" ? "bg-green-500" : "bg-gray-400"
                      )} />
                      <span>{project.name}</span>
                    </div>
                  </SelectItem>
                ))}
                <Separator />
                <SelectItem value="new">
                  <div className="flex items-center gap-2">
                    <Plus className="w-3 h-3" />
                    <span>Create new project</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search */}
          <div className="relative flex-1 hidden lg:block max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search projects, keywords, issues..."
              className="pl-10 h-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Right section - Notifications, Help, User menu */}
        <div className="flex items-center gap-2">
          {/* Help */}
          <Button variant="ghost" size="sm" asChild>
            <Link href="/help">
              <HelpCircle className="h-4 w-4" />
            </Link>
          </Button>

          {/* Notifications */}
          <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="flex items-center justify-between p-4 border-b">
                <h4 className="font-semibold">Notifications</h4>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    Mark all read
                  </Button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {dummyNotifications.length === 0 ? (
                  <div className="p-4 text-center text-sm text-gray-500">
                    No notifications
                  </div>
                ) : (
                  <div className="space-y-1 p-2">
                    {dummyNotifications.map((notification) => {
                      const Icon = notificationIcons[notification.type as keyof typeof notificationIcons]
                      const colorClass = notificationColors[notification.type as keyof typeof notificationColors]

                      return (
                        <button
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className={cn(
                            "w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
                            !notification.read && "bg-blue-50 dark:bg-blue-950/30"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div className={cn("mt-0.5", colorClass)}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                                )}
                              </div>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400">
                                {formatDate(notification.timestamp, 'relative')}
                              </p>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {dummyNotifications.length > 0 && (
                <div className="border-t p-2">
                  <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
                    <Link href="/notifications">
                      View all notifications
                    </Link>
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={dummyUser.avatar} alt={dummyUser.name} />
                  <AvatarFallback>
                    {dummyUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{dummyUser.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {dummyUser.email}
                  </p>
                  <Badge variant="secondary" className="w-fit text-xs">
                    {dummyUser.subscription.plan.name}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings/billing" className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 dark:text-red-400">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
} 