import app from '@/app';
import 'dotenv/config';

// 读取端口号，没有默认3000
const PORT = process.env.PORT;

// 启动服务器，监听端口，用来确定服务器跑起来了
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://localhost:${PORT}`);
});
