// User & Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user' | 'agency_owner' | 'team_member';
  subscription: UserSubscription;
  createdAt: string;
  updatedAt: string;
  googleId?: string;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
}

export interface UserSubscription {
  id: string;
  plan: SubscriptionPlan;
  status: 'active' | 'canceled' | 'past_due' | 'trial';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    projects: number;
    websites: number;
    keywords: number;
    reports: number;
    teamMembers: number;
    apiCalls: number;
  };
  isPopular?: boolean;
  isEnterprise?: boolean;
}

// Project & Website Types
export interface Project {
  id: string;
  name: string;
  description?: string;
  userId: string;
  websites: Website[];
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'paused' | 'archived';
  settings: ProjectSettings;
}

export interface Website {
  id: string;
  url: string;
  projectId: string;
  name: string;
  favicon?: string;
  status: 'active' | 'pending' | 'error';
  lastCrawled?: string;
  crawlStatus: CrawlStatus;
  metrics: WebsiteMetrics;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectSettings {
  trackingEnabled: boolean;
  alertsEnabled: boolean;
  crawlFrequency: 'daily' | 'weekly' | 'monthly';
  maxPages: number;
  excludePatterns: string[];
  includePatterns: string[];
}

export interface CrawlStatus {
  isRunning: boolean;
  lastRun?: string;
  nextRun?: string;
  pagesFound: number;
  pagesCrawled: number;
  errors: number;
  warnings: number;
}

// SEO Audit Types
export interface SEOAudit {
  id: string;
  websiteId: string;
  url: string;
  createdAt: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  overallScore: number;
  scores: {
    technical: number;
    content: number;
    performance: number;
    accessibility: number;
    bestPractices: number;
  };
  issues: SEOIssue[];
  recommendations: SEORecommendation[];
  metrics: AuditMetrics;
}

export interface SEOIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  category: 'technical' | 'content' | 'performance' | 'accessibility' | 'meta';
  title: string;
  description: string;
  impact: 'critical' | 'high' | 'medium' | 'low';
  effort: 'easy' | 'medium' | 'hard';
  pages: string[];
  fixInstructions: string;
  canAutoFix: boolean;
  isFixed?: boolean;
  fixedAt?: string;
}

export interface SEORecommendation {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  estimatedImpact: string;
  actionItems: string[];
  aiGenerated: boolean;
}

export interface AuditMetrics {
  pageSpeed: {
    desktop: number;
    mobile: number;
    fcp: number;
    lcp: number;
    cls: number;
    fid: number;
  };
  accessibility: {
    score: number;
    violations: number;
    warnings: number;
  };
  seo: {
    metaIssues: number;
    headingIssues: number;
    imageIssues: number;
    linkIssues: number;
  };
  technicalSEO: {
    crawlability: number;
    indexability: number;
    sitemapIssues: number;
    robotsIssues: number;
  };
}

// Keyword Research Types
export interface Keyword {
  id: string;
  keyword: string;
  projectId: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  competition: 'low' | 'medium' | 'high';
  trends: number[];
  intent: 'informational' | 'navigational' | 'transactional' | 'commercial';
  position?: number;
  url?: string;
  createdAt: string;
  updatedAt: string;
}

export interface KeywordGroup {
  id: string;
  name: string;
  projectId: string;
  keywords: Keyword[];
  color: string;
  createdAt: string;
}

export interface KeywordRanking {
  id: string;
  keywordId: string;
  position: number;
  url: string;
  change: number;
  date: string;
  searchEngine: 'google' | 'bing' | 'yahoo';
  location: string;
  device: 'desktop' | 'mobile';
}

// Competitor Analysis Types
export interface Competitor {
  id: string;
  projectId: string;
  domain: string;
  name: string;
  addedAt: string;
  metrics: CompetitorMetrics;
  lastAnalyzed?: string;
}

export interface CompetitorMetrics {
  domainAuthority: number;
  organicKeywords: number;
  organicTraffic: number;
  paidKeywords: number;
  backlinks: number;
  referringDomains: number;
  techStack: string[];
}

export interface CompetitorComparison {
  keyword: string;
  myPosition?: number;
  myUrl?: string;
  competitors: {
    domain: string;
    position: number;
    url: string;
  }[];
  opportunity: 'high' | 'medium' | 'low';
  difficulty: number;
}

// Content Optimization Types
export interface ContentAnalysis {
  id: string;
  url: string;
  title: string;
  metaDescription: string;
  wordCount: number;
  readabilityScore: number;
  keywordDensity: { [keyword: string]: number };
  headingStructure: HeadingStructure[];
  images: ImageAnalysis[];
  links: LinkAnalysis;
  aiSuggestions: AISuggestion[];
  createdAt: string;
}

