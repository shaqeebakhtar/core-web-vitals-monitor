import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Settings = async ({ params }: { params: { slug: string } }) => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect(`/login?next=/projects/${params.slug}/settings`);
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 sm:p-10">
      General
    </div>
  );
};

export default Settings;
