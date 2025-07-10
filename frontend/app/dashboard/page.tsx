"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MetricCard } from "@/components/ui/metric-card"
import { SEOScoreRing } from "@/components/ui/seo-score-ring"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Activity,
  Globe,
  Zap
} from "lucide-react"
import {
  dummyDashboardMetrics,
  dummyIssuesByCategory,
  dummyRecentActivities,
  dummyTopContent,
  dummyTrafficTrend,
  dummyKeywordTrend
} from "@/lib/data/dummy-data"
import { formatNumber, formatDate } from "@/lib/utils"

export default function DashboardPage() {
  // Calculate overall health score
  const overallScore = 78
  const trafficGrowth = 12.5
  const keywordGrowth = 8.7
  const issuesCount = Object.values(dummyIssuesByCategory).reduce((sum, count) => sum + count, 0)

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's how your SEO is performing.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <BarChart3 className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button size="sm">
              <Zap className="mr-2 h-4 w-4" />
              Run Audit
            </Button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Organic Traffic"
            value={73660}
            change={trafficGrowth}
            changeType="increase"
            color="green"
            format="number"
            icon={Users}
            trend={[65000, 67000, 71000, 69000, 73000, 76000, 78000]}
          />
          <MetricCard
            title="Average Position"
            value={8.4}
            change={-2.3}
            changeType="decrease"
            color="blue"
            format="number"
            icon={Search}
            trend={[10.2, 9.8, 9.1, 8.7, 8.4]}
          />
          <MetricCard
            title="Keywords Ranking"
            value={1189}
            change={keywordGrowth}
            changeType="increase"
            color="purple"
            format="number"
            icon={TrendingUp}
            trend={[1050, 1120, 1089, 1156, 1189]}
          />
          <MetricCard
            title="Domain Authority"
            value={65}
            change={3.2}
            changeType="increase"
            color="yellow"
            format="number"
            icon={Globe}
            trend={[58, 60, 62, 63, 65]}
          />
        </div>

        {/* Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* SEO Health Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                SEO Health Score
              </CardTitle>
              <CardDescription>
                Overall performance across all websites
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="text-center space-y-4">
                <SEOScoreRing
                  score={overallScore}
                  size="xl"
                  showLabel
                  animate
                />
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Technical SEO</span>
                    <span className="font-medium">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />

                  <div className="flex items-center justify-between text-sm">
                    <span>Content Quality</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />

                  <div className="flex items-center justify-between text-sm">
                    <span>Performance</span>
                    <span className="font-medium">79%</span>
                  </div>
                  <Progress value={79} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Issues Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Issues Overview
              </CardTitle>
              <CardDescription>
                {issuesCount} total issues found across all websites
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-sm">Critical</span>
                    </div>
                    <span className="font-bold text-red-600">{dummyIssuesByCategory.critical}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500" />
                      <span className="text-sm">High</span>
                    </div>
                    <span className="font-bold text-orange-600">{dummyIssuesByCategory.high}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="text-sm">Medium</span>
                    </div>
                    <span className="font-bold text-yellow-600">{dummyIssuesByCategory.medium}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-sm">Low</span>
                    </div>
                    <span className="font-bold text-blue-600">{dummyIssuesByCategory.low}</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View All Issues
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest updates from your SEO monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dummyRecentActivities.slice(0, 3).map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="mt-1">
                      {activity.type === "audit_completed" && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      {activity.type === "ranking_improved" && (
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                      )}
                      {activity.type === "new_backlink" && (
                        <Activity className="h-4 w-4 text-purple-600" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(activity.timestamp, 'relative')}
                      </p>
                    </div>
                  </div>
                ))}

                <Button variant="ghost" className="w-full text-sm">
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Traffic Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Organic Traffic Trend</CardTitle>
              <CardDescription>
                Traffic growth over the past 7 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg">
                {/* Placeholder for chart - would use recharts in real implementation */}
                <div className="text-center space-y-2">
                  <TrendingUp className="h-12 w-12 text-green-500 mx-auto" />
                  <p className="text-lg font-semibold text-green-600">
                    +{trafficGrowth}% Growth
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Chart visualization would go here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Keyword Rankings */}
          <Card>
            <CardHeader>
              <CardTitle>Keyword Rankings</CardTitle>
              <CardDescription>
                Keywords performance in top 10 positions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg">
                {/* Placeholder for chart - would use recharts in real implementation */}
                <div className="text-center space-y-2">
                  <BarChart3 className="h-12 w-12 text-blue-500 mx-auto" />
                  <p className="text-lg font-semibold text-blue-600">
                    {formatNumber(1189)} Keywords
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ranking distribution chart would go here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Content */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
            <CardDescription>
              Your best content by traffic and conversions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dummyTopContent.map((content, index) => (
                <div key={content.url} className="flex items-center gap-4 p-4 rounded-lg border">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium">{content.title}</h4>
                    <p className="text-sm text-muted-foreground">{content.url}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{formatNumber(content.traffic)} visitors</span>
                      <span>{content.conversions} conversions</span>
                      <span>Pos. {content.avgPosition}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 