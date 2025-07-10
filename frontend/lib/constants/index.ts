// Navigation Types
export interface NavigationChild {
  title: string;
  href: string;
  icon: string;
}

export interface NavigationItem {
  title: string;
  href: string;
  icon: string;
  description: string;
  children?: NavigationChild[];
}

// Navigation Constants
export const MAIN_NAVIGATION: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'LayoutDashboard',
    description: 'Overview and analytics',
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: 'FolderOpen',
    description: 'Manage your SEO projects',
  },
  {
    title: 'Audit',
    href: '/audit',
    icon: 'Search',
    description: 'SEO audits and analysis',
    children: [
      { title: 'Overview', href: '/audit/proj_1/overview', icon: 'Eye' },
      { title: 'Technical', href: '/audit/proj_1/technical', icon: 'Settings' },
      { title: 'Content', href: '/audit/proj_1/content', icon: 'FileText' },
      { title: 'Performance', href: '/audit/proj_1/performance', icon: 'Zap' },
      {
        title: 'Accessibility',
        href: '/audit/proj_1/accessibility',
        icon: 'UserCheck',
      },
    ],
  },
  {
    title: 'Keywords',
    href: '/keywords',
    icon: 'Hash',
    description: 'Keyword research and tracking',
    children: [
      { title: 'Research', href: '/keywords/proj_1/research', icon: 'Search' },
      { title: 'Tracking', href: '/keywords/proj_1/tracking', icon: 'TrendingUp' },
      { title: 'Analysis', href: '/keywords/proj_1/analysis', icon: 'BarChart3' },
    ],
  },
  {
    title: 'Competitors',
    href: '/competitors',
    icon: 'Users',
    description: 'Competitor analysis',
    children: [
      { title: 'Overview', href: '/competitors/overview', icon: 'Eye' },
      {
        title: 'Comparison',
        href: '/competitors/comparison',
        icon: 'GitCompare',
      },
      { title: 'Gap Analysis', href: '/competitors/gaps', icon: 'Target' },
    ],
  },
  {
    title: 'Content',
    href: '/content',
    icon: 'FileText',
    description: 'Content optimization',
    children: [
      { title: 'Optimization', href: '/content/optimization', icon: 'Wand2' },
      { title: 'Suggestions', href: '/content/suggestions', icon: 'Lightbulb' },
      { title: 'Templates', href: '/content/templates', icon: 'Layout' },
    ],
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: 'FileBarChart',
    description: 'Generate and manage reports',
  },
];

export interface SettingsNavigationItem {
  title: string;
  href: string;
  icon: string;
  description: string;
}

export const SETTINGS_NAVIGATION: SettingsNavigationItem[] = [
  {
    title: 'Profile',
    href: '/settings/profile',
    icon: 'User',
    description: 'Personal information',
  },
  {
    title: 'Billing',
    href: '/settings/billing',
    icon: 'CreditCard',
    description: 'Subscription and billing',
  },
  {
    title: 'Integrations',
    href: '/settings/integrations',
    icon: 'Plug',
    description: 'Connected services',
  },
  {
    title: 'Team',
    href: '/settings/team',
    icon: 'Users',
    description: 'Team management',
  },
];

export const ADMIN_NAVIGATION: SettingsNavigationItem[] = [
  {
    title: 'Users',
    href: '/admin/users',
    icon: 'Users',
    description: 'User management',
  },
  {
    title: 'Subscriptions',
    href: '/admin/subscriptions',
    icon: 'CreditCard',
    description: 'Subscription plans',
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: 'Settings',
    description: 'System configuration',
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: 'BarChart3',
    description: 'Platform analytics',
  },
];

// SEO Score Ranges and Colors
export const SEO_SCORE_RANGES = {
  EXCELLENT: { min: 90, max: 100, color: 'emerald', label: 'Excellent' },
  GOOD: { min: 70, max: 89, color: 'green', label: 'Good' },
  NEEDS_IMPROVEMENT: {
    min: 50,
    max: 69,
    color: 'yellow',
    label: 'Needs Improvement',
  },
  POOR: { min: 0, max: 49, color: 'red', label: 'Poor' },
} as const;

