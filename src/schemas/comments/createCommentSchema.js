import * as z from 'zod';

const createCommentSchema = z.object({
    content: z
        .string()
        .trim()
        .min(1, 'Comment content is required')
        .max(500, 'Comment content must be 500 characters or less'),
    image: z
        .any()
        .optional()
        .refine(
            (value) => !value || value.length === 0 || value instanceof FileList,
            'Please upload a valid image'
        ),
});

export default createCommentSchema;