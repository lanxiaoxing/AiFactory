/// <reference types="vite/client" />

// Google Analytics 配置 (已禁用，等待域名配置)
export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || '';
export const GA_ENABLED = false; // 暂时禁用 GA

// 类型声明
declare global {
  interface Window {
    gtag: (
      command: string,
      ...args: any[]
    ) => void;
    dataLayer: any[];
  }
}

// Google Analytics 脚本加载函数
export const loadGAScript = (trackingId: string) => {
  // 创建 script 标签
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;

  // 设置 gtag 函数
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  // 在 script 加载后初始化
  script.onload = () => {
    window.gtag('js', new Date());
    window.gtag('config', trackingId, {
      send_page_view: false, // 我们手动发送页面浏览事件
    });
  };

  document.head.appendChild(script);
};

// 初始化 Google Analytics (已禁用)
export const initGA = () => {
  // GA 已禁用，等待域名配置
  if (GA_ENABLED && typeof window !== 'undefined' && GA_TRACKING_ID && !window.gtag) {
    loadGAScript(GA_TRACKING_ID);
  }
};

// 跟踪页面浏览 (已禁用)
export const pageview = (url: string) => {
  if (GA_ENABLED && typeof window !== 'undefined' && GA_TRACKING_ID && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// 跟踪自定义事件 (已禁用)
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (GA_ENABLED && typeof window !== 'undefined' && GA_TRACKING_ID && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// 常用事件类型
export const GA_EVENTS = {
  // 导航事件
  NAVIGATION_CLICK: 'navigation_click',
  // 菜单事件
  MENU_CLICK: 'menu_click',
  // 地图交互事件
  MAP_MARKER_CLICK: 'map_marker_click',
  MAP_ZOOM: 'map_zoom',
  // 下载事件
  DOWNLOAD_CLICK: 'download_click',
  // 联系事件
  CONTACT_CLICK: 'contact_click',
  // 社交媒体事件
  SOCIAL_CLICK: 'social_click',
} as const;