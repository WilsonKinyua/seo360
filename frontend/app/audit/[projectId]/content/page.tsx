"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { FileText, Hash, Eye, BookOpen, Target, TrendingUp } from "lucide-react"
import { use } from "react"

const contentIssues = [
  {
    id: 1,
    page: "/blog/seo-guide",
    title: "Missing H1 Tag",
    type: "Structure",
    severity: "high",
    impact: "Poor content hierarchy"
  },
  {
    id: 2,
    page: "/products/seo-tool",
    title: "Thin Content",
    type: "Quality",
    severity: "medium", 
    impact: "Low keyword relevance"
  },
  {
    id: 3,
    page: "/about",
    title: "Duplicate Content",
    type: "Uniqueness",
    severity: "high",
    impact: "Ranking cannibalization"
  }
]

const contentMetrics = [
  { label: "Total Pages", value: 89, trend: "+5" },
  { label: "Avg Word Count", value: 847, trend: "+12%" },
  { label: "Content Quality Score", value: 75, trend: "+3" },
  { label: "Keyword Density", value: "2.1%", trend: "optimal" }
]

export default function ContentAuditPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params)
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-600 bg-red-50"
      case "medium": return "text-yellow-600 bg-yellow-50"
      case "low": return "text-blue-600 bg-blue-50"
      default: return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Audit</h1>
          <p className="text-muted-foreground">
            Content quality, optimization, and relevance analysis
          </p>
        </div>

        {/* Content Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {contentMetrics.map((metric) => (
            <Card key={metric.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  <Badge variant="secondary">{metric.trend}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Content Issues</CardTitle>
            <CardDescription>
              Identified content optimization opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Impact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contentIssues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell className="font-medium">{issue.page}</TableCell>
                    <TableCell>{issue.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{issue.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getSeverityColor(issue.severity)}>
                        {issue.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {issue.impact}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Content Analysis */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Content Structure</CardTitle>
              <CardDescription>Heading hierarchy and organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>H1 Tags</span>
                <div className="flex items-center gap-2">
                  <Progress value={85} className="w-20" />
                  <span className="text-sm">85%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>H2-H6 Structure</span>
                <div className="flex items-center gap-2">
                  <Progress value={72} className="w-20" />
                  <span className="text-sm">72%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Internal Linking</span>
                <div className="flex items-center gap-2">
                  <Progress value={68} className="w-20" />
                  <span className="text-sm">68%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Keyword Optimization</CardTitle>
              <CardDescription>Target keyword usage and density</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Title Optimization</span>
                <div className="flex items-center gap-2">
                  <Progress value={78} className="w-20" />
                  <span className="text-sm">78%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Meta Descriptions</span>
                <div className="flex items-center gap-2">
                  <Progress value={63} className="w-20" />
                  <span className="text-sm">63%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Content Keywords</span>
                <div className="flex items-center gap-2">
                  <Progress value={71} className="w-20" />
                  <span className="text-sm">71%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
} 