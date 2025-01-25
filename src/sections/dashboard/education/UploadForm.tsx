import { z } from 'zod';
import Api from '@/api';
import React from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useEducationStore from '@/store/educationStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { LoadingButton } from '@mui/lab';

const FormSchema = z.object({
  comment: z.string().optional(),
  verificationStatus: z.string(),
  file: z.instanceof(FileList).optional(),
});

type FormType = z.infer<typeof FormSchema>;
const UploadForm = () => {
  const { preview } = useEducationStore();
  const queryClient = useQueryClient();

  const form = useForm<FormType>({
    defaultValues: {
      verificationStatus: 'completed',
    },
    resolver: zodResolver(FormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: Api.updateEducationVerification,
  });

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const val = form.getValues();

    if (preview && val.verificationStatus && val.file?.[0]) {
      const formdata = new FormData();
      formdata.append('verificationStatus', val.verificationStatus as string);
      if (val.file) {
        formdata.append('proof', val.file?.[0]);
      }
      mutate(
        {
          id: preview?._id as string,
          email: preview?.email as string,
          payload: formdata,
        },
        {
          onSuccess: (res) => {
            toast.success('Transcript status updated successfully');
            queryClient.invalidateQueries({
              queryKey: ['get transcript order'],
            });
          },
          onError: (error) => {
            console.log(error.message);
            toast.error('Failed to update transcript status');
          },
        }
      );
    } else {
      toast.error('All fields are required');
    }
  }
  return (
    <div>
      <div className="space-y-4">
        <input type="file" id="file" {...form.register('file')} />
        <div>
          <LoadingButton
            // eslint-disable-next-line react/jsx-no-bind
            onClick={handleSubmit}
            className="!px-6 !bg-[#1877F2] !py-2 !text-white"
            loading={isPending}
            disabled={isPending}
          >
            Upload
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
