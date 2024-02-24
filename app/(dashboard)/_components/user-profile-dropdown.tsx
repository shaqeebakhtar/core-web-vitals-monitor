'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { generateAvatar } from '@/lib/random-avatar';
import { LogOut, MessageCircleQuestion, Settings } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const UserProfileDropdown = () => {
  const { data: session } = useSession();

  const avatar = generateAvatar(session?.user.name || 'random');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src={session?.user.image as string} />
            <AvatarFallback>{avatar}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 font-medium" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1 overflow-hidden">
            <p className="text-xs text-gray-700 font-normal">Logged in as</p>
            <p className="font-medium truncate">
              {session?.user?.email || 'shaqeeb@gmail.com'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/${session?.user.name}`}>
            <DropdownMenuItem>
              <MessageCircleQuestion className="w-4 h-4 mr-2 text-gray-700" />
              <span className="font-normal">Support</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/settings">
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2 text-gray-700" />
              <span className="font-normal">Settings</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
          <LogOut className="w-4 h-4 mr-2 text-gray-700" />
          <span className="font-normal">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
