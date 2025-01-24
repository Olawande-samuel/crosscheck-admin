import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Stack } from '@mui/material';
// utils

import Api from '@/api';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// components
import FormProvider, { RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

interface FormValuesProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

type Props = {
  isEdit?: boolean;
  currentUser?: any;
};

export default function NewEditAdminForm({ isEdit = false, currentUser }: Props) {
  const queryClient = useQueryClient();
  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = useMemo(
    () => ({
      firstName: currentUser?.first_name || '',
      lastName: currentUser?.last_name || '',
      email: currentUser?.email || '',
      password: currentUser?.password || '',
      // isVerified: currentUser?.isVerified || true,
      // status: currentUser?.status,
      // role: currentUser?.role || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema) as any,
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const { mutate, isPending } = useMutation({
    mutationFn: Api.signup,
  });

  const onSubmit = async (data: FormValuesProps) => {
    const payload = { ...data, userType: 'admin' };
    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['get admins'] });
        toast.success('user created successfully');
        reset();
      },
      onError: (error) => {
        console.log(error);
        toast.error(error.message);
      },
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {/* <Card sx={{ p: 3 }}> */}
      <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
        }}
      >
        <RHFTextField name="firstName" label="First Name" disabled={isPending} />
        <RHFTextField name="lastName" label="Last Name" disabled={isPending} />
        <RHFTextField name="email" label="Email Address" disabled={isPending} />
        <RHFTextField name="password" label="Password" disabled={isPending} />
      </Box>

      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isPending}>
          {!isEdit ? 'Create User' : 'Save Changes'}
        </LoadingButton>
      </Stack>
      {/* </Card> */}
    </FormProvider>
  );
}
