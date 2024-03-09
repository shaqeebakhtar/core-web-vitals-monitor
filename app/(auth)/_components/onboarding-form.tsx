'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { onboarding } from '@/data-access/auth';
import slugify from '@sindresorhus/slugify';
import { useMutation } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

const OnboardingForm = () => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const router = useRouter();

  const onboardingMutation = useMutation({
    mutationFn: onboarding,
    onSuccess: () => {
      router.push('/projects');
      setIsCreatingProject(false);
    },
    onError: (error) => {
      toast.error(error.message);
      setIsCreatingProject(false);
    },
  });

  const hanldeSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name === '') {
      toast.error('Project name is required');
      return;
    } else if (slug === '') {
      toast.error('Project slug is required');
      return;
    }

    setIsCreatingProject(true);
    onboardingMutation.mutate({ name, slug });
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

        <Button
          type="submit"
          size={'lg'}
          className="w-full"
          disabled={onboardingMutation.isPending || isCreatingProject}
        >
          {(onboardingMutation.isPending || isCreatingProject) && (
            <Loader className="w-4 h-4 animate-spin mr-2" />
          )}
          Get started
        </Button>
      </form>
    </>
  );
};

export default OnboardingForm;
