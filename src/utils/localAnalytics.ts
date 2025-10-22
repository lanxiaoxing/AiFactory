// 本地统计工具模块
import { useCallback } from 'react';

export interface AnalyticsData {
  totalVisits: number;
  todayVisits: number;
  weeklyVisits: number;
  monthlyVisits: number;
  lastVisit: string;
  visits: VisitRecord[];
  pages: PageStats;
  dailyStats: DailyStats;
  devices: DeviceStats;
}

export interface VisitRecord {
  id: string;
  timestamp: string;
  page: string;
  userAgent: string;
  referrer: string;
  ip?: string;
  country?: string;
  city?: string;
  device: string;
  browser: string;
}

export interface PageStats {
  [key: string]: number;
}

export interface DailyStats {
  [date: string]: number;
}

export interface DeviceStats {
  desktop: number;
  mobile: number;
  tablet: number;
}


// 获取设备信息
export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;

  // 检测设备类型
  let device = 'desktop';
  if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    device = /iPad|Tablet/i.test(userAgent) ? 'tablet' : 'mobile';
  }

  // 检测浏览器
  let browser = 'unknown';
  if (userAgent.includes('Chrome')) browser = 'chrome';
  else if (userAgent.includes('Firefox')) browser = 'firefox';
  else if (userAgent.includes('Safari')) browser = 'safari';
  else if (userAgent.includes('Edge')) browser = 'edge';

  return { device, browser, userAgent };
};

// 记录访问
export const trackVisit = async (page: string = window.location.pathname) => {
  try {
    const { device, browser, userAgent } = getDeviceInfo();
    const visit: VisitRecord = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      page,
      userAgent,
      referrer: document.referrer || 'direct',
      device,
      browser
    };

    // 发送到后端 API
    const response = await fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visit),
    });

    if (!response.ok) {
      throw new Error('Failed to track visit');
    }

    return visit;
  } catch (error) {
    console.error('Analytics tracking failed:', error);
    // 失败时存储到本地作为备用
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    localStorage.setItem('analytics_backup', JSON.stringify({
      timestamp: new Date().toISOString(),
      page,
      error: errorMessage
    }));
  }
};

// 获取统计数据
export const getAnalyticsData = async (): Promise<AnalyticsData | null> => {
  try {
    const response = await fetch('/api/analytics');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch analytics data:', error);
  }
  return null;
};

// 获取访问统计摘要
export const getAnalyticsSummary = async () => {
  const data = await getAnalyticsData();
  if (!data) return null;

  return {
    totalVisits: data.totalVisits,
    todayVisits: data.todayVisits,
    weeklyVisits: data.weeklyVisits,
    monthlyVisits: data.monthlyVisits,
    lastVisit: data.lastVisit,
    topPages: Object.entries(data.pages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([page, visits]) => ({ page, visits })),
    recentVisits: data.visits.slice(-10).reverse(),
    deviceStats: data.devices,
    dailyTrend: Object.entries(data.dailyStats)
      .slice(-7)
      .map(([date, visits]) => ({ date, visits }))
  };
};

// 本地统计 Hook
export const useLocalAnalytics = () => {
  const trackNavigation = useCallback((_item: string) => {
    trackVisit();
  }, []);

  const trackMenu = useCallback((_menuItem: string, _subMenuItem?: string) => {
    trackVisit();
  }, []);

  const trackMapMarker = useCallback((_country: string) => {
    trackVisit();
  }, []);

  const trackEvent = useCallback((_eventData: any) => {
    trackVisit();
  }, []);

  return {
    trackNavigation,
    trackMenu,
    trackMapMarker,
    trackEvent,
    trackVisit,
    getAnalyticsData,
    getAnalyticsSummary
  };
};

// 工具函数
export const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return '刚刚';
  if (diffMins < 60) return `${diffMins}分钟前`;
  if (diffHours < 24) return `${diffHours}小时前`;
  if (diffDays < 7) return `${diffDays}天前`;
  return formatDate(dateString);
};