export interface HeadingStructure {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  hasKeyword: boolean;
}

export interface ImageAnalysis {
  src: string;
  alt?: string;
  title?: string;
  size: number;
  format: string;
  isOptimized: boolean;
  suggestions: string[];
}

export interface LinkAnalysis {
  internal: number;
  external: number;
  broken: number;
  nofollow: number;
  details: {
    url: string;
    text: string;
    type: 'internal' | 'external';
    status: 'working' | 'broken' | 'redirect';
  }[];
}

export interface AISuggestion {
  type: 'title' | 'meta' | 'content' | 'structure' | 'keywords';
  current: string;
  suggested: string;
  reason: string;
  impact: 'high' | 'medium' | 'low';
}

// Reporting Types
export interface Report {
  id: string;
  projectId: string;
  name: string;
  type: 'audit' | 'keyword' | 'competitor' | 'content' | 'comprehensive';
  format: 'pdf' | 'excel' | 'presentation';
  template: string;
  isWhiteLabel: boolean;
  brandingConfig?: WhiteLabelConfig;
  sections: ReportSection[];
  createdAt: string;
  generatedAt?: string;
  downloadUrl?: string;
  status: 'draft' | 'generating' | 'ready' | 'failed';
}

export interface WhiteLabelConfig {
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  companyName: string;
  contactInfo: {
    email: string;
    phone?: string;
    website?: string;
    address?: string;
  };
}

export interface ReportSection {
  id: string;
  type:
    | 'executive_summary'
    | 'audit_overview'
    | 'keyword_analysis'
    | 'competitor_analysis'
    | 'recommendations'
    | 'technical_issues'
    | 'content_analysis';
  title: string;
  content: any;
  order: number;
  isIncluded: boolean;
}

// Website Metrics Types
export interface WebsiteMetrics {
  traffic: TrafficMetrics;
  rankings: RankingMetrics;
  backlinks: BacklinkMetrics;
  technical: TechnicalMetrics;
  lastUpdated: string;
}

export interface TrafficMetrics {
  organic: number;
  paid: number;
  direct: number;
  referral: number;
  social: number;
  change: {
    organic: number;
    total: number;
  };
  topPages: {
    url: string;
    views: number;
    change: number;
  }[];
}

export interface RankingMetrics {
  averagePosition: number;
  keywordsRanking: number;
  topKeywords: {
    keyword: string;
    position: number;
    change: number;
    volume: number;
  }[];
  visibility: number;
}

export interface BacklinkMetrics {
  total: number;
  referring_domains: number;
  domain_authority: number;
  trust_flow: number;
  citation_flow: number;
  recent: {
    url: string;
    domain: string;
    authority: number;
    date: string;
  }[];
}

export interface TechnicalMetrics {
  core_web_vitals: {
    lcp: number;
    fid: number;
    cls: number;
    fcp: number;
  };
  lighthouse_score: number;
  mobile_friendly: boolean;
  ssl_certificate: boolean;
  page_speed: {
    desktop: number;
    mobile: number;
  };
  indexability: number;
}

// Chart & Visualization Types
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
}

export interface MetricCard {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: string;
  color?: string;
  format?: 'number' | 'percentage' | 'currency' | 'duration';
}

// API Response Types
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    details?: any;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Navigation & UI Types
export interface NavigationItem {
  title: string;
  href: string;
  icon?: string;
  description?: string;
  isActive?: boolean;
  children?: NavigationItem[];
}

export interface BreadcrumbItem {
  title: string;
  href?: string;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface SortOption {
  label: string;
  value: string;
  direction: 'asc' | 'desc';
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'select'
    | 'multiselect'
    | 'textarea'
    | 'number'
    | 'url'
    | 'checkbox'
    | 'radio';
  placeholder?: string;
  required?: boolean;
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
  };
  options?: { label: string; value: string }[];
  description?: string;
}

// Dashboard Widget Types
export interface DashboardWidget {
  id: string;
  type: 'metric' | 'chart' | 'table' | 'list' | 'progress';
  title: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  position: { x: number; y: number };
  config: any;
  isVisible: boolean;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  actionText?: string;
}

// Integration Types
export interface Integration {
  id: string;
  name: string;
  description: string;
  provider: string;
  isConnected: boolean;
  config?: any;
  lastSync?: string;
  status: 'active' | 'error' | 'disconnected';
}

export interface AlertRule {
  id: string;
  name: string;
  type: 'ranking_drop' | 'traffic_drop' | 'new_issues' | 'competitor_change';
  condition: any;
  threshold: number;
  isEnabled: boolean;
  notificationChannels: string[];
  createdAt: string;
}
