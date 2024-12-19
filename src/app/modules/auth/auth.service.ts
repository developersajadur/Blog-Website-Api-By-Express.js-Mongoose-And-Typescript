import jwt, { JwtPayload } from 'jsonwebtoken';
import  bcrypt from 'bcrypt';
import status from 'http-status';
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from '../../config';
import { createToken } from './auth.utils';

const loginUser = async(payload: TLoginUser) => {
    const user = await User.findOne({ email: payload?.email}).select('+password')
    if(!user){
     throw new AppError(status.NOT_FOUND, 'This user is not found !')
    }
    
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked !');
  }

  const isMatch = await bcrypt.compare(payload?.password, user?.password);
  if(!isMatch){
    throw new AppError(status.UNAUTHORIZED, 'Invalid credentials !')
  }

 
 const jwtPayload = {
    userId :  user?._id.toString(),
    role: user?.role ?? 'user'
  }


  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10d'
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '60d',
  );



return {
    accessToken,
    refreshToken,
}


}



const refreshToken = async(token: string) => {

  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { userId } = decoded;

    const user = await User.findById(userId)
    if(!user){
     throw new AppError(status.NOT_FOUND, 'This user is not found !')
    }
    
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked !');
  }

 
 const jwtPayload = {
    userId :  user?._id.toString(),
    role: user?.role ?? 'user'
  }


  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10d'
  );



return {
    accessToken,
}


}



export const AuthServices = {
    loginUser,
    refreshToken,
  };