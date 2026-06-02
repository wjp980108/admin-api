import { Router } from 'express';
import { uploadImage } from '@/controllers/uploadController';
import { authenticate } from '@/middlewares/authMiddleware';
import { upload } from '@/middlewares/uploadMiddleware';

const router = Router();

// 上传图片
router.post('/upload/image', authenticate, upload.single('file'), uploadImage);

export default router;
