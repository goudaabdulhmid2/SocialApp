import * as z from 'zod';

const createPostSchema = z.object({
    body: z
        .string()
        .trim()
        .min(1, 'Post content is required')
        .max(500, 'Post content must be 500 characters or less'),
    image: z
        .any()
        .optional()
        .refine(
            (value) => !value || value.length === 0 || value instanceof FileList,
            'Please upload a valid image'
        ),
});

export default createPostSchema;