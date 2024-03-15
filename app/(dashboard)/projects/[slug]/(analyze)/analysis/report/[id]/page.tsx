import { Button } from '@/components/ui/button';
import { ArrowLeft, Smartphone } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const ReportPage = async ({
  params,
}: {
  params: { slug: string; id: string };
}) => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect(
      `/login?next=/projects/${params.slug}/analysis/report/${params.id}`
    );
  }

  return (
    <main>
      <div className="flex h-28 items-center border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button asChild size={'icon'} variant={'outline'}>
                <Link href={`/projects/${params.slug}/analyze`}>
                  <span className="sr-only">Go back</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </Button>
              <h1 className="text-2xl">Analysis Report</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20 flex flex-col space-y-4 py-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="space-y-0 p-4 border rounded-md bg-white">
            <p className="text-sm text-gray-500">Showing report for URL</p>
            <p className="font-medium truncate max-w-fit">
              https://example.com/slug/
            </p>
          </div>
          <div className="space-y-0 p-4 border rounded-md bg-white">
            <p className="text-sm text-gray-500">Device</p>
            <div className="flex items-center space-x-1">
              <Smartphone className="w-4 h-4" />
              <p className="font-medium">Mobile</p>
            </div>
          </div>
          <div className="space-y-0 p-4 border rounded-md bg-white">
            <p className="text-sm text-gray-500">Report from</p>
            <p className="font-medium truncate max-w-fit">
              Feb 29, 2024, 2:28:38 AM
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReportPage;
