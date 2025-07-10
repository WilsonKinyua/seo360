"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Plus,
  Search,
  MoreHorizontal,
  Globe,
  Settings,
  BarChart3,
  ExternalLink,
  Trash2,
  Edit,
  Activity,
  Calendar,
  Users
} from "lucide-react"
import { formatDate, formatNumber } from "@/lib/utils"

// Dummy project data
const dummyProjects = [
  {
    id: "1",
    name: "E-commerce Store",
    description: "Main company website with product catalog",
    url: "https://example-store.com",
    status: "active" as const,
    createdAt: "2024-01-15T10:00:00Z",
    lastAudit: "2024-01-28T14:30:00Z",
    seoScore: 78,
    totalKeywords: 245,
    organicTraffic: 15420,
    websites: 3,
    team: ["john@example.com", "sarah@example.com"]
  },
  {
    id: "2",
    name: "Blog Platform",
    description: "Content marketing and thought leadership blog",
    url: "https://blog.example.com",
    status: "active" as const,
    createdAt: "2024-01-20T09:15:00Z",
    lastAudit: "2024-01-29T16:45:00Z",
    seoScore: 85,
    totalKeywords: 189,
    organicTraffic: 8760,
    websites: 1,
    team: ["mike@example.com"]
  },
  {
    id: "3",
    name: "Landing Pages",
    description: "Campaign-specific landing pages for PPC",
    url: "https://landing.example.com",
    status: "paused" as const,
    createdAt: "2024-01-10T11:30:00Z",
    lastAudit: "2024-01-25T12:00:00Z",
    seoScore: 62,
    totalKeywords: 56,
    organicTraffic: 2340,
    websites: 5,
    team: ["anna@example.com", "david@example.com", "lisa@example.com"]
  }
]

const statusColors = {
  active: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  paused: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  archived: "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
}

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")

  const filteredProjects = dummyProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = selectedTab === "all" || project.status === selectedTab
    return matchesSearch && matchesTab
  })

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground">
              Manage your SEO projects and websites
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="paused">Paused</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Project Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                  <p className="text-2xl font-bold">{dummyProjects.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Globe className="h-4 w-4 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Websites</p>
                  <p className="text-2xl font-bold">
                    {dummyProjects.reduce((sum, project) => sum + project.websites, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Search className="h-4 w-4 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Keywords</p>
                  <p className="text-2xl font-bold">
                    {formatNumber(dummyProjects.reduce((sum, project) => sum + project.totalKeywords, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <Activity className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Avg SEO Score</p>
                  <p className="text-2xl font-bold">
                    {Math.round(dummyProjects.reduce((sum, project) => sum + project.seoScore, 0) / dummyProjects.length)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {project.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={statusColors[project.status]}>
                      {project.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* URL */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-3 w-3" />
                  <span className="truncate">{project.url}</span>
                  <ExternalLink className="h-3 w-3 ml-auto cursor-pointer hover:text-blue-600" />
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">SEO Score</p>
                    <p className="font-semibold text-lg">{project.seoScore}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Keywords</p>
                    <p className="font-semibold text-lg">{formatNumber(project.totalKeywords)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Traffic</p>
                    <p className="font-semibold text-lg">{formatNumber(project.organicTraffic, 'compact')}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Websites</p>
                    <p className="font-semibold text-lg">{project.websites}</p>
                  </div>
                </div>

                {/* Team & Dates */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{project.team.length} team members</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Last audit: {formatDate(project.lastAudit, 'relative')}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    <BarChart3 className="mr-2 h-3 w-3" />
                    View Analytics
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground text-center mb-4">
                {searchTerm ? "No projects match your search criteria." : "Get started by creating your first SEO project."}
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Project
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
} 