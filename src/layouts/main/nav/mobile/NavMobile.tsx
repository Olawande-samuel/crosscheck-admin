// next
import { useState, useEffect } from 'react';

// @mui
import { List, Drawer, IconButton } from '@mui/material';

import { usePathname } from 'src/routes/hooks';

import { Logo } from 'src/components/logo';

import NavList from './NavList';
// components
// config
import { NAV } from '../../../../config-global';
import { Iconify } from '../../../../components/iconify';
import { Scrollbar } from '../../../../components/scrollbar';

//
import type { NavProps } from '../types';

// ----------------------------------------------------------------------

export default function NavMobile({ isOffset, data }: NavProps) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          ml: 1,
          ...(isOffset && {
            color: 'text.primary',
          }),
        }}
      >
        <Iconify icon="eva:menu-2-fill" />
      </IconButton>

      <Drawer
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            pb: 5,
            width: NAV.W_BASE,
          },
        }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List component="nav" disablePadding>
            {data.map((link) => (
              <NavList key={link.title} item={link} />
            ))}
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}
