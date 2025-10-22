import { useCallback } from 'react';
import { event, GA_EVENTS } from '../utils/analytics';

// 使用 Analytics 的 Hook
export const useAnalytics = () => {
  // 跟踪导航点击
  const trackNavigation = useCallback((item: string) => {
    event({
      action: GA_EVENTS.NAVIGATION_CLICK,
      category: 'Navigation',
      label: item,
    });
  }, []);

  // 跟踪菜单点击
  const trackMenu = useCallback((menuItem: string, subMenuItem?: string) => {
    event({
      action: GA_EVENTS.MENU_CLICK,
      category: 'Menu',
      label: subMenuItem ? `${menuItem} > ${subMenuItem}` : menuItem,
    });
  }, []);

  // 跟踪地图标记点击
  const trackMapMarker = useCallback((country: string) => {
    event({
      action: GA_EVENTS.MAP_MARKER_CLICK,
      category: 'Map',
      label: country,
    });
  }, []);

  // 跟踪地图缩放
  const trackMapZoom = useCallback((zoomLevel: number) => {
    event({
      action: GA_EVENTS.MAP_ZOOM,
      category: 'Map',
      label: `Zoom level: ${zoomLevel}`,
    });
  }, []);

  // 跟踪下载点击
  const trackDownload = useCallback((fileType: string, fileName?: string) => {
    event({
      action: GA_EVENTS.DOWNLOAD_CLICK,
      category: 'Download',
      label: fileName ? `${fileType}: ${fileName}` : fileType,
    });
  }, []);

  // 跟踪联系点击
  const trackContact = useCallback((method: string) => {
    event({
      action: GA_EVENTS.CONTACT_CLICK,
      category: 'Contact',
      label: method,
    });
  }, []);

  // 跟踪社交媒体点击
  const trackSocial = useCallback((platform: string) => {
    event({
      action: GA_EVENTS.SOCIAL_CLICK,
      category: 'Social',
      label: platform,
    });
  }, []);

  // 通用事件跟踪
  const trackEvent = useCallback((params: {
    action: string;
    category: string;
    label?: string;
    value?: number;
  }) => {
    event(params);
  }, []);

  return {
    trackNavigation,
    trackMenu,
    trackMapMarker,
    trackMapZoom,
    trackDownload,
    trackContact,
    trackSocial,
    trackEvent,
  };
};