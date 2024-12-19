import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";


const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: userRoutes,
      },
    {
        path: '/auth',
        route: AuthRoutes,
      },
]

moduleRoutes?.forEach(({ path, route }) => {
    router.use(path, route);
});

export default router;