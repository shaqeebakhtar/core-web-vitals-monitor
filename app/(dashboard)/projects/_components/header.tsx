import Link from 'next/link';
import React from 'react';
import NavTabs from './nav-tabs';
import UserProfileDropdown from './user-profile-dropdown';
import Logo from '@/components/logo';

const Header = () => {
  return (
    <header className="sticky left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white">
      <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-20">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo />
          </div>
          <UserProfileDropdown />
        </div>
        <NavTabs />
      </div>
    </header>
  );
};

export default Header;
