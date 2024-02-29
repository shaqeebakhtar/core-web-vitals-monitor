import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import React from 'react';

const Pricing = () => {
  return (
    <main className="mx-auto w-full max-w-screen-xl px-3 lg:px-20 mb-8 mt-16">
      <div className="mx-auto mb-5 lg:mb-20 text-center sm:max-w-lg">
        <h1 className="font-extrabold text-4xl sm:text-5xl">
          Simple, transparent, affordable pricing
        </h1>
        <p className="mt-5 text-gray-600 sm:text-lg">
          Start for free, no credit card needed.
        </p>
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <div className="bg-white border shadow-sm rounded-lg p-6">
          <h3 className="text-2xl font-medium">Free</h3>
          <p className="text-gray-500">For hobby, side projects, & trial</p>
          <div className="space-y-2 my-6">
            <p className="text-5xl font-semibold">$0</p>
            <p className="text-sm text-gray-500">Free forever</p>
          </div>
          <Button
            variant={'outline'}
            className="w-full rounded-full h-10 hover:bg-primary hover:text-white font-semibold"
          >
            Start for free
          </Button>
          <ul className="my-6 space-y-3">
            <li className="flex items-center space-x-2">
              <Check strokeWidth={2.5} className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Unlimited Projects</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check strokeWidth={2.5} className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">
                Share with 5 team members
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <Check strokeWidth={2.5} className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Sync across devices</span>
            </li>
          </ul>
        </div>
        <div className="relative bg-white border-2 border-blue-600 shadow-xl shadow-blue-100 rounded-b-lg p-6 mt-10 lg:mt-0">
          <div className="bg-blue-600 border-2 border-blue-600 uppercase tracking-widest text-center p-2.5 text-white text-sm font-medium rounded-t-lg absolute -top-11 -left-0.5 -right-0.5">
            recommended
          </div>
          <h3 className="text-2xl font-medium">Pro</h3>
          <p className="text-gray-500">For small teams</p>
          <div className="space-y-2 my-6">
            <p className="text-5xl font-semibold">$14</p>
            <p className="text-sm text-gray-500">/ month</p>
          </div>
          <Button className="bg-blue-600 text-white w-full rounded-full h-10 hover:bg-blue-500 font-semibold">
            Get started with Pro
          </Button>
          <ul className="my-6 space-y-3">
            <li className="flex items-center space-x-2">
              <Check strokeWidth={2.5} className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Unlimited Projects</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check strokeWidth={2.5} className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">
                Share with 5 team members
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <Check strokeWidth={2.5} className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Sync across devices</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check strokeWidth={2.5} className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Sync across devices</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check strokeWidth={2.5} className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Sync across devices</span>
            </li>
          </ul>
        </div>
        <div className="bg-white border shadow-sm rounded-lg p-6">
          <h3 className="text-2xl font-medium">Business</h3>
          <p className="text-gray-500">For larger teams</p>
          <div className="space-y-2 my-6">
            <p className="text-5xl font-semibold">$49</p>
            <p className="text-sm text-gray-500">/ month</p>
          </div>
          <Button className="w-full rounded-full h-10 font-semibold">
            Get started with business
          </Button>
          <ul className="my-6 space-y-3">
            <li className="flex items-center space-x-2">
              <Check strokeWidth={2.5} className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Unlimited Projects</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check strokeWidth={2.5} className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">
                Share with 5 team members
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <Check strokeWidth={2.5} className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Sync across devices</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check strokeWidth={2.5} className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Sync across devices</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check strokeWidth={2.5} className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Sync across devices</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check strokeWidth={2.5} className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Sync across devices</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check strokeWidth={2.5} className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Sync across devices</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check strokeWidth={2.5} className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-700">Sync across devices</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Pricing;
