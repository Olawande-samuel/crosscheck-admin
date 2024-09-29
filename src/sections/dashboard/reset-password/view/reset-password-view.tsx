import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import ResetPasswordForm from '../reset-password-form';

// ----------------------------------------------------------------------

export function ResetPasswordView() {
  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Reset Password
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Please enter the email address associated with your account and We will email you a link to
        reset your password.
      </Typography>

      <ResetPasswordForm />
    </DashboardContent>
  );
}
