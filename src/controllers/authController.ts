import * as authService from '@/services/authService';
import { asyncHandler } from '@/utils/handler';
import { success } from '@/utils/response';
import { validate } from '@/utils/validate';
import { loginSchema } from '@/validators/loginValidators';

// 用户登录
export const login = asyncHandler(async (req, res) => {
  const { username, password } = validate(loginSchema, req.body);
  const token = await authService.login(username, password);
  success(res, token, '登录成功');
});
