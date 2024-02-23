import React from 'react';
import OnboardingForm from '../_components/onboarding-form';

const Onboarding = () => {
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
