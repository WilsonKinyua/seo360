"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Shield, Eye, Users, AlertTriangle, CheckCircle } from "lucide-react"
import { use } from "react"

const accessibilityData = {
  overallScore: 76,
  wcagCompliance: {
    level: "AA",
    score: 82
  },
  issues: {
    critical: 2,
    high: 5,
    medium: 8,
    low: 12
  },
  categories: {
    perceivable: 78,
    operable: 74,
    understandable: 80,
    robust: 72
  }
}

export default function AccessibilityAuditPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params)

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accessibility Audit</h1>
          <p className="text-muted-foreground">
            WCAG compliance and accessibility assessment
          </p>
        </div>

        {/* Accessibility Score */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Overall Score</span>
              </div>
              <div className="text-3xl font-bold text-purple-600">{accessibilityData.overallScore}</div>
              <Progress value={accessibilityData.overallScore} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium">WCAG {accessibilityData.wcagCompliance.level}</span>
              </div>
              <div className="text-3xl font-bold text-green-600">{accessibilityData.wcagCompliance.score}%</div>
              <Progress value={accessibilityData.wcagCompliance.score} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="font-medium">Critical Issues</span>
              </div>
              <div className="text-3xl font-bold text-red-600">{accessibilityData.issues.critical}</div>
              <div className="text-sm text-muted-foreground">Require immediate attention</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Total Issues</span>
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {Object.values(accessibilityData.issues).reduce((sum, count) => sum + count, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Across all severity levels</div>
            </CardContent>
          </Card>
        </div>

        {/* WCAG Categories */}
        <Card>
          <CardHeader>
            <CardTitle>WCAG 2.1 Principles</CardTitle>
            <CardDescription>
              Compliance scores for the four main accessibility principles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {Object.entries(accessibilityData.categories).map(([principle, score]) => (
                <div key={principle} className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{score}%</div>
                  <div className="text-sm font-medium mb-2 capitalize">{principle}</div>
                  <Progress value={score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Issues Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Issues by Severity</CardTitle>
            <CardDescription>
              Accessibility violations categorized by impact level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 border rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {accessibilityData.issues.critical}
                </div>
                <div className="text-sm font-medium mb-1">Critical</div>
                <Badge className="bg-red-100 text-red-700">
                  Blocks users
                </Badge>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {accessibilityData.issues.high}
                </div>
                <div className="text-sm font-medium mb-1">High</div>
                <Badge className="bg-orange-100 text-orange-700">
                  Major barriers
                </Badge>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-1">
                  {accessibilityData.issues.medium}
                </div>
                <div className="text-sm font-medium mb-1">Medium</div>
                <Badge className="bg-yellow-100 text-yellow-700">
                  Minor issues
                </Badge>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {accessibilityData.issues.low}
                </div>
                <div className="text-sm font-medium mb-1">Low</div>
                <Badge className="bg-blue-100 text-blue-700">
                  Improvements
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
} 