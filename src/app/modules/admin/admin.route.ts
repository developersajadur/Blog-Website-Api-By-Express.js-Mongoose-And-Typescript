import { Router } from "express";
import Auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { adminControllers } from "./admin.controller";


const router = Router();

router.patch('/users/:id/block', Auth(USER_ROLE.admin), adminControllers.blockUser)

router.delete('/blogs/:id', Auth(USER_ROLE.admin), adminControllers.deleteBlog)

export const adminRoutes = router;