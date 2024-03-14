import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import AnalyzeClientPage from '../_components/analyze-client-page';

export const metadata: Metadata = {
  title: 'Analyze | Core Web Vitals Monitor',
};

const Analyze = async ({ params }: { params: { slug: string } }) => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect(`/login?next=/projects/${params.slug}/analyze`);
  }

  return <AnalyzeClientPage />;
};

export default Analyze;
