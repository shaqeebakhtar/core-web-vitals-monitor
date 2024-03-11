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
  newAnalysisSchema,
  newAnalysisSchemaType,
} from '@/schemas/new-analysis';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, MonitorSmartphone } from 'lucide-react';
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
import { newAnalysis } from '@/data-access/analyze';
import { toast } from 'sonner';

const NewAnalysisModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const newAnalysisForm = useForm<newAnalysisSchemaType>({
    resolver: zodResolver(newAnalysisSchema),
    defaultValues: {
      url: '',
      device: 'mobile',
    },
  });

  const newAnalysisMutation = useMutation({
    mutationFn: newAnalysis,
    onSuccess: () => {
      toast.success('Your analysis report is ready!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: newAnalysisSchemaType) {
    newAnalysisMutation.mutate({
      ...values,
    });
    setIsModalOpen(false);
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button>
          <MonitorSmartphone className="w-4 h-4 mr-2" />
          New Analysis
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:p-8">
        <DialogHeader className="space-y-0.5 mb-3">
          <DialogTitle className="text-center md:text-left text-xl">
            Analyze new page
          </DialogTitle>
          <DialogDescription>
            Run a manual lighthouse analysis.
          </DialogDescription>
        </DialogHeader>
        <Form {...newAnalysisForm}>
          <form
            onSubmit={newAnalysisForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={newAnalysisForm.control}
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
            <FormField
              control={newAnalysisForm.control}
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
              <Button type="submit" disabled={newAnalysisMutation.isPending}>
                {newAnalysisMutation.isPending && (
                  <Loader className="w-4 h-4 animate-spin mr-2" />
                )}
                Start analysis
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAnalysisModal;
