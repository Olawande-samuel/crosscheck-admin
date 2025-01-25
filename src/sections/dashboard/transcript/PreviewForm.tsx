import Api from '@/api';
import { z } from 'zod';
import React from 'react';
import { toast } from 'sonner';
import useUser from '@/hooks/useUser';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useTranscriptStore from '@/store/transcriptStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { LoadingButton } from '@mui/lab';

const FormSchema = z.object({
  comment: z.string().optional(),
  transcriptStatus: z.string(),
});

type FormType = z.infer<typeof FormSchema>;
const PreviewForm = () => {
  const { preview } = useTranscriptStore();
  const queryClient = useQueryClient();
  const user = useUser();

  const form = useForm<FormType>({
    defaultValues: {
      comment: '',
      transcriptStatus: '',
    },
    resolver: zodResolver(FormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: Api.updateTranscriptStatus,
  });

  function handleSubmit(val: FormType) {
    if (preview) {
      mutate(
        {
          id: preview?.transcriptId,
          payload: {
            transcriptStatus: val.transcriptStatus as string,
            updatedBy: `${user.user?.firstName ?? ''} ${user?.user?.lastName ?? ''}`,
            userEmail: preview?.email as string,
            comment: val.comment ?? '',
          },
        },
        {
          onSuccess: (res) => {
            toast.success('Transcript status updated successfully');
            queryClient.invalidateQueries({
              queryKey: ['get transcript order'],
            });
          },
          onError: (error) => {
            toast.error('Failed to update transcript status');
          },
        }
      );
    }
  }
  return (
    <form className="text-sm space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="flex flex-col gap-2 text-xs">
        <span className="">Comments</span>
        <Controller
          name="comment"
          control={form.control}
          render={({ field }) => (
            <textarea
              id="comment"
              cols={4}
              rows={4}
              {...field}
              className="border rounded-md p-2 text-xs"
              disabled={isPending}
            />
          )}
        />
      </div>
      <div className="flex flex-col gap-2 text-xs">
        <span>Status</span>
        <Controller
          name="transcriptStatus"
          control={form.control}
          render={({ field }) => (
            <select
              name="transcriptStatus"
              id="status"
              className="border p-2 rounded-md text-xs"
              value={field.value}
              onChange={field.onChange}
              disabled={isPending}
            >
              <option value="">Select Option</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
            </select>
          )}
        />
      </div>
      <div className="flex justify-end">
        <LoadingButton type="submit" className="!px-6 !bg-[#1877F2] !py-2 !text-white">
          Submit
        </LoadingButton>
      </div>
    </form>
  );
};

export default PreviewForm;
