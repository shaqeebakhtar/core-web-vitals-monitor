'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const NavTabs = () => {
  const pathname = usePathname();
  const { slug } = useParams() as { slug?: string };
  const tabs = [
    { name: 'Monitors', href: `/${slug}` },
    { name: 'Analyze', href: `/${slug}/analyze` },
    { name: 'Settings', href: `/${slug}/settings` },
  ];

  return (
    <nav className="flex h-12 items-center space-x-1">
      {tabs.map((tab) => (
        <Link key={tab.href} className="relative" href={tab.href}>
          <div
            className={cn(
              'm-1 rounded-sm px-2 md:px-3 py-1.5 transition-all duration-75 hover:bg-gray-100 text-gray-500 hover:text-primary text-sm',
              pathname === tab.href && 'text-primary'
            )}
          >
            {tab.name}
          </div>
          {pathname === tab.href && (
            <div className="absolute -bottom-1.5 w-full px-1.5">
              <div className="h-0.5 bg-primary"></div>
            </div>
          )}
        </Link>
      ))}
    </nav>
  );
};

export default NavTabs;
