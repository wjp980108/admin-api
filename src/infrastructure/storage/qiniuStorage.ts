import type { Buffer } from 'node:buffer';
import path from 'node:path';
import qiniu from 'qiniu';
import { domain, getUploadToken } from '@/config/qiniu';

const config = new qiniu.conf.Config();

// 空间对应的区域，若不配置将自动查询
config.regionsProvider = qiniu.httpc.Region.fromRegionId(process.env.QINIU_ZONE!);
// 是否使用https域名
config.useHttpsDomain = true;
// 上传是否使用cdn加速
config.accelerateUploading = true;

const formUploader = new qiniu.form_up.FormUploader(config);

/**
 * 上传文件 Buffer 到七牛云
 * @param buffer       - 文件二进制内容
 * @param originalName - 原始文件名，用于提取扩展名
 * @returns 文件存储 key 及可访问的完整 URL
 */
export async function uploadToQiniu(buffer: Buffer, originalName: string) {
  const key = `admin/${Date.now()}${path.extname(originalName)}`;

  const { resp } = await formUploader.put(
    getUploadToken(),
    key,
    buffer,
    new qiniu.form_up.PutExtra(),
  );

  if (resp.statusCode !== 200) {
    throw new Error('七牛上传失败');
  }

  return `${domain}/${key}`;
}
