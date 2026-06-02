import qiniu from 'qiniu';

// Access Key
export const accessKey = process.env.QINIU_ACCESS_KEY;
// Secret Key
export const secretKey = process.env.QINIU_SECRET_KEY;
// 存储空间名
export const bucket = process.env.QINIU_BUCKET;
// 绑定的 CDN 域名，用于拼接文件访问 URL
export const domain = process.env.QINIU_DOMAIN;

// 鉴权对象，用于生成上传凭证
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

// 获取七牛云上传凭证
export function getUploadToken() {
  const putPolicy = new qiniu.rs.PutPolicy({
    scope: bucket,
    expires: 7200, // 凭证有效期 2 小时
  });

  return putPolicy.uploadToken(mac);
}
