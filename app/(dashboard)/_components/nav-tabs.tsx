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

  const isAnalyzeTab =
    pathname.startsWith(`/${slug}/analyze`) ||
    pathname.startsWith(`/${slug}/analysis/report/`);
  const isMonitorsTab =
    pathname.startsWith(`/${slug}/monitors`) || pathname.endsWith(`/${slug}`);

  return (
    <nav className="flex h-12 items-center space-x-1">
      {tabs.map((tab) => {
        const isActive =
          tab.name === 'Monitors'
            ? isMonitorsTab
            : tab.name === 'Analyze'
            ? isAnalyzeTab
            : pathname === tab.href;

        return (
          <Link key={tab.href} className="relative" href={tab.href}>
            <div
              className={cn(
                'm-1 rounded-sm px-2 md:px-3 py-1.5 transition-all duration-75 hover:bg-gray-100 text-gray-500 hover:text-primary text-sm',
                isActive && 'text-primary font-medium'
              )}
            >
              {tab.name}
            </div>
            {isActive && (
              <div className="absolute -bottom-1.5 w-full px-1.5">
                <div className="h-0.5 bg-primary"></div>
              </div>
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavTabs;
