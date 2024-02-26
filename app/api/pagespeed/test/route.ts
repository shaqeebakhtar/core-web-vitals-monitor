import {
  getCruxResult,
  getPagespeedResult,
} from '@/data-access/pagespeed-test';
import { newTestSchema } from '@/schemas/new-test';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const body = await req.json();

  const validatedFields = newTestSchema.safeParse(body);

  if (!validatedFields.success) {
    return NextResponse.json({ message: 'Invalid fields!' }, { status: 400 });
  }

  const { url, device } = validatedFields.data;

  const cruxResult = await getCruxResult({ url, device });
  const pagespeedResult = await getPagespeedResult({ url, device });

  return NextResponse.json({ cruxResult, pagespeedResult }, { status: 200 });
};
