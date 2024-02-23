import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: `Email doesn't seems to be valid` }),
  password: z.string({ required_error: 'Password is required' }),
});

export type loginSchemaType = z.infer<typeof loginSchema>;
