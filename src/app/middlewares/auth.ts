import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import { User } from '../modules/user/user.model';

const Auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req?.headers?.authorization?.split(' ')[1];
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized!');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId } = decoded;

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(status.NOT_FOUND, 'User not found!');
    }
    const isBlocked = user?.isBlocked;
    if (isBlocked) {
      throw new AppError(status.FORBIDDEN, 'This user is Blocked !');
    }
    if (requiredRoles.length && !requiredRoles.includes(role as TUserRole)) {
      throw new AppError(
        status.FORBIDDEN,
        'You are not authorized for this action!',
      );
    }

    next();
  });
};

export default Auth;
