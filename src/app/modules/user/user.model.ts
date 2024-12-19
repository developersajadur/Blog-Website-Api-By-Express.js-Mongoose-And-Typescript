import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";


const userSchema = new Schema<TUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    isBlocked: {
        type: Boolean,
        default: false,
    }
},{
    timestamps: true,
}
)

userSchema.pre('save', function(next){
    const user = this as TUser;
    const password = user?.password
    const hashPassword = bcrypt.hashSync(password, Number(config.bcrypt_salt_rounds));
    user.password = hashPassword;
    next()
})




export const User = model<TUser>('User', userSchema);