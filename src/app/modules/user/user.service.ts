import { TUser } from "./user.interface";
import { User } from "./user.model";


const createStudentIntoDB = async (payload: TUser) => {
    // console.log(payload);
    const result = await User.create(payload);
    return result;
};

export const userServices = {
    createStudentIntoDB,
} 