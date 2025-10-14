#!/bin/bash

LOG_DIR="logs"
PID_FILE="$LOG_DIR/npm_dev.pid"

# 检查 PID 文件
if [ ! -f "$PID_FILE" ]; then
    echo "未找到运行中的服务"
    exit 0
fi

PID=$(cat "$PID_FILE")

# 检查进程是否存在
if ! ps -p "$PID" > /dev/null 2>&1; then
    echo "进程不存在，清理 PID 文件"
    rm -f "$PID_FILE"
    exit 0
fi

# 记录停止时间
{
    echo ""
    echo "=== $(date '+%Y-%m-%d %H:%M:%S') 停止 ==="
} >> "$LOG_DIR/npm_dev.log" 2>&1

# 优雅停止
kill -15 "$PID" 2>/dev/null

# 等待最多 5 秒
for i in {1..5}; do
    if ! ps -p "$PID" > /dev/null 2>&1; then
        echo "服务已停止 (PID: $PID)"
        rm -f "$PID_FILE"
        exit 0
    fi
    sleep 1
done

# 强制终止
kill -9 "$PID" 2>/dev/null
rm -f "$PID_FILE"
echo "服务已停止 (PID: $PID)"