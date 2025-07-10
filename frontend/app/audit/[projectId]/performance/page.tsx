"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Zap, Clock, TrendingUp, Monitor, Smartphone } from "lucide-react"
import { use } from "react"

const performanceData = {
  overall: 79,
  desktop: 85,
  mobile: 73,
  coreWebVitals: {
    lcp: { value: 2.1, status: "good", label: "Largest Contentful Paint" },
    fid: { value: 89, status: "good", label: "First Input Delay" },
    cls: { value: 0.08, status: "good", label: "Cumulative Layout Shift" }
  },
  metrics: {
    fcp: { value: 1.8, label: "First Contentful Paint" },
    tti: { value: 3.2, label: "Time to Interactive" },
    tbt: { value: 150, label: "Total Blocking Time" },
    si: { value: 2.4, label: "Speed Index" }
  }
}

export default function PerformanceAuditPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params)
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Audit</h1>
          <p className="text-muted-foreground">
            Page speed analysis and Core Web Vitals assessment
          </p>
        </div>

        {/* Performance Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                <CardTitle className="text-lg">Desktop Score</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{performanceData.desktop}</div>
              <Progress value={performanceData.desktop} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                <CardTitle className="text-lg">Mobile Score</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{performanceData.mobile}</div>
              <Progress value={performanceData.mobile} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                <CardTitle className="text-lg">Overall Score</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{performanceData.overall}</div>
              <Progress value={performanceData.overall} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Core Web Vitals */}
        <Card>
          <CardHeader>
            <CardTitle>Core Web Vitals</CardTitle>
            <CardDescription>
              Google's key performance metrics for user experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              {Object.entries(performanceData.coreWebVitals).map(([key, vital]) => (
                <div key={key} className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {vital.value}{key === 'fid' ? 'ms' : key === 'lcp' ? 's' : ''}
                  </div>
                  <div className="text-sm font-medium mb-2">{vital.label}</div>
                  <Badge className="bg-green-100 text-green-700">
                    {vital.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Detailed performance measurements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Object.entries(performanceData.metrics).map(([key, metric]) => (
                <div key={key} className="p-4 border rounded-lg">
                  <div className="text-lg font-bold">{metric.value}s</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 