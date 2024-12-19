import { Blog } from '../blog/blog.model';
import { User } from '../user/user.model';

const blockUserIntoDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  );

  return result;
};

const deleteBlogIntoDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const adminServices = {
  blockUserIntoDB,
  deleteBlogIntoDB,
};
