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
exports.blogControllers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const blog_service_1 = require("./blog.service");
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("../user/user.model");
const blog_model_1 = require("./blog.model");
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = req === null || req === void 0 ? void 0 : req.body;
    const token = req.headers.authorization;
    if (!token) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'unauthorized');
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    const { role, userId } = decoded;
    const user = yield user_model_1.User.findById(userId);
    if (!user && !role) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    const isBlocked = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (isBlocked) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is Blocked !');
    }
    const dataToSend = Object.assign(Object.assign({}, blog), { author: userId });
    const result = yield blog_service_1.blogServices.createBlogIntoDB(dataToSend);
    res.status(201).json({
        success: true,
        message: 'Blog created successfully',
        data: result,
    });
}));
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const blog = req === null || req === void 0 ? void 0 : req.body;
    const isBlogExit = yield blog_model_1.Blog.findById(id);
    if (!isBlogExit) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog not found');
    }
    const result = yield blog_service_1.blogServices.updateBlogIntoDB(id, blog);
    res.status(200).json({
        success: true,
        message: 'Blog updated successfully',
        data: result,
    });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const isBlogExit = yield blog_model_1.Blog.findById(id);
    if (!isBlogExit) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog not found');
    }
    yield blog_service_1.blogServices.deleteBlogFromDB(id);
    res.status(200).json({
        success: true,
        message: 'Blog deleted successfully',
    });
}));
const getAllBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.blogServices.getAllBlogFromDB(req.query);
    res.status(200).json({
        success: true,
        message: 'Blogs fetched successfully',
        data: result,
    });
}));
exports.blogControllers = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlog,
};
