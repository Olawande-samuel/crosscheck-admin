import Api from '@/api';
import { z } from 'zod';
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

const FormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
});

type FormType = z.infer<typeof FormSchema>;
// ----------------------------------------------------------------------

export function SignInView() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { storeUser } = useUser();

  const form = useForm<FormType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(FormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: Api.login,
  });

  console.log(form.formState.errors);
  console.log(form.getValues());

  const handleSignIn = (val: FormType) => {
    console.log(val);
    mutate(val, {
      onSuccess: (res) => {
        toast.success('Sign in successfully');
        storeUser(res?.data?.user);
        navigate('/dashboard');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign In</Typography>
        <Typography variant="body2" color="text.secondary">
          Don’t have an account?
          <Link variant="subtitle2" href="/sign-up" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>
      </Box>

      <form onSubmit={form.handleSubmit(handleSignIn)}>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2 ">
            <Controller
              control={form.control}
              name="email"
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Email address"
                  InputLabelProps={{ shrink: true }}
                  disabled={isPending}
                  {...field}
                />
              )}
            />
          </div>

          <div className="">
            <Link variant="body2" color="inherit">
              Forgot password?
            </Link>
            <div className="flex flex-col space-y-2 mt-3 ">
              <Controller
                control={form.control}
                name="password"
                render={({ field }) => (
                  <TextField
                    fullWidth
                    {...field}
                    label="Password"
                    InputLabelProps={{ shrink: true }}
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
                    disabled={isPending}
                  />
                )}
              />
            </div>
          </div>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="contained"
            loading={isPending}
          >
            Sign in
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
