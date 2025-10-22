#!/bin/bash

echo "开始构建生产版本..."

# 1. 检查环境变量文件
if [ ! -f ".env" ] && [ ! -f ".env.local" ]; then
    echo "警告: 未找到 .env 或 .env.local 文件"
    echo "请配置 Google Analytics 测量 ID"
    echo ""
    echo "创建示例配置文件..."
    cp .env.example .env.local
    echo "请编辑 .env.local 文件，设置您的 VITE_GA_TRACKING_ID"
    echo ""
    read -p "是否继续构建？(y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 2. 构建静态文件
npm run build

if [ $? -ne 0 ]; then
    echo "构建失败"
    exit 1
fi

echo "构建成功，文件位于 dist/ 目录"
echo ""

# 3. 显示构建信息
if [ -f ".env.local" ]; then
    echo "✅ 使用配置文件: .env.local"
    GA_ID=$(grep "VITE_GA_TRACKING_ID" .env.local | cut -d'=' -f2)
    if [ -n "$GA_ID" ] && [ "$GA_ID" != "G-XXXXXXXXXX" ]; then
        echo "✅ Google Analytics 已配置: $GA_ID"
    else
        echo "⚠️  Google Analytics 未正确配置，请检查 .env.local 文件"
    fi
fi

echo ""
echo "部署说明："
echo "1. 安装 nginx: sudo yum install nginx -y"
echo "2. 复制配置: sudo cp nginx.conf /etc/nginx/conf.d/website.conf"
echo "3. 复制文件: sudo cp -r dist/* /usr/share/nginx/html/"
echo "4. 设置权限: sudo chown -R nginx:nginx /usr/share/nginx/html/"
echo "5. 启动服务: sudo systemctl start nginx"
echo "6. 开机自启: sudo systemctl enable nginx"
echo ""
echo "🔍 验证部署: curl http://localhost"
