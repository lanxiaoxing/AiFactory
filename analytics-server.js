#!/usr/bin/env node

const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'analytics-data.json');

// 中间件
app.use(cors());
app.use(express.json());

// 默认数据结构
const defaultData = {
  totalVisits: 0,
  todayVisits: 0,
  weeklyVisits: 0,
  monthlyVisits: 0,
  lastVisit: '',
  visits: [],
  pages: {},
  dailyStats: {},
  devices: {
    desktop: 0,
    mobile: 0,
    tablet: 0
  }
};

// 读取或初始化数据文件
async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // 文件不存在，创建默认数据
    await writeData(defaultData);
    return defaultData;
  }
}

// 写入数据文件
async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// 计算日期范围
function getDateRanges() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  return { now, today, weekAgo, monthAgo };
}

// 更新统计数据
function updateStats(data, newVisit) {
  const { now, today, weekAgo, monthAgo } = getDateRanges();
  const visitDate = new Date(newVisit.timestamp);
  const dateKey = visitDate.toISOString().split('T')[0];

  // 增加总访问量
  data.totalVisits = (data.totalVisits || 0) + 1;

  // 更新最后访问时间
  data.lastVisit = newVisit.timestamp;

  // 添加到访问记录
  data.visits = data.visits || [];
  data.visits.push(newVisit);

  // 只保留最近1000条记录
  if (data.visits.length > 1000) {
    data.visits = data.visits.slice(-1000);
  }

  // 更新页面统计
  data.pages = data.pages || {};
  data.pages[newVisit.page] = (data.pages[newVisit.page] || 0) + 1;

  // 更新每日统计
  data.dailyStats = data.dailyStats || {};
  data.dailyStats[dateKey] = (data.dailyStats[dateKey] || 0) + 1;

  // 更新设备统计
  data.devices = data.devices || { desktop: 0, mobile: 0, tablet: 0 };
  data.devices[newVisit.device] = (data.devices[newVisit.device] || 0) + 1;

  // 重新计算时间范围统计
  data.todayVisits = data.visits.filter(v => new Date(v.timestamp) >= today).length;
  data.weeklyVisits = data.visits.filter(v => new Date(v.timestamp) >= weekAgo).length;
  data.monthlyVisits = data.visits.filter(v => new Date(v.timestamp) >= monthAgo).length;

  return data;
}

// API 路由

// GET /api/analytics - 获取统计数据
app.get('/api/analytics', async (req, res) => {
  try {
    const data = await readData();
    res.json(data);
  } catch (error) {
    console.error('Error reading analytics data:', error);
    res.status(500).json({ error: 'Failed to read analytics data' });
  }
});

// POST /api/analytics/track - 记录访问
app.post('/api/analytics/track', async (req, res) => {
  try {
    const visitData = req.body;

    // 验证必要字段
    if (!visitData.page || !visitData.timestamp) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 读取现有数据
    const data = await readData();

    // 更新统计数据
    const updatedData = updateStats(data, visitData);

    // 保存数据
    await writeData(updatedData);

    res.json({ success: true, visitId: visitData.id });
  } catch (error) {
    console.error('Error tracking visit:', error);
    res.status(500).json({ error: 'Failed to track visit' });
  }
});

// GET /api/analytics/summary - 获取统计摘要
app.get('/api/analytics/summary', async (req, res) => {
  try {
    const data = await readData();

    const summary = {
      totalVisits: data.totalVisits,
      todayVisits: data.todayVisits,
      weeklyVisits: data.weeklyVisits,
      monthlyVisits: data.monthlyVisits,
      lastVisit: data.lastVisit,
      topPages: Object.entries(data.pages || {})
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([page, visits]) => ({ page, visits })),
      recentVisits: (data.visits || []).slice(-10).reverse(),
      deviceStats: data.devices || { desktop: 0, mobile: 0, tablet: 0 },
      dailyTrend: Object.entries(data.dailyStats || {})
        .slice(-7)
        .map(([date, visits]) => ({ date, visits }))
    };

    res.json(summary);
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

// DELETE /api/analytics/reset - 重置统计数据
app.delete('/api/analytics/reset', async (req, res) => {
  try {
    await writeData(defaultData);
    res.json({ success: true, message: 'Analytics data reset successfully' });
  } catch (error) {
    console.error('Error resetting data:', error);
    res.status(500).json({ error: 'Failed to reset data' });
  }
});

// 健康检查
app.get('/api/analytics/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// 启动服务器
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`📊 Analytics server running on http://localhost:${PORT}`);
    console.log(`📁 Data file: ${DATA_FILE}`);
    console.log('🔗 Available endpoints:');
    console.log('  GET  /api/analytics - Get full analytics data');
    console.log('  GET  /api/analytics/summary - Get analytics summary');
    console.log('  GET  /api/analytics/health - Health check');
    console.log('  POST /api/analytics/track - Track a visit');
    console.log('  DELETE /api/analytics/reset - Reset all data');
  });
}

module.exports = app;