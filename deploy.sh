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
echo "7️⃣  **验证部署**:"
echo "   curl http://localhost"
echo ""
echo "🎉 部署完成！"

echo ""
echo "✨ 部署脚本执行完成！"
