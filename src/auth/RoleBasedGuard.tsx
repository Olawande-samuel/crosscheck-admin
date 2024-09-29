// @mui
import { Container, Typography } from '@mui/material';
// components
// assets
// import { ForbiddenIllustration } from '../assets/illustrations';
//

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  hasContent?: boolean;
  roles?: string[];
  children: React.ReactNode;
};

export default function RoleBasedGuard({ hasContent, roles, children }: RoleBasedGuardProp) {
  // Logic here to get current user role
  const user: any = {};

  // const currentRole = 'user';
  const currentRole = user?.role; // admin;

  if (typeof roles !== 'undefined' && !roles.includes(currentRole)) {
    return hasContent ? (
      <Container sx={{ textAlign: 'center' }}>
        <Typography variant="h3" paragraph>
          Permission Denied
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          You do not have permission to access this page
        </Typography>

        {/* <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} /> */}
      </Container>
    ) : null;
  }

  return <> {children} </>;
}
