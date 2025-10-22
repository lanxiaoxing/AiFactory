#!/bin/bash

echo "🚀 启动网站统计分析系统..."

# 检查是否安装了 Node.js 依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装前端依赖..."
    npm install
fi

# 检查分析服务器依赖
if [ ! -d "analytics_node_modules" ]; then
    echo "📦 安装分析服务器依赖..."
    mkdir analytics_node_modules
    cp package-analytics.json analytics-package.json
    cd analytics && npm install --prefix ../ && cd ..
    # 或者直接在项目根目录安装分析服务器依赖
    if [ -f "package-analytics.json" ]; then
        echo "安装 Express 和 CORS..."
        npm install express cors --save
    fi
fi

# 启动分析服务器
echo "🔧 启动分析服务器 (端口 3001)..."
node analytics-server.js &
ANALYTICS_PID=$!

# 等待服务器启动
sleep 3

# 检查服务器是否启动成功
if curl -s http://localhost:3001/api/analytics/health > /dev/null; then
    echo "✅ 分析服务器启动成功 (PID: $ANALYTICS_PID)"
    echo "📊 API 地址: http://localhost:3001/api/analytics"
    echo ""
    echo "🌐 启动前端开发服务器..."
    npm run dev

    # 捕获退出信号，关闭分析服务器
    trap "echo '🛑 关闭分析服务器...'; kill $ANALYTICS_PID; exit" INT
else
    echo "❌ 分析服务器启动失败"
    kill $ANALYTICS_PID 2>/dev/null
    exit 1
fi