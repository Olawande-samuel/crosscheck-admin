// @mui
import type { LinkProps } from '@mui/material';

import { m } from 'framer-motion';
import { forwardRef } from 'react';

import { Link, CardActionArea } from '@mui/material';

import Image from 'src/components/image';

import { ListItem } from './styles';
// components
import { Iconify } from '../../../../components/iconify';

//
import type { NavItemProps, NavItemDesktopProps } from '../types';

// ----------------------------------------------------------------------

export const NavItem = forwardRef<HTMLDivElement, NavItemDesktopProps>(
  ({ item, open, isOffset, active, subItem, isExternalLink, ...other }, ref) => {
    const { title, path, children } = item;

    const renderContent = (
      <ListItem
        ref={ref}
        disableRipple
        isOffset={isOffset}
        subItem={subItem}
        active={active}
        open={open}
        {...other}
      >
        {title}

        {!!children && <Iconify width={16} icon="eva:arrow-ios-downward-fill" sx={{ ml: 1 }} />}
      </ListItem>
    );

    // ExternalLink
    if (isExternalLink) {
      return (
        <Link href={path} target="_blank" rel="noopener" underline="none">
          {renderContent}
        </Link>
      );
    }

    // Has child
    if (children) {
      return renderContent;
    }

    // Default
    return (
      <Link component={Link} href={path} underline="none">
        {renderContent}
      </Link>
    );
  }
);

// ----------------------------------------------------------------------

interface NavItemDashboardProps extends LinkProps {
  item: NavItemProps;
}

export function NavItemDashboard({ item, sx, ...other }: NavItemDashboardProps) {
  return (
    <Link component={Link} href={item.path} underline="none" sx={{ width: 1 }} {...other}>
      <CardActionArea
        sx={{
          py: 5,
          px: 10,
          minHeight: 400,
          borderRadius: 1,
          color: 'text.disabled',
          bgcolor: 'background.neutral',

          ...sx,
        }}
      >
        <m.div
          whileTap="tap"
          whileHover="hover"
          variants={{
            hover: { scale: 1.02 },
            tap: { scale: 0.98 },
          }}
        >
          <Image
            visibleByDefault
            alt="illustration_dashboard"
            src="/assets/illustrations/illustration_dashboard.png"
          />
        </m.div>
      </CardActionArea>
    </Link>
  );
}
