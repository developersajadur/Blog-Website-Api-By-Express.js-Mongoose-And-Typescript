import { Router } from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import Auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = Router();

router.post('/register', Auth(USER_ROLE.user) , validateRequest(userValidation.createUserValidationSchema), userControllers.createUser)

export const userRoutes = router;