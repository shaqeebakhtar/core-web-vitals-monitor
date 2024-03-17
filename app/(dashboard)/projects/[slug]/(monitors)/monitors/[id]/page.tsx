import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import MonitorReportClient from '../../_components/monitor-report-client';

const MonitorReport = async ({
  params,
}: {
  params: { slug: string; id: string };
}) => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect(`/login?next=/projects/${params.slug}/monitors/${params.id}`);
  }

  return <MonitorReportClient />;
};

export default MonitorReport;
