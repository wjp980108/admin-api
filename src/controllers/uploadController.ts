import * as uploadService from '@/services/uploadService';
import { asyncHandler } from '@/utils/handler';
import { success } from '@/utils/response';

// 上传图片
export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new Error('请上传文件');
  }
  const data = await uploadService.uploadImage(req.file);
  success(res, data);
});
