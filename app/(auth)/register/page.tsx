import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import RegisterForm from '../_components/regiter-form';

export const metadata: Metadata = {
  title: 'Register | Core Web Vitals Monitor',
};

const Register = async () => {
  const session = await getServerSession();

  if (session && session?.user) {
    redirect('/projects');
  }

  return (
    <>
      <h1 className="font-semibold text-2xl md:text-3xl text-center">
        Let&apos;s get started
      </h1>
      <RegisterForm />
      <p className="px-4 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{' '}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </>
  );
};

export default Register;
