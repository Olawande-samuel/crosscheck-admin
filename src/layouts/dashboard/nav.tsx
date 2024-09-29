import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Collapse } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { varAlpha } from 'src/theme/styles';

import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import type { WorkspacesPopoverProps } from '../components/workspaces-popover';

// ----------------------------------------------------------------------

export type NavContentProps = {
  data: {
    path: string;
    title: string;
    icon: React.ReactNode;
    info?: React.ReactNode;
    children?: {
      path: string;
      title: string;
    }[];
  }[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  workspaces: WorkspacesPopoverProps['data'];
  sx?: SxProps<Theme>;
};

export function NavDesktop({
  sx,
  data,
  slots,
  workspaces,
  layoutQuery,
}: NavContentProps & { layoutQuery: Breakpoint }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: 2.5,
        px: 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        bgcolor: 'var(--layout-nav-bg)',
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',
        borderRight: `1px solid var(--layout-nav-border-color, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)})`,
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
  workspaces,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          bgcolor: 'var(--layout-nav-bg)',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

export function NavContent({ data, slots, workspaces, sx }: NavContentProps) {
  const pathname = usePathname();
  return (
    <>
      <Logo />

      {slots?.topArea}

      {/* <WorkspacesPopover data={workspaces} sx={{ my: 2 }} /> */}

      <Scrollbar fillContent sx={{ pt: 5 }}>
        <Box component="nav" display="flex" flex="1 1 auto" flexDirection="column" sx={sx}>
          <Box component="ul" gap={3} display="flex" flexDirection="column">
            {data.map((item, i) => {
              const isActived = item.path === pathname;

              return item?.children ? (
                <ListItmC key={i} isActived={isActived} hasChild={item?.children} item={item} />
              ) : (
                <ListItm key={i} isActived={isActived} item={item} />
              );
            })}
            <ListItemButton
              disableGutters
              sx={{
                pl: 2,
                py: 1,
                gap: 2,
                pr: 1.5,
                borderRadius: 0.75,
                typography: 'body2',
                fontWeight: 'fontWeightMedium',
                color: 'var(--layout-nav-item-color)',
                minHeight: 'var(--layout-nav-item-height)',
              }}
            >
              <Box component="span" sx={{ width: 24, height: 24 }}>
                <Icon icon="solar:logout-3-broken" width="100%" height="100%" stroke="2.5" />
              </Box>

              <Box component="span" flexGrow={1}>
                Logout
              </Box>
            </ListItemButton>
          </Box>
        </Box>
      </Scrollbar>

      {slots?.bottomArea}
    </>
  );
}

const ListItm = ({ isActived = false, submenu = false, item }: any) => (
  <ListItem disableGutters disablePadding key={item.title}>
    <ListItemButton
      disableGutters
      component={RouterLink}
      href={item.path}
      sx={{
        pl: 2,
        py: 1,
        gap: 2,
        pr: 1.5,
        borderRadius: 0.75,
        typography: 'body2',
        fontWeight: 'fontWeightMedium',
        color: 'var(--layout-nav-item-color)',
        minHeight: 'var(--layout-nav-item-height)',
        ...(isActived && {
          fontWeight: 'fontWeightSemiBold',
          bgcolor: 'var(--layout-nav-item-active-bg)',
          color: 'var(--layout-nav-item-active-color)',
          '&:hover': {
            bgcolor: 'var(--layout-nav-item-hover-bg)',
          },
        }),
      }}
    >
      {submenu ? (
        // <Box component="span" sx={{ width: 24, height: 24 }}>
        <Iconify icon="material-symbols:line-start" color="grey" />
      ) : (
        // </Box>
        <Box component="span" sx={{ width: 24, height: 24 }}>
          {item.icon}
        </Box>
      )}

      <Box component="span" flexGrow={1}>
        {item.title}
      </Box>

      {item.info && item.info}
    </ListItemButton>
  </ListItem>
);
const ListItmC = ({ isActived = false, hasChild = false, item }: any) => {
  // console.log(isActived);
  const pathname = usePathname();

  const [open, setOpen] = useState(isActived);
  useEffect(() => {
    if (!isActived) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ListItem disableGutters disablePadding key={item.title}>
        <ListItemButton
          disableGutters
          component="div"
          onClick={handleToggle}
          sx={{
            pl: 2,
            py: 1,
            gap: 2,
            pr: 1.5,
            borderRadius: 0.75,
            typography: 'body2',
            fontWeight: 'fontWeightMedium',
            color: 'var(--layout-nav-item-color)',
            minHeight: 'var(--layout-nav-item-height)',
            ...(isActived && {
              fontWeight: 'fontWeightSemiBold',
              bgcolor: 'var(--layout-nav-item-active-bg)',
              color: 'var(--layout-nav-item-active-color)',
              '&:hover': {
                bgcolor: 'var(--layout-nav-item-hover-bg)',
              },
            }),
          }}
        >
          <Box component="span" sx={{ width: 24, height: 24 }}>
            {item.icon}
          </Box>

          <Box component="span" flexGrow={1}>
            {item.title}
          </Box>

          {item.info && item.info}
          {hasChild && (
            <Iconify
              width={16}
              icon={
                open || pathname.includes(item.path)
                  ? 'eva:arrow-ios-downward-fill'
                  : 'eva:arrow-ios-forward-fill'
              }
              sx={{ ml: 1, flexShrink: 0 }}
            />
          )}
        </ListItemButton>
      </ListItem>
      {hasChild && (
        <Collapse in={open || pathname.includes(item.path)} unmountOnExit>
          <NavSubList data={item.children || []} />
        </Collapse>
      )}
    </>
  );
};

type NavListSubProps = {
  data: any;
  // depth: number;
};

function NavSubList({ data }: NavListSubProps) {
  const pathname = usePathname();
  return (
    <>
      {data.map((item: any, i: number) => {
        const isActived = item.path === pathname;
        return (
          <ListItm
            key={i}
            item={item}
            isActived={isActived}
            submenu
            // depth={depth + 1}
          />
        );
      })}
    </>
  );
}
