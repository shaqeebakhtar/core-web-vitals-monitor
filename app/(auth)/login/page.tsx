import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import LoginForm from '../_components/login-form';

export const metadata: Metadata = {
  title: 'Login | Core Web Vitals Monitor',
};

const Login = async () => {
  const session = await getServerSession();

  if (session && session?.user) {
    redirect('/projects');
  }

  return (
    <>
      <h1 className="font-semibold text-2xl md:text-3xl text-center">
        Welcome Back
      </h1>
      <LoginForm />
    </>
  );
};

export default Login;
