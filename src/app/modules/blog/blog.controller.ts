import jwt, { JwtPayload } from 'jsonwebtoken';
import status from 'http-status';
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import { blogServices } from './blog.service';
import config from '../../config';
import { User } from '../user/user.model';
import { Blog } from './blog.model';

const createBlog = catchAsync(async (req, res) => {
  const blog = req?.body;
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError(status.UNAUTHORIZED, 'unauthorized');
  }
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  const { role, userId } = decoded;
  const user = await User.findById(userId);
  if (!user && !role) {
    throw new AppError(status.NOT_FOUND, 'User not found!');
  }
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(status.FORBIDDEN, 'This user is Blocked !');
  }
  const dataToSend = { ...blog, author: userId };
  const result = await blogServices.createBlogIntoDB(dataToSend);
  res.status(201).json({
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const blog = req?.body;
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError(status.UNAUTHORIZED, 'unauthorized');
  }
  const isBlogExit = await Blog.findById(id);
  if (!isBlogExit) {
    throw new AppError(status.NOT_FOUND, 'Blog not found');
  }
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  const { userId } = decoded;
  const author = isBlogExit?.author?.toString();
  if (userId !== author) {
    throw new AppError(
      status.FORBIDDEN,
      'You are not allowed to update this blog',
    );
  }
  const result = await blogServices.updateBlogIntoDB(id, blog);
  res.status(200).json({
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError(status.UNAUTHORIZED, 'unauthorized');
  }
  const isBlogExit = await Blog.findById(id);
  if (!isBlogExit) {
    throw new AppError(status.NOT_FOUND, 'Blog not found');
  }
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  const { userId } = decoded;
  const author = isBlogExit?.author?.toString();
  if (userId !== author) {
    throw new AppError(
      status.FORBIDDEN,
      'You are not allowed to delete this blog',
    );
  }
  await blogServices.deleteBlogFromDB(id);
  res.status(200).json({
    success: true,
    message: 'Blog deleted successfully',
  });
});

const getAllBlog = catchAsync(async (req, res) => {
  const result = await blogServices.getAllBlogFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'Blogs fetched successfully',
    data: result,
  });
});

export const blogControllers = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlog,
};
