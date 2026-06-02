import multer from 'multer';

// 文件存入内存，不落盘，由 service 层直接上传 buffer
export const upload = multer({ storage: multer.memoryStorage() });
