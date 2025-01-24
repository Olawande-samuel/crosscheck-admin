import { z } from 'zod';
import Api from '@/api';
import { toast } from 'sonner';
import { useState } from 'react';
import useUser from '@/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const FormSchema = z.object({
  firstName: z.string().nonempty('Full name is required'),
  lastName: z.string().nonempty('Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 8 characters'),
});

type FormType = z.infer<typeof FormSchema>;
export function SignUpView() {
  const [showPassword, setShowPassword] = useState(false);
  const { storeUser } = useUser();
  const navigate = useNavigate();

  const form = useForm<FormType>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(FormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: Api.signup,
  });

  const handleSignIn = (val: FormType) => {
    const payload = { ...val, userType: 'admin' };
    mutate(payload, {
      onSuccess: (res) => {
        toast.success('Sign up successfully');
        storeUser(res?.data?.user);
        navigate('/dashboard', { replace: true });
      },
    });
  };

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign Up</Typography>
        <Typography variant="body2" color="text.secondary">
          Already have an account?
          <Link variant="subtitle2" href="/sign-in" sx={{ ml: 0.5 }}>
            Sign In
          </Link>
        </Typography>
      </Box>

      <form>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2 ">
            <Controller
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="First name"
                  defaultValue=""
                  {...field}
                  InputLabelProps={{ shrink: true }}
                  disabled={isPending}
                />
              )}
            />

            {form?.formState?.errors?.firstName && (
              <span className="text-xs text-red-500">
                {form.formState.errors.firstName?.message ?? ''}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2 ">
            <Controller
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Last name"
                  defaultValue=""
                  {...field}
                  InputLabelProps={{ shrink: true }}
                  disabled={isPending}
                />
              )}
            />

            {form?.formState?.errors?.lastName && (
              <span className="text-xs text-red-500">
                {form.formState.errors.lastName?.message ?? ''}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Controller
              control={form.control}
              name="email"
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Email address"
                  defaultValue=""
                  {...field}
                  InputLabelProps={{ shrink: true }}
                  disabled={isPending}
                />
              )}
            />

            {form?.formState?.errors?.email && (
              <span className="text-xs text-red-500">
                {form.formState.errors.email?.message ?? ''}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Controller
              control={form.control}
              name="password"
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Password"
                  defaultValue=""
                  {...field}
                  InputLabelProps={{ shrink: true }}
                  disabled={isPending}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify
                            icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            {form?.formState?.errors?.password && (
              <span className="text-xs text-red-500">
                {form.formState.errors.password?.message ?? ''}
              </span>
            )}
          </div>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="contained"
            onClick={form.handleSubmit(handleSignIn)}
            loading={isPending}
          >
            Sign Up
          </LoadingButton>
        </div>
      </form>

      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider>

      <Box gap={1} display="flex" justifyContent="center">
        <IconButton color="inherit">
          <Iconify icon="logos:google-icon" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="eva:github-fill" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="ri:twitter-x-fill" />
        </IconButton>
      </Box>
    </>
  );
}
