// routes
// config
// components
import { Iconify } from '../../../components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/',
  },
  {
    title: 'Resources',
    path: '/pages',
    icon: <Iconify icon="eva:file-fill" />,
    children: [
      {
        subheader: 'For Developers',
        items: [{ title: 'API Doc', path: '/' }],
      },
      {
        subheader: 'Learn',
        items: [
          { title: 'Blog', path: '/' },
          { title: 'Case Studies', path: '/' },
          { title: 'Guid', path: '/' },
        ],
      },
      {
        subheader: 'Support',
        items: [
          { title: 'Help Center', path: '/' },
          { title: 'Submit Trafficking Victim Dispute', path: '/' },
        ],
      },
      // {
      //   subheader: 'Dashboard',
      //   items: [{ title: 'Dashboard', path: '/' }],
      // },
    ],
  },
  {
    title: 'About Us',
    icon: <Iconify icon="ic:round-grain" />,
    path: '/about-us',
  },
  {
    title: 'Pricing',
    icon: <Iconify icon="eva:book-open-fill" />,
    path: '/pricing',
  },
];

export default navConfig;
