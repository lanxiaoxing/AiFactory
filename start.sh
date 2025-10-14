#!/bin/bash

LOG_DIR="logs"
PID_FILE="$LOG_DIR/npm_dev.pid"

# 创建日志目录
mkdir -p "$LOG_DIR"

# 检查是否已有进程运行
if [ -f "$PID_FILE" ] && ps -p "$(cat "$PID_FILE")" > /dev/null 2>&1; then
    echo "进程已在运行 (PID: $(cat "$PID_FILE"))"
    exit 1
fi

# 记录启动时间并启动服务
{
    echo ""
    echo "=== $(date '+%Y-%m-%d %H:%M:%S') 启动 ==="
} >> "$LOG_DIR/npm_dev.log" 2>&1

nohup npm run dev >> "$LOG_DIR/npm_dev.log" 2>&1 &
PID=$!
echo "$PID" > "$PID_FILE"

# 验证启动
sleep 2
if ps -p "$PID" > /dev/null 2>&1; then
    echo "服务已启动 (PID: $PID)"
    echo "日志: tail -f $LOG_DIR/npm_dev.log"
else
    echo "启动失败，查看日志: cat $LOG_DIR/npm_dev.log"
    rm -f "$PID_FILE"
    exit 1
fi