import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import NewMonitorModal from '@/components/modals/new-monitor';

export const metadata: Metadata = {
  title: 'Monitors | Core Web Vitals Monitor',
};

const Alerts = async ({ params }: { params: { slug: string } }) => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect(`/login?next=/projects/${params.slug}/alerts`);
  }

  return (
    <>
      <div className="flex h-28 items-center border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Alerts</h1>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20 flex flex-col space-y-4 py-4"></div>
    </>
  );
};

export default Alerts;
