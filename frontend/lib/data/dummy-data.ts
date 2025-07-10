import {
  User,
  Project,
  Website,
  SEOAudit,
  Keyword,
  Competitor,
  ContentAnalysis,
  Report,
  SubscriptionPlan,
  MetricCard,
  KeywordRanking,
  SEOIssue,
  SEORecommendation,
  CompetitorComparison,
} from '@/lib/types';

// Current user dummy data
export const dummyUser: User = {
  id: 'user_123',
  email: 'wilson@seo360.com',
  name: 'Wilson Kinyua',
  avatar: 'https://github.com/wilsonkinyua.png',
  role: 'agency_owner',
  subscription: {
    id: 'sub_123',
    plan: {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal for growing agencies and marketing teams',
      price: 99,
      interval: 'month',
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
    status: 'active',
    currentPeriodStart: '2024-01-01T00:00:00Z',
    currentPeriodEnd: '2024-02-01T00:00:00Z',
    cancelAtPeriodEnd: false,
    stripeCustomerId: 'cus_123',
    stripeSubscriptionId: 'sub_123',
  },
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-15T00:00:00Z',
  emailVerified: true,
  twoFactorEnabled: false,
};

// Projects dummy data
export const dummyProjects: Project[] = [
  {
    id: 'proj_1',
    name: 'E-commerce Store',
    description: 'SEO optimization for our main e-commerce platform',
    userId: 'user_123',
    websites: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    status: 'active',
    settings: {
      trackingEnabled: true,
      alertsEnabled: true,
      crawlFrequency: 'weekly',
      maxPages: 1000,
      excludePatterns: ['/admin/*', '/private/*'],
      includePatterns: ['/*'],
    },
  },
  {
    id: 'proj_2',
    name: 'Corporate Website',
    description: 'SEO for company website and blog',
    userId: 'user_123',
    websites: [],
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
    status: 'active',
    settings: {
      trackingEnabled: true,
      alertsEnabled: true,
      crawlFrequency: 'daily',
      maxPages: 500,
      excludePatterns: ['/internal/*'],
      includePatterns: ['/*'],
    },
  },
  {
    id: 'proj_3',
    name: 'Local Business',
    description: 'Local SEO optimization for restaurant chain',
    userId: 'user_123',
    websites: [],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-22T00:00:00Z',
    status: 'active',
    settings: {
      trackingEnabled: true,
      alertsEnabled: true,
      crawlFrequency: 'weekly',
      maxPages: 200,
      excludePatterns: [],
      includePatterns: ['/*'],
    },
  },
];

// Websites dummy data
export const dummyWebsites: Website[] = [
  {
    id: 'site_1',
    url: 'https://example-store.com',
    projectId: 'proj_1',
    name: 'Example Store',
    favicon: 'https://example-store.com/favicon.ico',
    status: 'active',
    lastCrawled: '2024-01-20T00:00:00Z',
    crawlStatus: {
      isRunning: false,
      lastRun: '2024-01-20T00:00:00Z',
      nextRun: '2024-01-27T00:00:00Z',
      pagesFound: 2547,
      pagesCrawled: 2450,
      errors: 12,
      warnings: 45,
    },
    metrics: {
      traffic: {
        organic: 45230,
        paid: 12450,
        direct: 8930,
        referral: 3420,
        social: 1890,
        change: {
          organic: 12.5,
          total: 8.3,
        },
        topPages: [
          { url: '/products/bestseller', views: 5420, change: 15.2 },
          { url: '/blog/seo-tips', views: 3890, change: -2.1 },
          { url: '/', views: 3560, change: 8.7 },
        ],
      },
      rankings: {
        averagePosition: 8.4,
        keywordsRanking: 847,
        topKeywords: [
          { keyword: 'best seo tools', position: 3, change: 2, volume: 12000 },
          { keyword: 'seo audit', position: 5, change: -1, volume: 8500 },
          {
            keyword: 'keyword research',
            position: 7,
            change: 0,
            volume: 15000,
          },
        ],
        visibility: 45.8,
      },
      backlinks: {
        total: 15420,
        referring_domains: 2340,
        domain_authority: 65,
        trust_flow: 58,
        citation_flow: 62,
        recent: [
          {
            url: 'https://seoblog.com/article',
            domain: 'seoblog.com',
            authority: 72,
            date: '2024-01-18T00:00:00Z',
          },
          {
            url: 'https://marketing.com/tools',
            domain: 'marketing.com',
            authority: 68,
            date: '2024-01-17T00:00:00Z',
          },
        ],
      },
      technical: {
        core_web_vitals: {
          lcp: 2.1,
          fid: 85,
          cls: 0.08,
          fcp: 1.4,
        },
        lighthouse_score: 89,
        mobile_friendly: true,
        ssl_certificate: true,
        page_speed: {
          desktop: 92,
          mobile: 78,
        },
        indexability: 95,
      },
      lastUpdated: '2024-01-20T00:00:00Z',
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
  {
    id: 'site_2',
    url: 'https://company-corp.com',
    projectId: 'proj_2',
    name: 'Company Corp',
    favicon: 'https://company-corp.com/favicon.ico',
    status: 'active',
    lastCrawled: '2024-01-21T00:00:00Z',
    crawlStatus: {
      isRunning: false,
      lastRun: '2024-01-21T00:00:00Z',
      nextRun: '2024-01-22T00:00:00Z',
      pagesFound: 456,
      pagesCrawled: 456,
      errors: 3,
      warnings: 18,
    },
    metrics: {
      traffic: {
        organic: 28430,
        paid: 5620,
        direct: 12340,
        referral: 4560,
        social: 2890,
        change: {
          organic: 18.2,
          total: 15.7,
        },
        topPages: [
          { url: '/services', views: 4320, change: 22.1 },
          { url: '/about', views: 2890, change: 5.4 },
          { url: '/blog', views: 2560, change: 12.3 },
        ],
      },
      rankings: {
        averagePosition: 12.7,
        keywordsRanking: 342,
        topKeywords: [
          {
            keyword: 'business consulting',
            position: 4,
            change: 3,
            volume: 5400,
          },
          {
            keyword: 'corporate services',
            position: 8,
            change: -2,
            volume: 3200,
          },
          {
            keyword: 'management consulting',
            position: 15,
            change: 1,
            volume: 7800,
          },
        ],
        visibility: 28.4,
      },
      backlinks: {
        total: 8540,
        referring_domains: 1240,
        domain_authority: 58,
        trust_flow: 52,
        citation_flow: 55,
        recent: [
          {
            url: 'https://business.com/partners',
            domain: 'business.com',
            authority: 65,
            date: '2024-01-19T00:00:00Z',
          },
        ],
      },
      technical: {
        core_web_vitals: {
          lcp: 1.8,
          fid: 76,
          cls: 0.12,
          fcp: 1.2,
        },
        lighthouse_score: 94,
        mobile_friendly: true,
        ssl_certificate: true,
        page_speed: {
          desktop: 96,
          mobile: 84,
        },
        indexability: 98,
      },
      lastUpdated: '2024-01-21T00:00:00Z',
    },
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-21T00:00:00Z',
  },
];

// SEO Audit dummy data
export const dummySEOAudit: SEOAudit = {
  id: 'audit_1',
  websiteId: 'site_1',
  url: 'https://example-store.com',
  createdAt: '2024-01-20T00:00:00Z',
  status: 'completed',
  overallScore: 78,
  scores: {
    technical: 82,
    content: 75,
    performance: 79,
    accessibility: 85,
    bestPractices: 73,
  },
  issues: [
    {
      id: 'issue_1',
      type: 'error',
      category: 'technical',
      title: 'Missing Meta Description',
      description: '12 pages are missing meta descriptions',
      impact: 'high',
      effort: 'easy',
      pages: ['/products/item1', '/products/item2', '/blog/post1'],
      fixInstructions: 'Add unique meta descriptions to each page',
      canAutoFix: false,
    },
    {
      id: 'issue_2',
      type: 'warning',
      category: 'performance',
      title: 'Large Images',
      description: 'Images larger than 500KB found',
      impact: 'medium',
      effort: 'medium',
      pages: ['/gallery', '/products/featured'],
      fixInstructions: 'Compress and optimize images',
      canAutoFix: true,
    },
    {
      id: 'issue_3',
      type: 'warning',
      category: 'accessibility',
      title: 'Missing Alt Text',
      description: '8 images missing alt text',
      impact: 'medium',
      effort: 'easy',
      pages: ['/homepage', '/about'],
      fixInstructions: 'Add descriptive alt text to all images',
      canAutoFix: false,
    },
  ],
  recommendations: [
    {
      id: 'rec_1',
      title: 'Improve Page Load Speed',
      description: 'Optimize images and enable compression',
      impact: 'high',
      difficulty: 'medium',
      category: 'Performance',
      estimatedImpact: '15-20% improvement in Core Web Vitals',
      actionItems: [
        'Enable GZIP compression',
        'Optimize images with WebP format',
        'Implement lazy loading',
      ],
      aiGenerated: true,
    },
    {
      id: 'rec_2',
      title: 'Enhance Content Structure',
      description: 'Improve heading hierarchy and content organization',
      impact: 'medium',
      difficulty: 'easy',
      category: 'Content',
      estimatedImpact: '5-10% improvement in content relevance',
      actionItems: [
        'Fix H1-H6 hierarchy',
        'Add schema markup',
        'Improve internal linking',
      ],
      aiGenerated: true,
    },
  ],
  metrics: {
    pageSpeed: {
      desktop: 92,
      mobile: 78,
      fcp: 1.4,
      lcp: 2.1,
      cls: 0.08,
      fid: 85,
    },
    accessibility: {
      score: 85,
      violations: 8,
      warnings: 15,
    },
    seo: {
      metaIssues: 12,
      headingIssues: 5,
      imageIssues: 8,
      linkIssues: 3,
    },
    technicalSEO: {
      crawlability: 95,
      indexability: 92,
      sitemapIssues: 1,
      robotsIssues: 0,
    },
  },
};

// Keywords dummy data
export const dummyKeywords: Keyword[] = [
  {
    id: 'kw_1',
    keyword: 'best seo tools',
    projectId: 'proj_1',
    searchVolume: 12000,
    difficulty: 65,
    cpc: 8.5,
    competition: 'high',
    trends: [95, 100, 98, 102, 108, 115, 120],
    intent: 'commercial',
    position: 3,
    url: '/tools/seo',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
  {
    id: 'kw_2',
    keyword: 'seo audit free',
    projectId: 'proj_1',
    searchVolume: 8500,
    difficulty: 45,
    cpc: 12.3,
    competition: 'medium',
    trends: [80, 85, 90, 95, 88, 92, 98],
    intent: 'informational',
    position: 5,
    url: '/audit',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
  {
    id: 'kw_3',
    keyword: 'keyword research tool',
    projectId: 'proj_1',
    searchVolume: 15000,
    difficulty: 72,
    cpc: 15.6,
    competition: 'high',
    trends: [110, 115, 112, 118, 125, 130, 135],
    intent: 'commercial',
    position: 7,
    url: '/keywords',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
];

// Competitors dummy data
export const dummyCompetitors: Competitor[] = [
  {
    id: 'comp_1',
    projectId: 'proj_1',
    domain: 'ahrefs.com',
    name: 'Ahrefs',
    addedAt: '2024-01-01T00:00:00Z',
    lastAnalyzed: '2024-01-20T00:00:00Z',
    metrics: {
      domainAuthority: 95,
      organicKeywords: 2500000,
      organicTraffic: 8500000,
      paidKeywords: 45000,
      backlinks: 15600000,
      referringDomains: 750000,
      techStack: ['React', 'Node.js', 'PostgreSQL'],
    },
  },
  {
    id: 'comp_2',
    projectId: 'proj_1',
    domain: 'semrush.com',
    name: 'SEMrush',
    addedAt: '2024-01-01T00:00:00Z',
    lastAnalyzed: '2024-01-20T00:00:00Z',
    metrics: {
      domainAuthority: 92,
      organicKeywords: 1800000,
      organicTraffic: 6200000,
      paidKeywords: 38000,
      backlinks: 12400000,
      referringDomains: 520000,
      techStack: ['Angular', 'Python', 'MySQL'],
    },
  },
];

// Dashboard metrics dummy data
export const dummyDashboardMetrics: MetricCard[] = [
  {
    title: 'Total Organic Traffic',
    value: 73660,
    change: 12.5,
    changeType: 'increase',
    color: 'green',
    format: 'number',
  },
  {
    title: 'Average Position',
    value: 8.4,
    change: -2.3,
    changeType: 'decrease',
    color: 'blue',
    format: 'number',
  },
  {
    title: 'Keywords Ranking',
    value: 1189,
    change: 8.7,
    changeType: 'increase',
    color: 'purple',
    format: 'number',
  },
  {
    title: 'Domain Authority',
    value: 65,
    change: 3.2,
    changeType: 'increase',
    color: 'yellow',
    format: 'number',
  },
];

// Issues by category for dashboard
export const dummyIssuesByCategory = {
  critical: 3,
  high: 12,
  medium: 28,
  low: 45,
};

// Recent activities
export const dummyRecentActivities = [
  {
    id: 'activity_1',
    type: 'audit_completed',
    message: 'SEO audit completed for example-store.com',
    timestamp: '2024-01-20T10:30:00Z',
    url: '/audit/site_1',
  },
  {
    id: 'activity_2',
    type: 'ranking_improved',
    message: "Keyword 'best seo tools' improved to position 3",
    timestamp: '2024-01-20T09:15:00Z',
    url: '/keywords/kw_1',
  },
  {
    id: 'activity_3',
    type: 'new_backlink',
    message: 'New high-quality backlink detected',
    timestamp: '2024-01-19T16:45:00Z',
    url: '/backlinks',
  },
];

// Top performing content
export const dummyTopContent = [
  {
    url: '/blog/complete-seo-guide',
    title: 'Complete SEO Guide 2024',
    traffic: 15420,
    conversions: 89,
    avgPosition: 2.4,
  },
  {
    url: '/tools/keyword-planner',
    title: 'Free Keyword Planner Tool',
    traffic: 12350,
    conversions: 156,
    avgPosition: 1.8,
  },
  {
    url: '/audit/website-checker',
    title: 'Free Website SEO Checker',
    traffic: 9870,
    conversions: 201,
    avgPosition: 3.1,
  },
];

// Chart data for trends
export const dummyTrafficTrend = {
  labels: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Jan 29', 'Feb 5', 'Feb 12'],
  datasets: [
    {
      label: 'Organic Traffic',
      data: [65000, 67000, 71000, 69000, 73000, 76000, 78000],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
    },
  ],
};

export const dummyKeywordTrend = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Keywords in Top 10',
      data: [145, 152, 148, 167],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
    },
  ],
};
