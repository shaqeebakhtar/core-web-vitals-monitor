'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { newTestSchema, newTestSchemaType } from '@/schemas/new-test';
import { zodResolver } from '@hookform/resolvers/zod';
import { MonitorSmartphone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { newTest } from '@/data-access/analyze';

const NewTestModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const newTestForm = useForm<newTestSchemaType>({
    resolver: zodResolver(newTestSchema),
    defaultValues: {
      url: '',
      device: 'mobile',
    },
  });

  const newTestMutation = useMutation({
    mutationFn: newTest,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  function onSubmit(values: newTestSchemaType) {
    newTestMutation.mutate({
      ...values,
    });
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button>
          <MonitorSmartphone className="w-4 h-4 mr-2" />
          New test
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:p-8">
        <DialogHeader className="space-y-0.5 mb-3">
          <DialogTitle className="text-center md:text-left text-xl">
            Test new page
          </DialogTitle>
          <DialogDescription>Run a manual lighthouse test.</DialogDescription>
        </DialogHeader>
        <Form {...newTestForm}>
          <form
            onSubmit={newTestForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={newTestForm.control}
              name="url"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://cwvmonitor.com/" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={newTestForm.control}
              name="device"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Device</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="desktop">Desktop</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant={'outline'}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Start test</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTestModal;