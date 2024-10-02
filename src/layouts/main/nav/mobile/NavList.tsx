import { useState } from 'react';

// @mui
import { Collapse } from '@mui/material';

import { usePathname } from 'src/routes/hooks';

import NavItem from './NavItem';
// hooks
import useActiveLink from '../../../../hooks/useActiveLink';
// components
import { NavSectionVertical } from '../../../../components/nav-section';

//
import type { NavItemProps } from '../types';

// ----------------------------------------------------------------------

type NavListProps = {
  item: NavItemProps;
};

export default function NavList({ item }: NavListProps) {
  const pathname = usePathname();

  const { path, children } = item;

  const { isExternalLink } = useActiveLink(path);

  const [open, setOpen] = useState(false);

  return (
    <>
      <NavItem
        item={item}
        open={open}
        onClick={() => setOpen(!open)}
        active={pathname === path}
        isExternalLink={isExternalLink}
      />

      {!!children && (
        <Collapse in={open} unmountOnExit>
          <NavSectionVertical
            data={children}
            sx={{
              '& .MuiList-root:last-of-type .MuiListItemButton-root': {
                height: 160,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                bgcolor: 'background.neutral',
                backgroundRepeat: 'no-repeat',
                backgroundImage: 'url(/assets/illustrations/illustration_dashboard.png)',
                '& > *:not(.MuiTouchRipple-root)': { display: 'none' },
              },
            }}
          />
        </Collapse>
      )}
    </>
  );
}
