"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Target,
  BarChart3,
  Calendar,
  Filter,
  Download,
  Plus,
  Eye,
  AlertTriangle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { use } from "react"

// Dummy tracking data
const trackedKeywords = [
  {
    id: 1,
    keyword: "seo tools",
    currentPosition: 3,
    previousPosition: 5,
    change: -2,
    bestPosition: 2,
    url: "/tools/seo",
    searchVolume: 18500,
    lastChecked: "2024-01-28T14:30:00Z",
    history: [8, 7, 5, 4, 3]
  },
  {
    id: 2,
    keyword: "free seo audit",
    currentPosition: 7,
    previousPosition: 6,
    change: 1,
    bestPosition: 4,
    url: "/audit",
    searchVolume: 12300,
    lastChecked: "2024-01-28T14:30:00Z",
    history: [12, 9, 6, 6, 7]
  },
  {
    id: 3,
    keyword: "keyword research",
    currentPosition: 15,
    previousPosition: 18,
    change: -3,
    bestPosition: 12,
    url: "/keywords",
    searchVolume: 15600,
    lastChecked: "2024-01-28T14:30:00Z",
    history: [25, 22, 18, 16, 15]
  },
  {
    id: 4,
    keyword: "seo analysis",
    currentPosition: 2,
    previousPosition: 2,
    change: 0,
    bestPosition: 1,
    url: "/analysis",
    searchVolume: 22100,
    lastChecked: "2024-01-28T14:30:00Z",
    history: [4, 3, 2, 2, 2]
  }
]

const performanceMetrics = [
  { label: "Avg Position", value: "6.8", change: "-1.2", trend: "down" },
  { label: "Top 10 Keywords", value: "12", change: "+3", trend: "up" },
  { label: "Visibility Score", value: "68%", change: "+5%", trend: "up" },
  { label: "Traffic Potential", value: "2.4K", change: "+340", trend: "up" }
]

export default function KeywordTrackingPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params)
  const [timeRange, setTimeRange] = useState("7d")
  const [positionFilter, setPositionFilter] = useState("all")

  const getPositionColor = (position: number) => {
    if (position <= 3) return "text-green-600 bg-green-50"
    if (position <= 10) return "text-blue-600 bg-blue-50"
    if (position <= 20) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingDown className="h-3 w-3 text-red-600" />
    if (change < 0) return <TrendingUp className="h-3 w-3 text-green-600" />
    return <Minus className="h-3 w-3 text-gray-400" />
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-red-600"
    if (change < 0) return "text-green-600"
    return "text-gray-400"
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-green-600"
      case "down": return "text-red-600"
      default: return "text-gray-400"
    }
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Keyword Tracking</h1>
            <p className="text-muted-foreground">
              Monitor keyword rankings and track position changes over time
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Keywords
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  <SelectItem value="top3">Top 3</SelectItem>
                  <SelectItem value="top10">Top 10</SelectItem>
                  <SelectItem value="top20">Top 20</SelectItem>
                  <SelectItem value="below20">Below 20</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {performanceMetrics.map((metric) => (
            <Card key={metric.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  <div className={cn("flex items-center gap-1 text-sm", getTrendColor(metric.trend))}>
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : metric.trend === "down" ? (
                      <TrendingDown className="h-4 w-4" />
                    ) : (
                      <Minus className="h-4 w-4" />
                    )}
                    <span>{metric.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Keywords Table */}
        <Card>
          <CardHeader>
            <CardTitle>Tracked Keywords</CardTitle>
            <CardDescription>
              Current rankings and position changes for your tracked keywords
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  <TableHead>Current Position</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Best Position</TableHead>
                  <TableHead>Search Volume</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Last Checked</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trackedKeywords.map((keyword) => (
                  <TableRow key={keyword.id}>
                    <TableCell className="font-medium">{keyword.keyword}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge className={getPositionColor(keyword.currentPosition)}>
                          #{keyword.currentPosition}
                        </Badge>
                        {keyword.currentPosition <= 10 && (
                          <Target className="h-3 w-3 text-green-600" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={cn("flex items-center gap-1", getChangeColor(keyword.change))}>
                        {getChangeIcon(keyword.change)}
                        <span className="text-sm">
                          {keyword.change === 0 ? "No change" : Math.abs(keyword.change)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">#{keyword.bestPosition}</Badge>
                    </TableCell>
                    <TableCell>{keyword.searchVolume.toLocaleString()}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                      {keyword.url}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      4 hours ago
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Position Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Position Distribution</CardTitle>
              <CardDescription>
                Breakdown of keywords by ranking position
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Top 3 (1-3)</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-green-200 rounded-full overflow-hidden">
                    <div className="w-1/4 h-full bg-green-600"></div>
                  </div>
                  <span className="text-sm font-medium">1</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Top 10 (4-10)</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-blue-200 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-blue-600"></div>
                  </div>
                  <span className="text-sm font-medium">2</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Top 20 (11-20)</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-yellow-200 rounded-full overflow-hidden">
                    <div className="w-1/4 h-full bg-yellow-600"></div>
                  </div>
                  <span className="text-sm font-medium">1</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Below 20 (21+)</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-red-200 rounded-full overflow-hidden">
                    <div className="w-0 h-full bg-red-600"></div>
                  </div>
                  <span className="text-sm font-medium">0</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Changes */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Position Changes</CardTitle>
              <CardDescription>
                Latest ranking movements for your keywords
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {trackedKeywords.filter(k => k.change !== 0).map((keyword) => (
                <div key={keyword.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">{keyword.keyword}</span>
                    <div className="text-sm text-muted-foreground">
                      #{keyword.previousPosition} → #{keyword.currentPosition}
                    </div>
                  </div>
                  <div className={cn("flex items-center gap-1", getChangeColor(keyword.change))}>
                    {getChangeIcon(keyword.change)}
                    <span className="text-sm font-medium">
                      {Math.abs(keyword.change)}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
} 