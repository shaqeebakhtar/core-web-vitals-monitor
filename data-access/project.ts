export const getProject = async () => {
  const res = await fetch('/api/projects');

  if (res.status === 401) {
    throw new Error('Unauthorized: Login required!');
  }

  return await res.json();
};
