import Api from '@/api';
import { z } from 'zod';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import useEducationStore from '@/store/educationStore';

import { LoadingButton } from '@mui/lab';

const FormSchema = z.object({
  subject: z.string(),
  message: z.string(),
});

type FormType = z.infer<typeof FormSchema>;

const EmailForm = () => {
  const { preview } = useEducationStore();
  const form = useForm<FormType>({
    defaultValues: {
      subject: '',
      message: '',
    },
    resolver: zodResolver(FormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: Api.sendMessage,
  });

  function handleSubmit(val: FormType) {
    if (preview) {
      if (preview.institution) {
        const payload = {
          ...val,
          institution: preview?.institution,
          name: `${preview?.firstName ?? ''} ${preview?.lastName ?? ''}`,
          id: preview?._id,
        };
        mutate(
          { email: preview?.email, requester: preview?.requester, payload },
          {
            onSuccess: (res) => {
              form.reset({ message: '', subject: '' });
              toast.success('Email sent successfully');
            },
            onError: (error) => {
              console.log(error.message);
              toast.error('Failed to send email');
            },
          }
        );
      } else {
        toast.error('Institution not found');
      }
    } else {
      toast.error('An error occurred. Please select an item and try again');
    }
  }
  return (
    <form className="space-y-6 text-xs text-[#707070]">
      <div className="space-y-6">
        <Controller
          control={form.control}
          name="subject"
          render={({ field }) => (
            <div className="flex flex-col space-y-2 ">
              <span>Subject</span>
              <input
                type="subject"
                id="subject"
                required
                {...field}
                className="border rounded-md p-2 text-xs"
              />
            </div>
          )}
        />
        <Controller
          name="message"
          control={form.control}
          render={({ field }) => (
            <div className="flex flex-col space-y-2">
              <span>Body</span>
              <textarea
                id="message"
                cols={4}
                rows={4}
                {...field}
                className="border rounded-md p-2 text-xs"
                //   disabled={isPending}
              />
            </div>
          )}
        />
      </div>
      <div className="flex justify-end">
        <LoadingButton
          type="submit"
          className="!px-6 !bg-[#1877F2] !py-2 !text-white"
          onClick={(e) => {
            e.preventDefault();
            form.handleSubmit(handleSubmit)();
          }}
          loading={isPending}
          disabled={isPending}
        >
          Send
        </LoadingButton>
      </div>{' '}
    </form>
  );
};

export default EmailForm;
