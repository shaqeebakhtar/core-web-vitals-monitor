import { getServerSession } from 'next-auth';

const Projects = async () => {
  const session = await getServerSession();
  return <div>Projects</div>;
};

export default Projects;
