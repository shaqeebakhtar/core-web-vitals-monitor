'use client';
import { getProject } from '@/data-access/project';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ProjectsClient = () => {
  const projectsQuery = useQuery({
    queryKey: ['projects'],
    queryFn: getProject,
  });

  const router = useRouter();

  if (!projectsQuery.isLoading && projectsQuery.data) {
    const slug = projectsQuery.data.slug;
    router.push(`/projects/${slug}`);
  }

  if (!projectsQuery.isLoading && !projectsQuery.data) {
    router.push('/onboarding');
  }

  return (
    <div className="min-h-screen grid place-items-center">
      <Loader className="w-4 h-4 animate-spin" />
    </div>
  );
};

export default ProjectsClient;
