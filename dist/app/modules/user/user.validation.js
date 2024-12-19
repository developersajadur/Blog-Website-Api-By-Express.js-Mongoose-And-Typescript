"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
// Define the zod schema for user validation
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email('Invalid email address'),
        password: zod_1.z
            .string({
            required_error: 'Password is required',
        })
            .min(6, 'Password must be at least 6 characters long')
            .max(20, 'Password must be at least 20 characters'),
        role: zod_1.z.enum(['admin', 'user']).optional(),
        isBlocked: zod_1.z.boolean().optional(),
    }),
});
exports.userValidation = {
    createUserValidationSchema,
};
