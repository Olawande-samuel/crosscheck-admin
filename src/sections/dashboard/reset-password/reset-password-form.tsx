import Api from '@/api';
import * as Yup from 'yup';
import { toast } from 'sonner';
// next
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
// form
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { LoadingButton } from '@mui/lab';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

// components

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
};

export default function ResetPasswordForm() {
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const { mutate, isPending } = useMutation({
    mutationFn: Api.forgotPassword,
  });

  const onSubmit = async (data: FormValuesProps) => {
    mutate(data, {
      onSuccess: (res) => {
        toast.success(res.data.message);
        reset();
        sessionStorage.setItem('email-recovery', data.email);
      },
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="email" label="Email address" disabled={isPending} />
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting || isPending}
        sx={{ mt: 3 }}
        disabled={isSubmitting || isPending}
      >
        Send Request
      </LoadingButton>
    </FormProvider>
  );
}