// Issue Priority Colors
export const ISSUE_PRIORITY_COLORS = {
  critical: 'red',
  high: 'orange',
  medium: 'yellow',
  low: 'blue',
} as const;

// Keyword Difficulty Colors
export const KEYWORD_DIFFICULTY_COLORS = {
  easy: 'green',
  medium: 'yellow',
  hard: 'red',
} as const;

// Competition Level Colors
export const COMPETITION_COLORS = {
  low: 'green',
  medium: 'yellow',
  high: 'red',
} as const;

// Chart Colors
export const CHART_COLORS = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  muted: '#6b7280',
} as const;

// Status Colors
export const STATUS_COLORS = {
  active: 'green',
  pending: 'yellow',
  error: 'red',
  paused: 'gray',
  archived: 'gray',
} as const;

// Subscription Plans
export const SUBSCRIPTION_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small businesses and freelancers',
    price: 29,
    interval: 'month' as const,
    features: [
      'Up to 3 projects',
      '5 websites per project',
      '100 keywords tracked',
      'Monthly SEO audits',
      'Basic reporting',
      'Email support',
    ],
    limits: {
      projects: 3,
      websites: 5,
      keywords: 100,
      reports: 10,
      teamMembers: 1,
      apiCalls: 1000,
    },
    isPopular: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Ideal for growing agencies and marketing teams',
    price: 99,
    interval: 'month' as const,
    features: [
      'Up to 10 projects',
      '25 websites per project',
      '1,000 keywords tracked',
      'Weekly SEO audits',
      'Advanced reporting',
      'White-label reports',
      'Priority support',
      'Team collaboration',
    ],
    limits: {
      projects: 10,
      websites: 25,
      keywords: 1000,
      reports: 100,
      teamMembers: 5,
      apiCalls: 10000,
    },
    isPopular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large agencies and enterprises',
    price: 299,
    interval: 'month' as const,
    features: [
      'Unlimited projects',
      'Unlimited websites',
      '10,000 keywords tracked',
      'Daily SEO audits',
      'Custom reporting',
      'Full white-label solution',
      '24/7 phone support',
      'Custom integrations',
      'Dedicated account manager',
    ],
    limits: {
      projects: -1, // -1 = unlimited
      websites: -1,
      keywords: 10000,
      reports: -1,
      teamMembers: -1,
      apiCalls: 100000,
    },
    isEnterprise: true,
  },
] as const;

// Page Size Options
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;

// Date Range Options
export const DATE_RANGE_OPTIONS = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 3 months', value: '3m' },
  { label: 'Last 6 months', value: '6m' },
  { label: 'Last year', value: '1y' },
  { label: 'Custom', value: 'custom' },
] as const;

// Search Engine Options
export const SEARCH_ENGINE_OPTIONS = [
  { label: 'Google', value: 'google' },
  { label: 'Bing', value: 'bing' },
  { label: 'Yahoo', value: 'yahoo' },
] as const;

// Device Type Options
export const DEVICE_TYPE_OPTIONS = [
  { label: 'Desktop', value: 'desktop' },
  { label: 'Mobile', value: 'mobile' },
] as const;

