"use client"

import { ReactNode } from "react"
import { MainNav } from "./main-nav"
import { Header } from "./header"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: ReactNode
  className?: string
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <MainNav />
      
      {/* Main content area */}
      <div className="md:pl-64">
        {/* Header */}
        <Header />
        
        {/* Page content */}
        <main className={cn("flex-1", className)}>
          {children}
        </main>
      </div>
    </div>
  )
} 