"use client"

import { cn } from "@/lib/utils"
import { getSEOScoreColor, getSEOScoreLabel } from "@/lib/utils"

interface SEOScoreRingProps {
  score: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showLabel?: boolean
  showScore?: boolean
  className?: string
  strokeWidth?: number
  animate?: boolean
}

const sizeClasses = {
  sm: {
    container: "w-12 h-12",
    text: "text-xs",
    label: "text-[8px]"
  },
  md: {
    container: "w-16 h-16",
    text: "text-sm",
    label: "text-xs"
  },
  lg: {
    container: "w-24 h-24",
    text: "text-lg",
    label: "text-sm"
  },
  xl: {
    container: "w-32 h-32",
    text: "text-2xl",
    label: "text-base"
  }
}

const colorMap = {
  emerald: {
    stroke: "stroke-emerald-500",
    bg: "stroke-emerald-100 dark:stroke-emerald-900",
    text: "text-emerald-600 dark:text-emerald-400"
  },
  green: {
    stroke: "stroke-green-500",
    bg: "stroke-green-100 dark:stroke-green-900",
    text: "text-green-600 dark:text-green-400"
  },
  yellow: {
    stroke: "stroke-yellow-500",
    bg: "stroke-yellow-100 dark:stroke-yellow-900",
    text: "text-yellow-600 dark:text-yellow-400"
  },
  red: {
    stroke: "stroke-red-500",
    bg: "stroke-red-100 dark:stroke-red-900",
    text: "text-red-600 dark:text-red-400"
  }
}

export function SEOScoreRing({
  score,
  size = 'md',
  showLabel = false,
  showScore = true,
  className,
  strokeWidth = 4,
  animate = true
}: SEOScoreRingProps) {
  const normalizedScore = Math.max(0, Math.min(100, score))
  const color = getSEOScoreColor(normalizedScore)
  const label = getSEOScoreLabel(normalizedScore)
  const sizes = sizeClasses[size]
  const colors = colorMap[color as keyof typeof colorMap] || colorMap.red

  // Calculate circle properties
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <div className={cn("relative", sizes.container)}>
        <svg
          className="transform -rotate-90 w-full h-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className={colors.bg}
          />
          
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className={cn(colors.stroke, animate && "transition-all duration-1000 ease-out")}
            style={{
              strokeDasharray,
              strokeDashoffset: animate ? strokeDashoffset : 0,
            }}
          />
        </svg>

        {/* Score text */}
        {showScore && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn("font-bold", sizes.text, colors.text)}>
              {Math.round(normalizedScore)}
            </span>
          </div>
        )}
      </div>

      {/* Label */}
      {showLabel && (
        <span className={cn("mt-1 font-medium text-center", sizes.label, colors.text)}>
          {label}
        </span>
      )}
    </div>
  )
} 