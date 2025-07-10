"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, Eye, AlertTriangle } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  changeType?: 'increase' | 'decrease' | 'neutral'
  trend?: number[]
  icon?: React.ComponentType<any>
  color?: 'green' | 'red' | 'yellow' | 'blue' | 'purple' | 'gray'
  format?: 'number' | 'percentage' | 'currency' | 'duration'
  description?: string
  status?: 'good' | 'warning' | 'error' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const colorClasses = {
  green: {
    icon: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400",
    value: "text-emerald-700 dark:text-emerald-300",
    trend: "text-emerald-600"
  },
  red: {
    icon: "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400",
    value: "text-red-700 dark:text-red-300",
    trend: "text-red-600"
  },
  yellow: {
    icon: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-400",
    value: "text-yellow-700 dark:text-yellow-300",
    trend: "text-yellow-600"
  },
  blue: {
    icon: "text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400",
    value: "text-blue-700 dark:text-blue-300",
    trend: "text-blue-600"
  },
  purple: {
    icon: "text-purple-600 bg-purple-50 dark:bg-purple-950 dark:text-purple-400",
    value: "text-purple-700 dark:text-purple-300",
    trend: "text-purple-600"
  },
  gray: {
    icon: "text-gray-600 bg-gray-50 dark:bg-gray-950 dark:text-gray-400",
    value: "text-gray-700 dark:text-gray-300",
    trend: "text-gray-600"
  }
}

const sizeClasses = {
  sm: {
    card: "p-3",
    icon: "h-4 w-4",
    iconContainer: "h-8 w-8",
    title: "text-xs",
    value: "text-lg",
    change: "text-xs"
  },
  md: {
    card: "p-4",
    icon: "h-5 w-5",
    iconContainer: "h-10 w-10",
    title: "text-sm",
    value: "text-2xl",
    change: "text-sm"
  },
  lg: {
    card: "p-6",
    icon: "h-6 w-6",
    iconContainer: "h-12 w-12",
    title: "text-base",
    value: "text-3xl",
    change: "text-base"
  }
}

export function MetricCard({
  title,
  value,
  change,
  changeType = 'neutral',
  trend,
  icon: Icon,
  color = 'blue',
  format = 'number',
  description,
  status,
  size = 'md',
  className
}: MetricCardProps) {
  const colors = colorClasses[color]
  const sizes = sizeClasses[size]

  const formatValue = (val: string | number) => {
    if (typeof val === 'string') return val
    
    switch (format) {
      case 'percentage':
        return `${val}%`
      case 'currency':
        return new Intl.NumberFormat('en-US', { 
          style: 'currency', 
          currency: 'USD' 
        }).format(val)
      case 'duration':
        return `${val}s`
      default:
        return new Intl.NumberFormat('en-US').format(val)
    }
  }

  const getTrendIcon = () => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="h-3 w-3" />
      case 'decrease':
        return <TrendingDown className="h-3 w-3" />
      default:
        return <Minus className="h-3 w-3" />
    }
  }

  const getTrendColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-emerald-600'
      case 'decrease':
        return 'text-red-600'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'good':
        return <div className="h-2 w-2 rounded-full bg-emerald-500" />
      case 'warning':
        return <AlertTriangle className="h-3 w-3 text-yellow-500" />
      case 'error':
        return <div className="h-2 w-2 rounded-full bg-red-500" />
      default:
        return null
    }
  }

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className={sizes.card}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className={cn("font-medium", sizes.title)}>
                {title}
              </CardTitle>
              {getStatusIcon()}
            </div>
            
            <div className={cn("font-bold tracking-tight", sizes.value, colors.value)}>
              {formatValue(value)}
            </div>

            {change !== undefined && (
              <div className={cn("flex items-center gap-1 mt-1", sizes.change)}>
                <span className={getTrendColor()}>
                  {getTrendIcon()}
                </span>
                <span className={getTrendColor()}>
                  {Math.abs(change)}
                  {format === 'percentage' ? 'pp' : '%'}
                </span>
                <span className="text-muted-foreground">vs last period</span>
              </div>
            )}

            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>

          {Icon && (
            <div className={cn(
              "rounded-full flex items-center justify-center",
              sizes.iconContainer,
              colors.icon
            )}>
              <Icon className={sizes.icon} />
            </div>
          )}
        </div>

        {trend && trend.length > 0 && (
          <div className="mt-4">
            <div className="flex items-end gap-1 h-8">
              {trend.map((point, index) => (
                <div
                  key={index}
                  className={cn("bg-current rounded-sm w-1", colors.trend)}
                  style={{ 
                    height: `${Math.max(2, (point / Math.max(...trend)) * 100)}%`,
                    opacity: 0.6 + (index / trend.length) * 0.4
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 