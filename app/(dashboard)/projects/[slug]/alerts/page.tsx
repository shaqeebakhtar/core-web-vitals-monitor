import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Alerts = async ({ params }: { params: { slug: string } }) => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect(`/login?next=/projects/${params.slug}/alerts`);
  }

  return <div>Alerts</div>;
};

export default Alerts;
