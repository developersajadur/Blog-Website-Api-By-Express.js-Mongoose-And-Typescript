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
exports.AuthControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_service_1 = require("./auth.service");
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthServices.loginUser(req === null || req === void 0 ? void 0 : req.body);
    const { accessToken } = result;
    const bearerToken = `Bearer ${accessToken}`;
    console.log(bearerToken);
    res.cookie('token', bearerToken, {
        secure: config_1.default.NODE_ENV === 'production',
        httpOnly: true,
    });
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Login successful',
        data: { token: bearerToken },
    });
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_service_1.AuthServices.refreshToken(refreshToken);
    const bearerToken = `Bearer ${result.accessToken}`;
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Access token is retrieved successfully',
        data: { token: bearerToken },
    });
}));
exports.AuthControllers = {
    loginUser,
    refreshToken,
};
