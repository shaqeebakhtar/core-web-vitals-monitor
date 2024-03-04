import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react';

type Props = {};

const SearchInput = (props: Props) => {
  return (
    <div className="relative sm:max-w-72 w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Search className="w-4 h-4 text-gray-400" />
      </div>
      <Input type="text" className="bg-white pl-10" placeholder="Search..." />
    </div>
  );
};

export default SearchInput;
