import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Requests',
    path: '/dashboard/requests',
    icon: icon('ic-requests'),
    children: [
      { title: 'Transcript Order', path: '/dashboard/requests/transcript-order' },
      { title: 'Education Verification', path: '/dashboard/requests/education-verification' },
      { title: 'Identity Verification', path: '/dashboard/requests/identity-verification' },
      { title: 'Credit Check', path: '/dashboard/requests/credit-check' },
    ],
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'History',
    path: '/dashboard/history',
    icon: icon('ic-history'),
  },
  {
    title: 'Manage Admins',
    path: '/dashboard/manage-admins',
    icon: icon('ic-admin'),
  },
  {
    title: 'Manage Institutes',
    path: '/dashboard/manage-institutes',
    icon: icon('ic-institute'),
  },
  {
    title: 'Reset Password',
    path: '/dashboard/reset-password',
    icon: icon('ic-reset-password'),
  },
];
