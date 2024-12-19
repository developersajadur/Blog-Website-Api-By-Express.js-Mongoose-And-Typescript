import catchAsync from "../../utils/catchAsync";
import { userServices } from "./user.service";


const createUser = catchAsync( async(req, res) => {
    const user = req?.body;
    const result = await userServices.createStudentIntoDB(user);
    const responseData = {
        _id: result._id,
        name: result.name,
        email: result.email,
    };

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: responseData
    });
})

export const userControllers = {
    createUser,
}