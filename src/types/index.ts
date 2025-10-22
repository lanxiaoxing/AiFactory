export interface MenuItem {
  title: string;
}

export interface Country {
  name: string;
  position: [number, number];
  description?: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Stat {
  number: string;
  label: string;
}

// Google Analytics 事件类型
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}