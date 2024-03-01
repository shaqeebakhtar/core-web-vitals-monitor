import { getCruxResult, getPagespeedResult } from '@/services/pagespeed';
import { newTestSchema } from '@/schemas/new-test';

export const POST = async (req: Request) => {
  const body = await req.json();

  const validatedFields = newTestSchema.safeParse(body);

  if (!validatedFields.success) {
    return Response.json({ message: 'Invalid fields!' }, { status: 400 });
  }

  const { url, device } = validatedFields.data;

  const cruxResult = await getCruxResult({ url, device });
  const pagespeedResult = await getPagespeedResult({ url, device });

  return Response.json({ cruxResult, pagespeedResult }, { status: 200 });
};
