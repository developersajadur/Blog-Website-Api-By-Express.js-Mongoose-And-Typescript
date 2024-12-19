import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";


const createBlogIntoDB =async (payload: TBlog) => {
    const result = await Blog.create(payload);
    return result;
}
const updateBlogIntoDB =async (id: string ,payload: TBlog) => {
    const result = await Blog.findByIdAndUpdate(
        {_id: id},
        payload,
        {
            new: true
        }
    );
    return result;
}

export const blogServices = {
    createBlogIntoDB,
    updateBlogIntoDB,
};