import { uploadToQiniu } from '@/infrastructure/storage/qiniuStorage';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

// 上传图片
export async function uploadImage(file: Express.Multer.File) {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    throw new Error('仅支持 jpg、png、webp、gif 格式');
  }
  if (file.size > MAX_SIZE) {
    throw new Error('文件大小不能超过 5MB');
  }
  return uploadToQiniu(file.buffer, file.originalname);
}
