import { Activity } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-1.5">
      <div className="rounded-full w-9 h-9 bg-green-400/20 p-2 inline-flex items-center justify-center">
        <Activity strokeWidth={3} className="w-5 h-5 text-green-400" />
      </div>
      <p className="text-lg font-bold">CWV Monitor</p>
    </div>
  );
};

export default Logo;
