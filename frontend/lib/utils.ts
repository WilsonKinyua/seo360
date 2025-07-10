import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  SEO_SCORE_RANGES,
  ISSUE_PRIORITY_COLORS,
  KEYWORD_DIFFICULTY_COLORS,
} from '@/lib/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date formatting utilities
export function formatDate(
  date: string | Date,
  format: 'short' | 'long' | 'relative' = 'short'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (format === 'relative') {
    return getRelativeTime(dateObj);
  }

  const options: Intl.DateTimeFormatOptions =
    format === 'long'
      ? {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }
      : { year: 'numeric', month: 'short', day: 'numeric' };

  return dateObj.toLocaleDateString('en-US', options);
}

export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}

// Number formatting utilities
export function formatNumber(
  num: number,
  type: 'default' | 'compact' | 'currency' | 'percentage' = 'default'
): string {
  switch (type) {
    case 'compact':
      return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(
        num
      );
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(num);
    case 'percentage':
      return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 1,
      }).format(num / 100);
    default:
      return new Intl.NumberFormat('en-US').format(num);
  }
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function formatDuration(seconds: number): string {
  if (seconds < 1) return `${Math.round(seconds * 1000)}ms`;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}

// SEO Score utilities
export function getSEOScoreColor(score: number): string {
  if (score >= SEO_SCORE_RANGES.EXCELLENT.min)
    return SEO_SCORE_RANGES.EXCELLENT.color;
  if (score >= SEO_SCORE_RANGES.GOOD.min) return SEO_SCORE_RANGES.GOOD.color;
  if (score >= SEO_SCORE_RANGES.NEEDS_IMPROVEMENT.min)
    return SEO_SCORE_RANGES.NEEDS_IMPROVEMENT.color;
  return SEO_SCORE_RANGES.POOR.color;
}

export function getSEOScoreLabel(score: number): string {
  if (score >= SEO_SCORE_RANGES.EXCELLENT.min)
    return SEO_SCORE_RANGES.EXCELLENT.label;
  if (score >= SEO_SCORE_RANGES.GOOD.min) return SEO_SCORE_RANGES.GOOD.label;
  if (score >= SEO_SCORE_RANGES.NEEDS_IMPROVEMENT.min)
    return SEO_SCORE_RANGES.NEEDS_IMPROVEMENT.label;
  return SEO_SCORE_RANGES.POOR.label;
}

export function calculateOverallScore(scores: {
  [key: string]: number;
}): number {
  const values = Object.values(scores).filter((score) => !isNaN(score));
  return values.length > 0
    ? Math.round(values.reduce((sum, score) => sum + score, 0) / values.length)
    : 0;
}

// Issue priority utilities
export function getIssuePriorityColor(
  priority: 'critical' | 'high' | 'medium' | 'low'
): string {
  return ISSUE_PRIORITY_COLORS[priority] || 'gray';
}

export function getIssuePriorityOrder(
  priority: 'critical' | 'high' | 'medium' | 'low'
): number {
  const order = { critical: 1, high: 2, medium: 3, low: 4 };
  return order[priority] || 5;
}

// Keyword utilities
export function getKeywordDifficultyColor(difficulty: number): string {
  if (difficulty <= 30) return KEYWORD_DIFFICULTY_COLORS.easy;
  if (difficulty <= 70) return KEYWORD_DIFFICULTY_COLORS.medium;
  return KEYWORD_DIFFICULTY_COLORS.hard;
}

export function getKeywordDifficultyLabel(difficulty: number): string {
  if (difficulty <= 30) return 'Easy';
  if (difficulty <= 70) return 'Medium';
  return 'Hard';
}

export function calculateKeywordOpportunity(
  volume: number,
  difficulty: number,
  currentPosition?: number
): 'high' | 'medium' | 'low' {
  const volumeScore = volume > 1000 ? 3 : volume > 100 ? 2 : 1;
  const difficultyScore = difficulty < 30 ? 3 : difficulty < 70 ? 2 : 1;
  const positionScore = currentPosition
    ? currentPosition > 10
      ? 1
      : currentPosition > 3
      ? 2
      : 3
    : 2;

  const totalScore = volumeScore + difficultyScore + positionScore;

  if (totalScore >= 8) return 'high';
  if (totalScore >= 6) return 'medium';
  return 'low';
}

// URL utilities
export function getDomainFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function sanitizeUrl(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

// Text utilities
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function extractKeywords(
  text: string,
  maxKeywords: number = 10
): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 3);

  const wordCount = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxKeywords)
    .map(([word]) => word);
}

// Performance utilities
export function getCoreWebVitalScore(
  metric: 'lcp' | 'fid' | 'cls',
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = {
    lcp: { good: 2.5, poor: 4.0 },
    fid: { good: 100, poor: 300 },
    cls: { good: 0.1, poor: 0.25 },
  };

  const threshold = thresholds[metric];
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

export function getPageSpeedScore(desktop: number, mobile: number): number {
  return Math.round((desktop + mobile) / 2);
}

// Chart utilities
export function generateChartData(
  data: number[],
  labels: string[],
  label: string = 'Data'
): { labels: string[]; datasets: any[] } {
  return {
    labels,
    datasets: [
      {
        label,
        data,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };
}

export function generateTrendData(
  currentValue: number,
  previousValue: number
): {
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  changePercentage: number;
} {
  const change = currentValue - previousValue;
  const changePercentage =
    previousValue === 0 ? 0 : Math.round((change / previousValue) * 100);

  return {
    change,
    changeType: change > 0 ? 'increase' : change < 0 ? 'decrease' : 'neutral',
    changePercentage: Math.abs(changePercentage),
  };
}

// Color utilities
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'green',
    pending: 'yellow',
    error: 'red',
    failed: 'red',
    completed: 'green',
    running: 'blue',
    paused: 'gray',
    archived: 'gray',
  };
  return colors[status] || 'gray';
}

export function hexToRgb(
  hex: string
): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Validation utilities
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validateDomain(domain: string): boolean {
  const domainRegex =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*$/;
  return domainRegex.test(domain);
}

export function validatePassword(password: string): boolean {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// Array utilities
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key]);
    groups[groupKey] = groups[groupKey] || [];
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

export function sortBy<T>(
  array: T[],
  key: keyof T,
  direction: 'asc' | 'desc' = 'asc'
): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

export function filterBySearch<T>(
  array: T[],
  searchTerm: string,
  searchKeys: (keyof T)[]
): T[] {
  if (!searchTerm) return array;

  const term = searchTerm.toLowerCase();
  return array.filter((item) =>
    searchKeys.some((key) => String(item[key]).toLowerCase().includes(term))
  );
}

// Local storage utilities
export function setLocalStorage(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function getLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
}

export function removeLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
}

// Clipboard utilities
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
}

// Download utilities
export function downloadFile(
  content: string,
  filename: string,
  contentType: string = 'text/plain'
): void {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Debounce utility
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Random utilities
export function generateId(length: number = 8): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateColor(): string {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  );
}

// Feature flag utilities
export function isFeatureEnabled(feature: string): boolean {
  // In a real app, this would check against user's subscription or feature flags
  return true;
}

// Error handling utilities
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unexpected error occurred';
}

export function isNetworkError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.name === 'NetworkError' ||
      error.message.includes('fetch') ||
      error.message.includes('network'))
  );
}
