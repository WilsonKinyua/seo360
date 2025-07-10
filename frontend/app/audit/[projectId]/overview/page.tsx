"use client"

import { useState, use } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { SEOScoreRing } from "@/components/ui/seo-score-ring"
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  TrendingDown,
  Zap,
  Shield,
  FileText,
  Search,
  Settings,
  Download,
  Play,
  RefreshCw,
  ExternalLink,
  Eye,
  AlertCircle,
  Info
} from "lucide-react"
import { cn } from "@/lib/utils"

// Dummy audit data
const dummyAuditData = {
  id: "audit_001",
  projectId: "proj_1",
  websiteUrl: "https://example-store.com",
  status: "completed" as const,
  createdAt: "2024-01-28T10:30:00Z",
  lastRun: "2024-01-28T14:45:00Z",
  overallScore: 78,
  scores: {
    technical: 82,
    content: 75,
    performance: 79,
    accessibility: 76,
    bestPractices: 81
  },
  issuesSummary: {
    critical: 3,
    high: 12,
    medium: 28,
    low: 45
  },
  improvements: {
    potential: "+15 points",
    timeframe: "2-4 weeks",
    priority: "Focus on critical issues first"
  }
}

const categoryData = [
  {
    category: "Technical SEO",
    score: dummyAuditData.scores.technical,
    issues: { critical: 1, high: 3, medium: 8, low: 12 },
    icon: Settings,
    color: "blue",
    description: "Crawlability, indexing, and technical foundation"
  },
  {
    category: "Content Quality", 
    score: dummyAuditData.scores.content,
    issues: { critical: 2, high: 4, medium: 7, low: 15 },
    icon: FileText,
    color: "green",
    description: "Content optimization and relevance"
  },
  {
    category: "Performance",
    score: dummyAuditData.scores.performance,
    issues: { critical: 0, high: 3, medium: 9, low: 8 },
    icon: Zap,
    color: "yellow",
    description: "Page speed and Core Web Vitals"
  },
  {
    category: "Accessibility",
    score: dummyAuditData.scores.accessibility,
    issues: { critical: 0, high: 2, medium: 4, low: 10 },
    icon: Shield,
    color: "purple",
    description: "WCAG compliance and usability"
  }
]

const criticalIssues = [
  {
    id: 1,
    title: "Missing Meta Descriptions",
    description: "12 pages are missing meta descriptions, impacting SERP appearance",
    category: "Content",
    impact: "High click-through rate loss",
    pages: 12,
    effort: "Easy",
    canAutoFix: true
  },
  {
    id: 2,
    title: "Broken Internal Links",
    description: "8 internal links return 404 errors, harming user experience",
    category: "Technical",
    impact: "Poor crawlability",
    pages: 8,
    effort: "Medium",
    canAutoFix: false
  },
  {
    id: 3,
    title: "Large Image Files",
    description: "Images not optimized, affecting page load speed",
    category: "Performance", 
    impact: "Slow loading times",
    pages: 25,
    effort: "Easy",
    canAutoFix: true
  }
]

const recommendations = [
  {
    id: 1,
    title: "Optimize Meta Tags",
    impact: "High",
    effort: "Easy",
    description: "Add missing meta descriptions and improve title tags for better SERP performance",
    estimatedGain: "+8 points"
  },
  {
    id: 2,
    title: "Fix Technical Issues",
    impact: "High", 
    effort: "Medium",
    description: "Resolve broken links, fix crawl errors, and improve site structure",
    estimatedGain: "+5 points"
  },
  {
    id: 3,
    title: "Improve Page Speed",
    impact: "Medium",
    effort: "Medium", 
    description: "Optimize images, minify CSS/JS, and leverage browser caching",
    estimatedGain: "+4 points"
  }
]

const issueColors = {
  critical: "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400",
  high: "text-orange-600 bg-orange-50 dark:bg-orange-950 dark:text-orange-400", 
  medium: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-400",
  low: "text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400"
}

const categoryColors = {
  blue: "text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400",
  green: "text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400",
  yellow: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-400",
  purple: "text-purple-600 bg-purple-50 dark:bg-purple-950 dark:text-purple-400"
}

