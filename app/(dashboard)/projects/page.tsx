import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ProjectsClient from './_components/projects-client';

export const metadata: Metadata = {
  title: 'Projects | Core Web Vitals Monitor',
};

const Projects = async () => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect(`/login?next=/projects`);
  }

  return <ProjectsClient />;
};

export default Projects;
