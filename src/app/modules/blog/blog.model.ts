import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
},
{
    timestamps: true,
}
)

// blogSchema.pre('save', function(next){
//     console.log(this);
//     next();
// })

export const Blog = model<TBlog>("blog", blogSchema);