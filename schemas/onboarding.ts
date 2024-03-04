import { z } from 'zod';

export const onboardingSchema = z.object({
  name: z.string(),
  slug: z.string(),
});

export type onboardingSchemaType = z.infer<typeof onboardingSchema>;
