import React, { useState, useEffect } from 'react';
import { Line, Pie, Column } from '@ant-design/plots';
import {
  EyeOutlined,
  CalendarOutlined,
  DesktopOutlined,
  MobileOutlined,
  TabletOutlined,
  ReloadOutlined,
  DeleteOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { Button, Card, Row, Col, Statistic, Table, Tag, message, Modal } from 'antd';
import styles from './Analytics.module.css';

interface AnalyticsSummary {
  totalVisits: number;
  todayVisits: number;
  weeklyVisits: number;
  monthlyVisits: number;
  lastVisit: string;
  topPages: Array<{ page: string; visits: number }>;
  recentVisits: Array<{
    id: string;
    timestamp: string;
    page: string;
    device: string;
    browser: string;
    referrer: string;
  }>;
  deviceStats: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  dailyTrend: Array<{ date: string; visits: number }>;
}

const Analytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/analytics/summary');
      if (response.ok) {
        const analyticsData = await response.json();
        setData(analyticsData);
      } else {
        message.error('无法获取统计数据，请确保分析服务器正在运行');
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      message.error('连接分析服务器失败，请检查服务器状态');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleResetData = () => {
    Modal.confirm({
      title: '确认重置',
      content: '此操作将清空所有统计数据，是否继续？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          const response = await fetch('http://localhost:3001/api/analytics/reset', {
            method: 'DELETE'
          });
          if (response.ok) {
            message.success('统计数据已重置');
            fetchData();
          } else {
            message.error('重置失败');
          }
        } catch (error) {
          message.error('重置失败');
        }
      }
    });
  };

  // 设备统计图表配置
  const devicePieData = data ? [
    { type: '桌面端', value: data.deviceStats.desktop },
    { type: '移动端', value: data.deviceStats.mobile },
    { type: '平板端', value: data.deviceStats.tablet }
  ].filter(item => item.value > 0) : [];

  const devicePieConfig = {
    data: devicePieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}'
    },
    interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }]
  };

  // 访问趋势图表配置
  const trendLineConfig = {
    data: data?.dailyTrend || [],
    xField: 'date',
    yField: 'visits',
    smooth: true,
    point: {
      size: 5,
      shape: 'diamond'
    },
    tooltip: {
      formatter: (datum: any) => ({
        name: '访问量',
        value: datum.visits
      })
    }
  };

  // 页面访问排行配置
  const pageColumnConfig = {
    data: data?.topPages || [],
    xField: 'visits',
    yField: 'page',
    seriesField: 'page',
    label: {
      position: 'right' as const,
      offset: 4
    }
  };

  // 最近访问记录表格列配置
  const recentVisitsColumns = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: string) => new Date(timestamp).toLocaleString('zh-CN')
    },
    {
      title: '页面',
      dataIndex: 'page',
      key: 'page',
      render: (page: string) => (
        <Tag color="blue">{page === '/' ? '首页' : page}</Tag>
      )
    },
    {
      title: '设备',
      dataIndex: 'device',
      key: 'device',
      render: (device: string) => {
        const iconMap = {
          desktop: <DesktopOutlined />,
          mobile: <MobileOutlined />,
          tablet: <TabletOutlined />
        };
        return (
          <span>
            {iconMap[device as keyof typeof iconMap]}
            {' '}
            {device === 'desktop' ? '桌面端' : device === 'mobile' ? '移动端' : '平板端'}
          </span>
        );
      }
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
      key: 'browser',
      render: (browser: string) => browser.charAt(0).toUpperCase() + browser.slice(1)
    },
    {
      title: '来源',
      dataIndex: 'referrer',
      key: 'referrer',
      render: (referrer: string) => (
        referrer === 'direct' ?
          <Tag color="green">直接访问</Tag> :
          <span title={referrer}>{referrer.length > 20 ? referrer.substring(0, 20) + '...' : referrer}</span>
      )
    }
  ];

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>加载统计数据中...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.error}>
        <BarChartOutlined style={{ fontSize: '48px', color: '#ccc' }} />
        <h2>无法加载统计数据</h2>
        <p>请确保分析服务器正在运行 (http://localhost:3001)</p>
        <Button type="primary" onClick={handleRefresh}>
          重新加载
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.analytics}>
      <div className={styles.header}>
        <h1>📊 网站统计分析</h1>
        <div className={styles.actions}>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            loading={loading}
          >
            刷新数据
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={handleResetData}
          >
            重置数据
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className={styles.statsRow}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="总访问量"
              value={data.totalVisits}
              prefix={<EyeOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="今日访问"
              value={data.todayVisits}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="本周访问"
              value={data.weeklyVisits}
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="本月访问"
              value={data.monthlyVisits}
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#eb2f96' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 图表区域 */}
      <Row gutter={[16, 16]} className={styles.chartsRow}>
        <Col xs={24} lg={12}>
          <Card title="访问趋势（最近7天）" className={styles.chartCard}>
            <Line {...trendLineConfig} height={300} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="设备类型分布" className={styles.chartCard}>
            {devicePieData.length > 0 ? (
              <Pie {...devicePieConfig} height={300} />
            ) : (
              <div className={styles.noData}>
                <p>暂无设备数据</p>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className={styles.chartsRow}>
        <Col xs={24} lg={12}>
          <Card title="页面访问排行" className={styles.chartCard}>
            {data.topPages.length > 0 ? (
              <Column {...pageColumnConfig} height={300} />
            ) : (
              <div className={styles.noData}>
                <p>暂无页面访问数据</p>
              </div>
            )}
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="最近访问记录" className={styles.recentVisitsCard}>
            <Table
              dataSource={data.recentVisits}
              columns={recentVisitsColumns}
              pagination={false}
              scroll={{ y: 300 }}
              size="small"
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;