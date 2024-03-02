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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { newMonitor } from '@/data-access/monitor';
import { monitorSchema, monitorSchemaType } from '@/schemas/monitor';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ActivitySquare, Loader } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const NewMonitorModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const newMonitorForm = useForm<monitorSchemaType>({
    resolver: zodResolver(monitorSchema),
    defaultValues: {
      name: '',
      url: '',
      device: 'mobile',
      schedule: 'daily',
    },
  });

  const queryClient = useQueryClient();

  const newMonitorMutation = useMutation({
    mutationFn: newMonitor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['monitors'] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: monitorSchemaType) {
    newMonitorMutation.mutate({
      ...values,
    });
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button>
          <ActivitySquare className="w-4 h-4 mr-2" />
          Create monitor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:p-8">
        <DialogHeader className="space-y-0.5 mb-3">
          <DialogTitle className="text-center md:text-left text-xl">
            Create a new monitor
          </DialogTitle>
          <DialogDescription>
            Periodically check your pagespeed
          </DialogDescription>
        </DialogHeader>
        <Form {...newMonitorForm}>
          <form
            onSubmit={newMonitorForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={newMonitorForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme monitoring - Mobile" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={newMonitorForm.control}
              name="url"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://acme.com/" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-4">
              <FormField
                control={newMonitorForm.control}
                name="schedule"
                render={({ field }) => (
                  <FormItem className="space-y-1 flex-1">
                    <FormLabel>Schedule</FormLabel>
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
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={newMonitorForm.control}
                name="device"
                render={({ field }) => (
                  <FormItem className="space-y-1 flex-1">
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
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant={'outline'}
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={newMonitorMutation.isPending}>
                {newMonitorMutation.isPending && (
                  <Loader className="w-4 h-4 animate-spin mr-2" />
                )}
                Start monitoring
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewMonitorModal;
