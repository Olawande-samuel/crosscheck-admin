import { formatCurrency } from '@/lib/utils';
import { useState, useCallback } from 'react';
import useInstitutionStore from '@/store/institutionStore';

import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Iconify } from 'src/components/iconify';

import DeleteInstituteForm from './DeleteInstituteForm';

// ----------------------------------------------------------------------

// export type UserProps = {
//   id: string;
//   name: string;
//   role: string;
//   avatarUrl: string;
//   // isVerified: boolean;
// };

type UserTableRowProps = {
  row: Institution;
  selected: boolean;
  onSelectRow: () => void;
  handleEditDialog: VoidFunction;
};

export function UserTableRow({ row, selected, onSelectRow, handleEditDialog }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const { setInstitution } = useInstitutionStore();
  const [openDelete, setOpenDelete] = useState(false);

  const handleDeleteCloseDialog = () => {
    setOpenDelete(false);
  };

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            {/* <Avatar alt={row.name} src="" /> */}
            {row.name}
          </Box>
        </TableCell>

        {/* <TableCell>{row.company}</TableCell> */}

        <TableCell>{row.country}</TableCell>
        <TableCell>{formatCurrency(row.instituteCharge ?? 0)}</TableCell>
        <TableCell>{formatCurrency(row.ourCharge ?? 0)}</TableCell>
        <TableCell>{formatCurrency(row.transcriptFee ?? 0)}</TableCell>

        {/* <TableCell align="center">
          {row.isVerified ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}
        </TableCell> */}

        {/* <TableCell>
          <Label color={(row.status === 'banned' && 'error') || 'success'}>{row.status}</Label>
        </TableCell> */}

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem
            onClick={() => {
              setInstitution(row);
              handleEditDialog();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={() => setOpenDelete(true)} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
      <DeleteInstituteForm
        open={openDelete}
        onClose={handleDeleteCloseDialog}
        country={row.country}
        id={row._id}
      />
    </>
  );
}
