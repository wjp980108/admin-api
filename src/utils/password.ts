import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * 对明文密码进行哈希加密。
 *
 * @param password - 待加密的明文密码。
 * @returns 加密后的哈希字符串。
 */
export function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * 校验明文密码与哈希值是否匹配。
 *
 * @param plain - 用户输入的明文密码。
 * @param hash - 数据库中存储的哈希密码。
 * @returns 匹配返回 `true`，否则返回 `false`。
 */
export function comparePassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}
