import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";


const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: userRoutes,
      },
]

moduleRoutes?.forEach(({ path, route }) => {
    router.use(path, route);
});

export default router;