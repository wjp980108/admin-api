import type { StreamOptions } from 'morgan';
import morgan from 'morgan';
import logger from '@/config/logger';

// 把 morgan 的日志输出到 winston
const stream: StreamOptions = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

/**
 * HTTP 请求日志中间件
 * 日志格式说明：
 *  :method          - 请求方法，如 GET、POST
 *  :url             - 请求路径，如 /api/user/info
 *  :status          - HTTP 响应状态码，如 200、401、500
 *  :res[content-length] - 响应体大小（字节），无响应体时为 "-"
 *  :response-time   - 服务器处理耗时（毫秒），用于接口性能监控
 *
 * 示例输出：POST /api/auth/login 200 254 - 304.550 ms
 */
export const httpLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream },
);
