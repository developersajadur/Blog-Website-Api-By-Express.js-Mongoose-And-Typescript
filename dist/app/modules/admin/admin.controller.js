"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
/* eslint-disable @typescript-eslint/no-explicit-any */
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const admin_service_1 = require("./admin.service");
const user_model_1 = require("../user/user.model");
const blog_model_1 = require("../blog/blog.model");
const blockUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // console.log(id);
    if (!id) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Invalid user ID');
    }
    const user = yield user_model_1.User.findById({ _id: id });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (user.isBlocked) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'User is already blocked');
    }
    yield admin_service_1.adminServices.blockUserIntoDB(id);
    res.status(200).json({
        success: true,
        message: 'User blocked successfully',
    });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Invalid blog ID');
    }
    const blog = yield blog_model_1.Blog.findById({ _id: id });
    if (!blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog not found');
    }
    yield admin_service_1.adminServices.deleteBlogIntoDB(id);
    res.status(200).json({
        success: true,
        message: 'Blog deleted successfully',
    });
}));
exports.adminControllers = {
    blockUser,
    deleteBlog,
};
