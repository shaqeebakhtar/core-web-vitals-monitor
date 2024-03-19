'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, useSelectedLayoutSegment } from 'next/navigation';
import React from 'react';

const SettingsLayout = ({
  tabs,
  children,
}: {
  tabs: {
    name: string;
    segment: string | null;
  }[];
  children: React.ReactNode;
}) => {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const { slug } = useParams() as {
    slug?: string;
  };

  return (
    <div className="h-[calc(100vh-16px)] bg-white">
      <div className="flex h-28 items-center border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Settings</h1>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20 space-y-4 grid items-start gap-5 py-10 lg:grid-cols-5">
        <div className="top-36 flex gap-1 lg:sticky lg:grid">
          {tabs.map(({ name, segment }) => {
            const href = `${slug ? `/projects/${slug}` : ''}/settings${
              segment ? `/${segment}` : ''
            }`;

            return (
              <Link key={segment} className="relative" href={href}>
                <div
                  className={cn(
                    'm-1 rounded-sm px-2 md:px-3 py-1.5 transition-all duration-75 hover:bg-gray-100 text-gray-500 hover:text-primary text-sm',
                    selectedLayoutSegment === segment &&
                      'text-primary font-medium'
                  )}
                >
                  {name}
                </div>
              </Link>
            );
          })}
        </div>
        <div className="grid gap-5 lg:col-span-4">{children}</div>
      </div>
    </div>
  );
};

export default SettingsLayout;
