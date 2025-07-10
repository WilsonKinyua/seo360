"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { 
  Target, 
  TrendingUp, 
  Users, 
  Search,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Lightbulb
} from "lucide-react"
import { use } from "react"

// Dummy analysis data
const keywordGaps = [
  {
    keyword: "best seo software",
    competitor: "ahrefs.com",
    theirPosition: 2,
    myPosition: null,
    opportunity: "high",
    volume: 14500,
    difficulty: 68
  },
  {
    keyword: "seo tool comparison",
    competitor: "semrush.com", 
    theirPosition: 1,
    myPosition: 15,
    opportunity: "medium",
    volume: 8900,
    difficulty: 55
  },
  {
    keyword: "enterprise seo platform",
    competitor: "moz.com",
    theirPosition: 3,
    myPosition: null,
    opportunity: "high",
    volume: 3200,
    difficulty: 72
  }
]

const opportunities = [
  {
    type: "Quick Wins",
    keywords: [
      { keyword: "free seo checker", position: 12, volume: 6700, potential: "high" },
      { keyword: "website audit tool", position: 8, volume: 4500, potential: "medium" }
    ]
  },
  {
    type: "Long-term Targets",
    keywords: [
      { keyword: "seo analysis software", position: 25, volume: 12300, potential: "high" },
      { keyword: "keyword tracking tool", position: 18, volume: 8900, potential: "medium" }
    ]
  }
]

const cannibalizationIssues = [
  {
    keyword: "seo tools",
    pages: ["/tools", "/seo-tools", "/software"],
    impact: "medium",
    suggestion: "Consolidate into single target page"
  },
  {
    keyword: "website analysis",
    pages: ["/analysis", "/audit", "/checker"],
    impact: "low",
    suggestion: "Create clear content differentiation"
  }
]

export default function KeywordAnalysisPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params)

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case "high": return "text-green-600 bg-green-50"
      case "medium": return "text-yellow-600 bg-yellow-50"
      case "low": return "text-red-600 bg-red-50"
      default: return "text-gray-600 bg-gray-50"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "text-red-600 bg-red-50"
      case "medium": return "text-yellow-600 bg-yellow-50"
      case "low": return "text-blue-600 bg-blue-50"
      default: return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Keyword Analysis</h1>
          <p className="text-muted-foreground">
            Discover gaps, opportunities, and optimization potential
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Keyword Gaps</span>
              </div>
              <div className="text-3xl font-bold">{keywordGaps.length}</div>
              <div className="text-sm text-muted-foreground">Missing opportunities</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-medium">Quick Wins</span>
              </div>
              <div className="text-3xl font-bold">
                {opportunities.find(o => o.type === "Quick Wins")?.keywords.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Easy improvements</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="font-medium">Cannibalization</span>
              </div>
              <div className="text-3xl font-bold">{cannibalizationIssues.length}</div>
              <div className="text-sm text-muted-foreground">Conflicting pages</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Opportunities</span>
              </div>
              <div className="text-3xl font-bold">
                {keywordGaps.filter(g => g.opportunity === "high").length}
              </div>
              <div className="text-sm text-muted-foreground">High potential</div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Tabs */}
        <Tabs defaultValue="gaps" className="space-y-4">
          <TabsList>
            <TabsTrigger value="gaps">Keyword Gaps</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="cannibalization">Cannibalization</TabsTrigger>
          </TabsList>

          <TabsContent value="gaps" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Keyword Gap Analysis</CardTitle>
                <CardDescription>
                  Keywords your competitors rank for but you don't
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Keyword</TableHead>
                      <TableHead>Competitor</TableHead>
                      <TableHead>Their Position</TableHead>
                      <TableHead>My Position</TableHead>
                      <TableHead>Volume</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Opportunity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {keywordGaps.map((gap, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{gap.keyword}</TableCell>
                        <TableCell>{gap.competitor}</TableCell>
                        <TableCell>
                          <Badge className="bg-red-100 text-red-700">
                            #{gap.theirPosition}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {gap.myPosition ? (
                            <Badge variant="outline">#{gap.myPosition}</Badge>
                          ) : (
                            <span className="text-muted-foreground">Not ranking</span>
                          )}
                        </TableCell>
                        <TableCell>{gap.volume.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{gap.difficulty}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getOpportunityColor(gap.opportunity)}>
                            {gap.opportunity}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              {opportunities.map((section) => (
                <Card key={section.type}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {section.type === "Quick Wins" ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Target className="h-5 w-5 text-blue-600" />
                      )}
                      {section.type}
                    </CardTitle>
                    <CardDescription>
                      {section.type === "Quick Wins" 
                        ? "Keywords you can improve quickly"
                        : "Strategic keywords for long-term growth"
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {section.keywords.map((keyword, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{keyword.keyword}</span>
                          <Badge className={getOpportunityColor(keyword.potential)}>
                            {keyword.potential}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Position #{keyword.position}</span>
                          <span>{keyword.volume.toLocaleString()} searches/mo</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cannibalization" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Keyword Cannibalization</CardTitle>
                <CardDescription>
                  Multiple pages competing for the same keywords
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cannibalizationIssues.map((issue, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{issue.keyword}</h4>
                      <Badge className={getImpactColor(issue.impact)}>
                        {issue.impact} impact
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium">Competing Pages:</span>
                        <div className="text-sm text-muted-foreground">
                          {issue.pages.join(", ")}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Suggestion:</span>
                        <div className="text-sm text-muted-foreground">
                          {issue.suggestion}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
} 