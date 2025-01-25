import React from 'react';

import { Stack, Dialog, Typography, DialogContent } from '@mui/material';

import AddInstituteForm from './AddInstituteForm';

const AddInstituteModal = ({ open, onClose, ...other }: any) => (
  <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
    <DialogContent className="max-h-[70vh] overflow-y-auto">
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{}}>
          Add Institute
        </Typography>
        <Typography variant="subtitle2" sx={{}}>
          .
        </Typography>
      </Stack>
      <AddInstituteForm />
    </DialogContent>
  </Dialog>
);

export default AddInstituteModal;