export default function AuditOverviewPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params)
  const [isRunningAudit, setIsRunningAudit] = useState(false)

  const runNewAudit = () => {
    setIsRunningAudit(true)
    setTimeout(() => setIsRunningAudit(false), 3000)
  }

  const totalIssues = Object.values(dummyAuditData.issuesSummary).reduce((sum, count) => sum + count, 0)

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">SEO Audit Overview</h1>
            <p className="text-muted-foreground">
              Comprehensive analysis of {dummyAuditData.websiteUrl}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button onClick={runNewAudit} disabled={isRunningAudit}>
              {isRunningAudit ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Play className="mr-2 h-4 w-4" />
              )}
              {isRunningAudit ? "Running..." : "Run New Audit"}
            </Button>
          </div>
        </div>

        {/* Audit Status */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Audit Completed</span>
                </div>
                <Badge variant="secondary">
                  Last run: 4 hours ago
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Scan time: 2m 34s</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>89 pages analyzed</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Overview Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Overall Score */}
          <Card className="md:row-span-2">
            <CardHeader>
              <CardTitle>Overall SEO Score</CardTitle>
              <CardDescription>
                Based on {totalIssues} issues across all categories
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <SEOScoreRing score={dummyAuditData.overallScore} size="xl" showLabel />
              
              <div className="text-center space-y-2">
                <div className="text-sm text-muted-foreground">
                  Potential improvement: <span className="font-medium text-green-600">
                    {dummyAuditData.improvements.potential}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Estimated timeline: {dummyAuditData.improvements.timeframe}
                </div>
              </div>

              <div className="w-full space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Technical SEO</span>
                  <span className="font-medium">{dummyAuditData.scores.technical}%</span>
                </div>
                <Progress value={dummyAuditData.scores.technical} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Content Quality</span>
                  <span className="font-medium">{dummyAuditData.scores.content}%</span>
                </div>
                <Progress value={dummyAuditData.scores.content} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Performance</span>
                  <span className="font-medium">{dummyAuditData.scores.performance}%</span>
                </div>
                <Progress value={dummyAuditData.scores.performance} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Accessibility</span>
                  <span className="font-medium">{dummyAuditData.scores.accessibility}%</span>
                </div>
                <Progress value={dummyAuditData.scores.accessibility} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Issues Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Issues Summary</CardTitle>
              <CardDescription>
                {totalIssues} total issues found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-sm font-medium">Critical</span>
                    </div>
                    <span className="text-lg font-bold text-red-600">
                      {dummyAuditData.issuesSummary.critical}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500" />
                      <span className="text-sm font-medium">High</span>
                    </div>
                    <span className="text-lg font-bold text-orange-600">
                      {dummyAuditData.issuesSummary.high}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="text-sm font-medium">Medium</span>
                    </div>
                    <span className="text-lg font-bold text-yellow-600">
                      {dummyAuditData.issuesSummary.medium}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-sm font-medium">Low</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">
                      {dummyAuditData.issuesSummary.low}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Fix issues that can be resolved automatically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Auto-fix Meta Tags (12 pages)
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Zap className="mr-2 h-4 w-4" />
                Optimize Images (25 files)
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generate Alt Text (8 images)
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Audit Categories</CardTitle>
            <CardDescription>
              Detailed breakdown by audit category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {categoryData.map((category) => {
                const Icon = category.icon
                const totalCategoryIssues = Object.values(category.issues).reduce((sum, count) => sum + count, 0)
                
                return (
                  <div
                    key={category.category}
                    className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={cn("p-2 rounded-lg", categoryColors[category.color as keyof typeof categoryColors])}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <SEOScoreRing score={category.score} size="sm" />
                    </div>
                    
                    <h3 className="font-semibold mb-1">{category.category}</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {category.description}
                    </p>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{totalCategoryIssues} issues</span>
                        <span>{category.issues.critical} critical</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="h-1 bg-red-500 rounded" style={{ width: `${(category.issues.critical / totalCategoryIssues) * 100}%` }} />
                        <div className="h-1 bg-orange-500 rounded" style={{ width: `${(category.issues.high / totalCategoryIssues) * 100}%` }} />
                        <div className="h-1 bg-yellow-500 rounded" style={{ width: `${(category.issues.medium / totalCategoryIssues) * 100}%` }} />
                        <div className="h-1 bg-blue-500 rounded" style={{ width: `${(category.issues.low / totalCategoryIssues) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Critical Issues & Recommendations */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Critical Issues */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Critical Issues
              </CardTitle>
              <CardDescription>
                Issues requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {criticalIssues.map((issue) => (
                <div key={issue.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{issue.title}</h4>
                    <div className="flex gap-2">
                      {issue.canAutoFix && (
                        <Badge variant="secondary" className="text-xs">
                          Auto-fix
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {issue.effort}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {issue.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {issue.pages} pages affected
                    </span>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Top Recommendations
              </CardTitle>
              <CardDescription>
                Prioritized actions for maximum impact
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec) => (
                <div key={rec.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{rec.title}</h4>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      {rec.estimatedGain}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {rec.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {rec.impact} Impact
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {rec.effort} Effort
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      Get Started
                    </Button>
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