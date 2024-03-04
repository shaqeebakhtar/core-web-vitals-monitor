import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import OnboardingForm from '../_components/onboarding-form';

export const metadata: Metadata = {
  title: 'Onboarding | Core Web Vitals Monitor',
};

const Onboarding = async () => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect('/login');
  }

  return (
    <>
      <div className="space-y-1 text-center">
        <h1 className="font-semibold text-2xl md:text-3xl ">
          Setup your dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          You can always edit or add new projects later.
        </p>
      </div>
      <OnboardingForm />
    </>
  );
};

export default Onboarding;
