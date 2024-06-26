import Logo from '@/components/logo';
import React from 'react';

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <header>
        <div className="container py-4 px-4 md:px-8">
          <Logo />
        </div>
      </header>
      <main className="grid place-items-center h-[calc(100vh-56px)]">
        <div className="max-w-sm w-full space-y-6 px-4">{children}</div>
      </main>
    </>
  );
};

export default AuthLayout;
