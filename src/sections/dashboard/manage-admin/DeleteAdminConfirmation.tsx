import type { DialogProps } from '@mui/material';

import Api from '@/api';
import { toast } from 'sonner';
import { handleError } from '@/lib/utils';
import React, { useCallback } from 'react';
import { XIcon, DeleteIcon } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { LoadingButton } from '@mui/lab';
import { Stack, Dialog, Button, Typography, DialogContent } from '@mui/material';

interface Props extends DialogProps {
  open: boolean;
  onClose: VoidFunction;
  id: string;
}
const DeleteAdminConfirmation = ({ open, id, onClose, ...rest }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: Api.deleteAdmin,
  });

  const confirm = useCallback(() => {
    mutate(id, {
      onSuccess: (res) => {
        toast.success(res?.data.message);
        queryClient.invalidateQueries({
          queryKey: ['get admins'],
        });
        onClose();
      },
      onError: (err) => {
        handleError(err);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, mutate]);

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...rest}>
      <DialogContent className="max-h-[70vh] overflow-y-auto">
        <Stack spacing={2} sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Delete Admin
          </Typography>
          <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
            Are you sure you want to delete admin? This action is irreversible
          </Typography>
        </Stack>
        <div className="flex justify-between items-center gap-4">
          <Button variant="contained" startIcon={<XIcon />} onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton
            startIcon={<DeleteIcon />}
            type="button"
            onClick={confirm}
            variant="contained"
            color="error"
            loading={isPending}
            className="!py-[6px]  h-auto"
          >
            Submit
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAdminConfirmation;
