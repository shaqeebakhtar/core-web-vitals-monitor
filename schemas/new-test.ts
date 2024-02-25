import { z } from 'zod';

export const newTestSchema = z.object({
  url: z
    .string({ required_error: 'URL is required' })
    .url({ message: 'URL seems to be invalid' }),
  device: z.enum(['mobile', 'desktop']),
});

export type newTestSchemaType = z.infer<typeof newTestSchema>;
