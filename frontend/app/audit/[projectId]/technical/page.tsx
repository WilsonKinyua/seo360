"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Settings,
  Search,
  Link,
  FileText,
  Shield,
  Globe,
  Clock,
  ExternalLink
} from "lucide-react"
import { use } from "react"

// Dummy technical audit data
const technicalIssues = [
  {
    id: 1,
    type: "Crawl Error",
    severity: "critical",
    title: "404 Errors Found",
    description: "8 pages return 404 status codes",
    pages: 8,
    impact: "Search engines cannot index these pages",
    solution: "Fix broken links or redirect to relevant pages"
  },
  {
    id: 2,
    type: "Indexing",
    severity: "high", 
    title: "Duplicate Meta Descriptions",
    description: "15 pages have duplicate meta descriptions",
    pages: 15,
    impact: "Reduced SERP visibility and click-through rates",
    solution: "Write unique meta descriptions for each page"
  },
  {
    id: 3,
    type: "Structure",
    severity: "medium",
    title: "Missing Alt Attributes",
    description: "23 images missing alt attributes",
    pages: 12,
    impact: "Poor accessibility and image SEO",
    solution: "Add descriptive alt text to all images"
  }
]

const crawlData = [
  { metric: "Pages Discovered", value: 156, status: "good" },
  { metric: "Pages Crawled", value: 142, status: "good" },
  { metric: "Crawl Errors", value: 8, status: "error" },
  { metric: "Redirect Chains", value: 3, status: "warning" },
  { metric: "Orphaned Pages", value: 2, status: "warning" }
]

const sitemapData = [
  { file: "sitemap.xml", pages: 89, status: "valid", lastModified: "2024-01-20" },
  { file: "sitemap-pages.xml", pages: 67, status: "valid", lastModified: "2024-01-18" },
  { file: "sitemap-products.xml", pages: 245, status: "error", lastModified: "2024-01-15" }
]

export default function TechnicalAuditPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params)
  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-green-600 bg-green-50"
      case "warning": return "text-yellow-600 bg-yellow-50"
      case "error": return "text-red-600 bg-red-50"
      default: return "text-gray-600 bg-gray-50"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-600 bg-red-50"
      case "high": return "text-orange-600 bg-orange-50"
      case "medium": return "text-yellow-600 bg-yellow-50"
      case "low": return "text-blue-600 bg-blue-50"
      default: return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Technical SEO Audit</h1>
            <p className="text-muted-foreground">
              Crawlability, indexing, and technical foundation analysis
            </p>
          </div>
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Run Technical Scan
          </Button>
        </div>

        {/* Technical Score Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {crawlData.map((item) => (
            <Card key={item.metric}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {item.metric}
                    </p>
                    <p className="text-2xl font-bold">{item.value}</p>
                  </div>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Issues Table */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Issues</CardTitle>
            <CardDescription>
              Identified technical SEO problems requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Issue</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Pages</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {technicalIssues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{issue.title}</p>
                        <p className="text-sm text-muted-foreground">{issue.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{issue.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getSeverityColor(issue.severity)}>
                        {issue.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>{issue.pages}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Sitemap Status */}
        <Card>
          <CardHeader>
            <CardTitle>Sitemap Analysis</CardTitle>
            <CardDescription>
              XML sitemap status and validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sitemap File</TableHead>
                  <TableHead>Pages</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sitemapData.map((sitemap) => (
                  <TableRow key={sitemap.file}>
                    <TableCell className="font-medium">{sitemap.file}</TableCell>
                    <TableCell>{sitemap.pages}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(sitemap.status)}>
                        {sitemap.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{sitemap.lastModified}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="mr-2 h-3 w-3" />
                        View
                      </Button>
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