// Location Options (top countries for SEO)
export const LOCATION_OPTIONS = [
  { label: 'United States', value: 'US' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'Canada', value: 'CA' },
  { label: 'Australia', value: 'AU' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' },
  { label: 'Netherlands', value: 'NL' },
  { label: 'Spain', value: 'ES' },
  { label: 'Italy', value: 'IT' },
  { label: 'Brazil', value: 'BR' },
  { label: 'India', value: 'IN' },
  { label: 'Japan', value: 'JP' },
] as const;

// Keyword Intent Options
export const KEYWORD_INTENT_OPTIONS = [
  { label: 'Informational', value: 'informational', color: 'blue' },
  { label: 'Navigational', value: 'navigational', color: 'green' },
  { label: 'Transactional', value: 'transactional', color: 'red' },
  { label: 'Commercial', value: 'commercial', color: 'purple' },
] as const;

// Content Type Options
export const CONTENT_TYPE_OPTIONS = [
  { label: 'Blog Post', value: 'blog' },
  { label: 'Landing Page', value: 'landing' },
  { label: 'Product Page', value: 'product' },
  { label: 'Category Page', value: 'category' },
  { label: 'About Page', value: 'about' },
  { label: 'Contact Page', value: 'contact' },
  { label: 'FAQ Page', value: 'faq' },
] as const;

// Report Template Options
export const REPORT_TEMPLATE_OPTIONS = [
  { label: 'Executive Summary', value: 'executive' },
  { label: 'Technical Audit', value: 'technical' },
  { label: 'Content Analysis', value: 'content' },
  { label: 'Keyword Report', value: 'keywords' },
  { label: 'Competitor Analysis', value: 'competitors' },
  { label: 'Comprehensive Report', value: 'comprehensive' },
] as const;

// Report Format Options
export const REPORT_FORMAT_OPTIONS = [
  { label: 'PDF Document', value: 'pdf', icon: 'FileText' },
  { label: 'Excel Spreadsheet', value: 'excel', icon: 'FileSpreadsheet' },
  {
    label: 'PowerPoint Presentation',
    value: 'presentation',
    icon: 'Presentation',
  },
] as const;

// Crawl Frequency Options
export const CRAWL_FREQUENCY_OPTIONS = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
] as const;

// File Size Limits
export const FILE_SIZE_LIMITS = {
  avatar: 2 * 1024 * 1024, // 2MB
  logo: 5 * 1024 * 1024, // 5MB
  report: 50 * 1024 * 1024, // 50MB
} as const;

// API Rate Limits
export const RATE_LIMITS = {
  starter: 100,
  professional: 1000,
  enterprise: 10000,
} as const;

// Default Values
export const DEFAULTS = {
  pageSize: 25,
  crawlFrequency: 'weekly',
  searchEngine: 'google',
  deviceType: 'desktop',
  location: 'US',
  dateRange: '30d',
} as const;

// Validation Patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  domain:
    /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])*$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  phone: /^\+?[1-9]\d{1,14}$/,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  required: 'This field is required',
  invalidEmail: 'Please enter a valid email address',
  invalidUrl: 'Please enter a valid URL',
  invalidDomain: 'Please enter a valid domain',
  weakPassword:
    'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
  passwordMismatch: 'Passwords do not match',
  maxFileSize: 'File size exceeds maximum allowed size',
  unsupportedFileType: 'File type not supported',
  networkError: 'Network error. Please check your connection and try again.',
  serverError: 'Server error. Please try again later.',
  unauthorized: 'You are not authorized to perform this action',
  notFound: 'The requested resource was not found',
  rateLimited: 'Too many requests. Please wait and try again.',
  subscriptionRequired: 'This feature requires a paid subscription',
  quotaExceeded: 'You have exceeded your quota for this feature',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  saved: 'Changes saved successfully',
  created: 'Created successfully',
  updated: 'Updated successfully',
  deleted: 'Deleted successfully',
  uploaded: 'File uploaded successfully',
  sent: 'Sent successfully',
  copied: 'Copied to clipboard',
  exported: 'Export completed successfully',
  imported: 'Import completed successfully',
  synchronized: 'Synchronized successfully',
} as const;

// Loading Messages
export const LOADING_MESSAGES = {
  saving: 'Saving changes...',
  loading: 'Loading...',
  processing: 'Processing...',
  uploading: 'Uploading file...',
  downloading: 'Downloading...',
  analyzing: 'Analyzing...',
  crawling: 'Crawling website...',
  generating: 'Generating report...',
  synchronizing: 'Synchronizing data...',
  authenticating: 'Authenticating...',
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  aiRecommendations: true,
  whiteLabel: true,
  apiAccess: true,
  advancedAnalytics: true,
  realTimeMonitoring: true,
  customIntegrations: true,
  bulkOperations: true,
  exportData: true,
  teamCollaboration: true,
  customReports: true,
} as const;
