import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    content: z.string({
      required_error: 'Content is required',
    }),
    author: z.string().optional(),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
  }),
});

export const blogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
