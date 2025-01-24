import Api from '@/api';
import React from 'react';
import { toast } from 'sonner';
import { XIcon, DeleteIcon } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Stack, Button, Dialog, Typography, DialogContent } from '@mui/material';

const DeleteInstituteForm = ({ open, id, country, onClose, ...other }: any) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: Api.deleteInstitution,
  });

  function deleteInstitute() {
    mutate(id, {
      onSuccess: (res) => {
        queryClient.invalidateQueries({
          queryKey: ['get institutions', country],
        });
        toast.success('Institute deleted successfully');
      },
      onError: (err) => {
        console.error(err);
        toast.error('Failed to delete institution');
      },
    });
  }
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogContent className="max-h-[70vh] overflow-y-auto">
        <Stack spacing={2} sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Delete Institute
          </Typography>
          <Typography variant="subtitle2" sx={{}}>
            .
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="h4" textAlign="center">
            Are you sure you want to delete?
          </Typography>
          <Typography variant="subtitle1" textAlign="center">
            This action cannot be undone
          </Typography>
          <div className="flex mt-10 justify-between items-center gap-4 flex-wrap">
            <Button variant="contained" startIcon={<XIcon />} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              className="!text-white !bg-red-500"
              onClick={() => deleteInstitute()}
            >
              Delete
            </Button>
          </div>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteInstituteForm;
