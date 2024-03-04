import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Settings = async ({ params }: { params: { slug: string } }) => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect(`/login?next=/projects/${params.slug}/settings`);
  }

  return <div>Settings</div>;
};

export default Settings;
