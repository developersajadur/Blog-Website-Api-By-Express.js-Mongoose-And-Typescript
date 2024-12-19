import status from 'http-status';
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { adminServices } from "./admin.service";
import { User } from '../user/user.model';
import { Blog } from '../blog/blog.model';

const blockUser = catchAsync(async (req, res) => {
    const {id} = req.params;
    // console.log(id);
    if (!id) {
        throw new AppError(status.NOT_FOUND,"Invalid user ID");
    }
    const user = await User.findById({_id: id})
    if (!user) {
        throw new AppError(status.NOT_FOUND,"User not found");
    }
    if(user.isBlocked){
        throw new AppError(status.CONFLICT,"User is already blocked");
    }
    const result = await adminServices.blockUserIntoDB(id as any);
    res.status(200).json({
        success: true,
        "message": "User blocked successfully",
    });
})

const deleteBlog = catchAsync(async (req, res) => {
    const {id} = req.params;
    if (!id) {
        throw new AppError(status.NOT_FOUND,"Invalid blog ID");
    }
    const blog = await Blog.findById({_id: id})
    if (!blog) {
        throw new AppError(status.NOT_FOUND,"Blog not found");
    }
    const result = await adminServices.deleteBlogIntoDB(id as any);
    res.status(200).json({
        success: true,
        "message": "Blog deleted successfully",
    });
})


export const adminControllers = {
    blockUser,
    deleteBlog,
}