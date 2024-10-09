/* eslint-disable import/no-extraneous-dependencies */
// components
// @mui
import { Stack, Dialog, Typography, DialogContent, DialogActions } from '@mui/material';

import NewEditAdminForm from './new-edit-admin-form';

// ----------------------------------------------------------------------

export default function AdminFormialog({ open, onClose, ...other }: any) {
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogContent dividers sx={{ pt: 3, pb: 0, border: 'none' }}>
        <Stack spacing={2} sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{}}>
            Add User
          </Typography>
          <Typography variant="subtitle2" sx={{}}>
            .
          </Typography>
        </Stack>
        <NewEditAdminForm />
      </DialogContent>

      <DialogActions sx={{ alignItems: 'flex-end' }}>{/*  */}</DialogActions>
    </Dialog>
  );
}
