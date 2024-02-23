'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEvent, useState } from 'react';
import slugify from '@sindresorhus/slugify';

const OnboardingForm = () => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  const hanldeSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(name, slug);
  };

  return (
    <>
      <form onSubmit={(e) => hanldeSubmit(e)} className="space-y-4">
        <div className="space-y-1">
          <Label>Project Name</Label>
          <Input
            placeholder="Acme Inc"
            required
            value={name}
            onChange={(e) => {
              setName(e.currentTarget.value);
              setSlug(slugify(e.currentTarget.value));
            }}
          />
        </div>

        <div className="space-y-1">
          <Label>Project Slug</Label>
          <div className="flex items-center">
            <div className="inline-flex items-center h-10 bg-muted text-muted-foreground px-3 text-sm font-semibold rounded-md rounded-r-none border border-input border-r-0 select-none">
              cwv.com
            </div>
            <Input
              placeholder="acme"
              type="text"
              required
              className="rounded-l-none"
              value={slug}
              onChange={(e) => setSlug(e.currentTarget.value)}
            />
          </div>
        </div>

        <Button type="submit" size={'lg'} className="w-full">
          Get started
        </Button>
      </form>
    </>
  );
};

export default OnboardingForm;
