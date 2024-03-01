import { z } from 'zod';

export const monitorSchema = z.object({
  name: z.string(),
  url: z
    .string({ required_error: 'URL is required' })
    .url({ message: 'URL seems to be invalid' }),
  device: z.enum(['mobile', 'desktop']),
  schedule: z.enum(['daily', 'hourly']),
});

export type monitorSchemaType = z.infer<typeof monitorSchema>;
