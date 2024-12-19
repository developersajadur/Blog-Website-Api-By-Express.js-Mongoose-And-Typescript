import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { blogRoutes } from "../modules/blog/blog.route";
import { adminRoutes } from "../modules/admin/admin.route";


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
    {
        path: '/',
        route: blogRoutes,
      },
    {
        path: '/admin',
        route: adminRoutes,
      },
]

moduleRoutes?.forEach(({ path, route }) => {
    router.use(path, route);
});

export default router;