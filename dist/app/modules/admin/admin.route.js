"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const admin_controller_1 = require("./admin.controller");
const router = (0, express_1.Router)();
router.patch('/users/:id/block', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), admin_controller_1.adminControllers.blockUser);
router.delete('/blogs/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), admin_controller_1.adminControllers.deleteBlog);
exports.adminRoutes = router;
