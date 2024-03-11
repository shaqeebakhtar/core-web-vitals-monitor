import { authOptions } from '@/lib/auth/options';
import { newAnalysisSchema } from '@/schemas/new-analysis';
import { createAnalysis, getAnalysiData } from '@/services/analyze';
import { getPagespeedResult } from '@/services/pagespeed';
import { getServerSession } from 'next-auth';

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json(
      {
        message: 'Unauthorized: Login required!',
      },
      { status: 401 }
    );
  }

  const body = await req.json();

  const validatedFields = newAnalysisSchema.safeParse(body);

  if (!validatedFields.success) {
    return Response.json({ message: 'Invalid fields!' }, { status: 400 });
  }

  const { url, device } = validatedFields.data;

  const pagespeedResult = await getPagespeedResult({ url, device });

  const { metrics, scores, fetchedAt } = getAnalysiData(pagespeedResult);

  const analysis = await createAnalysis({
    metrics: JSON.stringify(metrics),
    scores: JSON.stringify(scores),
    fetchedAt,
    url,
    device,
  });

  return Response.json({ analysisId: analysis.id }, { status: 200 });
};
