#!/bin/bash

echo "🚀 开始构建生产版本..."

# 1. 构建静态文件
echo "📦 构建前端应用..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

echo "✅ 构建成功，文件位于 dist/ 目录"
echo ""

# 2. 部署说明
echo "🚀 部署说明："
echo ""
echo "1️⃣  **安装 nginx** (如果未安装):"
echo "   sudo yum install nginx -y"
echo ""
echo "2️⃣  **配置 nginx**:"
echo "   sudo cp nginx.conf /etc/nginx/conf.d/website.conf"
echo ""
echo "3️⃣  **部署前端文件**:"
echo "   sudo cp -r dist/* /usr/share/nginx/html/"
echo ""
echo "4️⃣  **设置文件权限**:"
echo "   sudo chown -R nginx:nginx /usr/share/nginx/html/"
echo ""
echo "5️⃣  **启动 nginx**:"
echo "   sudo systemctl start nginx"
echo ""
echo "6️⃣  **设置开机自启**:"
echo "   sudo systemctl enable nginx"
echo ""
echo "📊 **可选：启动统计分析服务器** (实时统计):"
echo "   node analytics-server.js"
echo ""
echo "7️⃣  **验证部署**:"
echo "   curl http://localhost"
echo ""
echo "📈 **访问统计分析页面**:"
echo "   http://localhost/analytics"
echo ""
echo "🎉 部署完成！"

# 3. 启动选项
echo ""
read -p "是否现在启动统计分析服务器？(Y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 启动统计分析服务器..."
    node analytics-server.js &
    ANALYTICS_PID=$!
    sleep 2

    if kill -0 $ANALYTICS_PID 2>/dev/null; then
        echo "✅ 统计分析服务器启动成功"
        echo "📊 API 地址: http://localhost:3001/api/analytics"
        echo "📈 统计页面: http://localhost:3000/analytics"
        echo ""
        echo "💡 提示：使用 Ctrl+C 停止服务器"
        # 等待用户停止
        wait $ANALYTICS_PID
    else
        echo "❌ 统计分析服务器启动失败"
        kill $ANALYTICS_PID 2>/dev/null
    fi
fi

echo ""
echo "✨ 部署脚本执行完成！"
