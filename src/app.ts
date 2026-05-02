import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { errorHandler } from '@/middlewares/errorMiddlewar';
import { httpLogger } from '@/middlewares/loggerMiddlewares';
import { globalLimiter } from '@/middlewares/rateLimitMiddlewares';
import authRoutes from '@/routes/authRoutes';
import userRoutes from '@/routes/userRoutes';

// 创建 Express 应用实例
const app = express();

// 信任第一层代理（Nginx）
app.set('trust proxy', 1);

// 全局限流
app.use(globalLimiter);

// 添加日志
app.use(httpLogger);

// 添加安装相关的 HTTP 头
app.use(helmet());

// 启用跨域
app.use(cors());

// 解析请求体中的 JSON 数据
app.use(express.json());

// 注册路由
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// 捕获所有异常
app.use(errorHandler);

// 健康检查接口，用来确认服务器是否正常运行
app.get('/', (_, res) => {
  res.json({ message: 'API is running 🚀' });
});

export default app;
