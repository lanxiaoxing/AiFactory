#!/bin/bash

echo "开始构建生产版本..."

# 1. 构建静态文件
npm run build

if [ $? -ne 0 ]; then
    echo "构建失败"
    exit 1
fi

echo "构建成功，文件位于 dist/ 目录"
echo ""
echo "下一步："
echo "1. 安装 nginx: sudo yum install nginx -y"
echo "2. 复制配置: sudo cp nginx.conf /etc/nginx/conf.d/website.conf"
echo "3. 复制文件: sudo cp -r dist/* /usr/share/nginx/html/"
echo "4. 启动服务: sudo systemctl start nginx"
echo "5. 开机自启: sudo systemctl enable nginx"
