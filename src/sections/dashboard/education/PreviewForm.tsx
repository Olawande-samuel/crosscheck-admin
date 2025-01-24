import Api from '@/api';
import { z } from 'zod';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import useEducationStore from '@/store/educationStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { LoadingButton } from '@mui/lab';

import EmailForm from './EmailForm';
import UploadForm from './UploadForm';

const FormSchema = z.object({
  comment: z.string().optional(),
  verificationStatus: z.string(),
});

type FormType = z.infer<typeof FormSchema>;
const PreviewForm = () => {
  const { preview } = useEducationStore();
  const queryClient = useQueryClient();

  const form = useForm<FormType>({
    defaultValues: {
      verificationStatus: '',
    },
    resolver: zodResolver(FormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: Api.updateEducationVerification,
  });

  const status = form.watch('verificationStatus');

  function handleSubmit(val: FormType) {
    console.log(val, { preview });
    // updatedBy: new Date().toISOString(),
    if (preview) {
      const formdata = new FormData();
      formdata.append('verificationStatus', val.verificationStatus as string);
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
              queryKey: ['get education order'],
            });
          },
          onError: (error) => {
            console.log(error.message);
            toast.error('Failed to update transcript status');
          },
        }
      );
    }
  }
  return (
    <form className="text-sm space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="flex flex-col gap-2 text-xs">
        <span>Status</span>
        <Controller
          name="verificationStatus"
          control={form.control}
          render={({ field }) => (
            <select
              name="verificationStatus"
              id="status"
              className="border p-2 rounded-md text-xs"
              value={field.value}
              onChange={field.onChange}
              disabled={isPending}
            >
              <option value="">Select Option</option>
              <option value="send-email">Send Email</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
            </select>
          )}
        />
      </div>
      <div className="space-y-6">
        {status === 'send-email' && <EmailForm />}
        {status === 'completed' && <UploadForm />}
        {status === 'processing' && (
          <div className="flex justify-end">
            <LoadingButton type="submit" className="!px-6 !bg-[#1877F2] !py-2 !text-white">
              Submit
            </LoadingButton>
          </div>
        )}
      </div>
    </form>
  );
};

export default PreviewForm;
