import { Laptop2, Smartphone } from 'lucide-react';
import React from 'react';

type FormFactorIconProps = {
  factor: 'mobile' | 'desktop';
};

const FormFactorIcon = ({ factor }: FormFactorIconProps) => {
  return (
    <div className="py-0.5 px-1 rounded border space-x-1 inline-flex items-center bg-gray-100">
      {factor === 'mobile' && (
        <>
          <Smartphone className="w-3 h-3 text-gray-700" />
          <p className="text-xs text-gray-700 font-medium tracking-wide">Mob</p>
        </>
      )}
      {factor === 'desktop' && (
        <>
          <Laptop2 className="w-3 h-3 text-gray-700" />
          <p className="text-xs text-gray-700 font-medium tracking-wide">
            Desk
          </p>
        </>
      )}
    </div>
  );
};

export default FormFactorIcon;
