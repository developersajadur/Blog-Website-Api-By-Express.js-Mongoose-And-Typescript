import { Router } from "express";
import { blogControllers } from "./blog.controller";
import validateRequest from "../../middlewares/validateRequest";
import { blogValidations } from "./blog.validation";
import Auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post('/blogs', Auth(USER_ROLE.user) , validateRequest(blogValidations.createBlogValidationSchema) ,blogControllers.createBlog)

router.patch('/blogs/:id', Auth(USER_ROLE.user), validateRequest(blogValidations.updateBlogValidationSchema) ,blogControllers.updateBlog)


export const blogRoutes = router;