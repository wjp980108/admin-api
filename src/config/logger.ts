import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logger = winston.createLogger({
  // 最低记录级别，低于此级别的日志会被忽略
  level: 'info',

  // 日志格式：时间戳 + 自定义输出模板
  format: winston.format.combine(
    // 为每条日志注入格式化后的时间戳
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    // 自定义输出格式，例如：[2025-01-01 12:00:00] INFO: 服务启动成功
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    }),
  ),

  // 传输通道：定义日志的输出目标，可同时配置多个
  transports: [
    // 输出到控制台，开发环境便于实时查看
    new winston.transports.Console(),

    // 错误日志：仅记录 error 级别，单独归档便于排查问题
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log', // %DATE% 会被替换为实际日期
      datePattern: 'YYYY-MM-DD', // 按天切割，每天生成一个新文件
      level: 'error', // 只捕获 error 级别
      maxSize: '20m', // 单个文件超过 20MB 时触发切割
      maxFiles: '30d', // 自动删除 30 天前的旧日志，防止磁盘占满
    }),

    // 全量日志：记录所有 info+ 级别，用于完整的行为追踪与审计
    new DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '30d',
    }),
  ],
});

export default logger;
