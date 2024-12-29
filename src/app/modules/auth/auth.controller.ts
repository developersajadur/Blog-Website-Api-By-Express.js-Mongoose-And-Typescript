import status from 'http-status';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req?.body);
  const { accessToken } = result;
  const bearerToken = `Bearer ${accessToken}`;
  res.cookie('accessToken', bearerToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });
  res.status(status.OK).json({
    success: true,
    message: 'Login successful',
    data: { accessToken: bearerToken },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);
  const bearerToken = `Bearer ${result.accessToken}`;

  res.status(status.OK).json({
    success: true,
    message: 'Access token is retrieved successfully',
    data: { accessToken: bearerToken },
  });
});

export const AuthControllers = {
  loginUser,
  refreshToken,
};
