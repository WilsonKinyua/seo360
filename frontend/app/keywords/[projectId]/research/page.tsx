"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  DollarSign,
  BarChart3,
  Download,
  Plus,
  Star,
  Users
} from "lucide-react"
import { use } from "react"

// Dummy keyword research data
const keywordSuggestions = [
  {
    id: 1,
    keyword: "seo tools 2024",
    volume: 18500,
    difficulty: 72,
    cpc: 8.45,
    trend: "rising",
    intent: "commercial",
    opportunity: "high"
  },
  {
    id: 2,
    keyword: "free seo audit",
    volume: 12300,
    difficulty: 45,
    cpc: 12.80,
    trend: "stable",
    intent: "informational",
    opportunity: "medium"
  },
  {
    id: 3,
    keyword: "website seo checker",
    volume: 9800,
    difficulty: 58,
    cpc: 6.90,
    trend: "rising",
    intent: "commercial",
    opportunity: "high"
  }
]

export default function KeywordResearchPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("suggestions")

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 30) return "text-green-600 bg-green-50"
    if (difficulty <= 60) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case "high": return "text-green-600 bg-green-50"
      case "medium": return "text-yellow-600 bg-yellow-50"
      case "low": return "text-red-600 bg-red-50"
      default: return "text-gray-600 bg-gray-50"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "rising": return <TrendingUp className="h-3 w-3 text-green-600" />
      case "falling": return <TrendingDown className="h-3 w-3 text-red-600" />
      default: return <div className="h-3 w-3 rounded-full bg-gray-400" />
    }
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Keyword Research</h1>
            <p className="text-muted-foreground">
              Discover high-value keywords and analyze search opportunities
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Keywords
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add to Tracking
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter seed keywords or topics..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button>
                <Search className="mr-2 h-4 w-4" />
                Research
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Keywords Found</span>
              </div>
              <div className="text-3xl font-bold">{keywordSuggestions.length}</div>
              <div className="text-sm text-muted-foreground">Matching your criteria</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <span className="font-medium">Avg Volume</span>
              </div>
              <div className="text-3xl font-bold">13.5K</div>
              <div className="text-sm text-muted-foreground">Monthly searches</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Avg CPC</span>
              </div>
              <div className="text-3xl font-bold">$9.35</div>
              <div className="text-sm text-muted-foreground">Cost per click</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-yellow-600" />
                <span className="font-medium">High Opportunities</span>
              </div>
              <div className="text-3xl font-bold">
                {keywordSuggestions.filter(k => k.opportunity === "high").length}
              </div>
              <div className="text-sm text-muted-foreground">High potential keywords</div>
            </CardContent>
          </Card>
        </div>

        {/* Keyword Results */}
        <Card>
          <CardHeader>
            <CardTitle>Keyword Suggestions</CardTitle>
            <CardDescription>
              High-value keywords with search volume, difficulty, and opportunity scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>CPC</TableHead>
                  <TableHead>Intent</TableHead>
                  <TableHead>Trend</TableHead>
                  <TableHead>Opportunity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywordSuggestions.map((keyword) => (
                  <TableRow key={keyword.id}>
                    <TableCell className="font-medium">{keyword.keyword}</TableCell>
                    <TableCell>{keyword.volume.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getDifficultyColor(keyword.difficulty)}>
                        {keyword.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>${keyword.cpc.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {keyword.intent}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(keyword.trend)}
                        <span className="text-xs capitalize">{keyword.trend}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getOpportunityColor(keyword.opportunity)}>
                        {keyword.opportunity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Star className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 