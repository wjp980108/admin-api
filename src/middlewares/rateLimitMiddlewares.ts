import rateLimit from 'express-rate-limit';

// 全局限流
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 时间窗口：15 分钟（单位：毫秒）
  max: 100, // 同一 IP 在时间窗口内最多请求 100 次，超出后触发限流
  message: {
    code: 429,
    message: '请求过于频繁，请稍后再试',
  },
});

// 登录接口限流
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    code: 429,
    message: '登录尝试过于频繁，请15分钟后再试',
  },
});
