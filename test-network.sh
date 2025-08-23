#!/bin/bash

echo "=== 网络信息 ==="
echo "本机IP地址: $(hostname -I | awk '{print $1}')"
echo "主机名: $(hostname)"
echo ""

echo "=== 端口监听状态 ==="
ss -tlnp | grep :3000 || echo "端口3000未在监听"
echo ""

echo "=== 测试本地访问 ==="
curl -s -o /dev/null -w "HTTP状态码: %{http_code}\n" http://localhost:3000 || echo "本地访问失败"
echo ""

echo "=== 测试外部IP访问 ==="
curl -s -o /dev/null -w "HTTP状态码: %{http_code}\n" http://172.18.36.58:3000 || echo "外部IP访问失败"
echo ""

echo "=== Vite进程状态 ==="
ps aux | grep -v grep | grep vite || echo "未找到Vite进程"
echo ""

echo "=== 防火墙状态 ==="
ufw status 2>/dev/null || echo "UFW未安装或未启用"