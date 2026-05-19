import type { z } from 'zod';

/**
 * 使用 Zod schema 验证数据，验证通过则返回解析后的值，否则抛出可读的错误信息。
 *
 * @param schema - 用于验证的 Zod schema。
 * @param data - 待验证的未知数据。
 * @returns 解析并类型化后的数据。
 * @throws {Error} 验证失败时抛出，包含格式化的错误描述。
 */
export function validate<T>(schema: z.ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data);

  if (!result.success) {
    const [issue] = result.error.issues;
    const path = issue.path.length > 0 ? issue.path.join('.') : 'root';
    const msg = issue.message.replace(/^Invalid input:\s*/i, '');
    const message = `${path}: ${msg}`;
    throw new Error(message);
  }

  return result.data;
}
