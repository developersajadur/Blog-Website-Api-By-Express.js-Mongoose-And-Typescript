import { Router } from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';

const router = Router();

router.post(
  '/register',
  validateRequest(userValidation.createUserValidationSchema),
  userControllers.createUser,
);

export const userRoutes = router;
