import { z } from 'zod';
import Api from '@/api';
import { toast } from 'sonner';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useInstitutionStore from '@/store/institutionStore';
import { CountryDropdown } from 'react-country-region-selector';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';

const FormSchema = z.object({
  name: z.string().nonempty('Name is required'),
  instituteCharge: z.string(),
  ourCharge: z.string().nonempty('Our charge is required'),
  country: z.string().nonempty('Country is required'),
  transcriptFee: z.string().nonempty('Transcript fee is required'),
});

type FormType = z.infer<typeof FormSchema>;

const AddInstituteForm = () => {
  const { data, setInstitution } = useInstitutionStore();
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState('');
  const queryClient = useQueryClient();

  const form = useForm<FormType>({
    defaultValues: {
      name: '',
      instituteCharge: '',
      ourCharge: '',
      country: '',
      transcriptFee: '',
    },
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (data) {
      setIsEdit(true);
      form.reset({
        country: data?.country,
        transcriptFee: data?.transcriptFee,
        instituteCharge: data?.instituteCharge,
        ourCharge: data?.ourCharge,
        name: data?.name,
      });
      setId(data?._id);
    }
    return () => setInstitution(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const country = form.watch('country');

  const { mutate, isPending } = useMutation({
    mutationFn: Api.addInstitution,
  });

  const { mutate: editMutate, isPending: editIsPending } = useMutation({
    mutationFn: Api.updateInstitution,
  });

  function submitForm(val: FormType) {
    if (isEdit) {
      editMutate(
        { id, payload: val },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['get institutions', country],
            });
            toast.success('Institution updated successfully');
          },
          onError: (err) => {
            console.error(err);
            toast.error('Failed to update institution');
          },
        }
      );
      return;
    }
    mutate(val, {
      onSuccess: (res) => {
        form.reset();
        toast.success('Institution added successfully');
      },
      onError: (err) => {
        console.error(err);
        toast.error('Failed to add institution');
      },
    });
  }
  return (
    <form className="space-y-8" onSubmit={form.handleSubmit(submitForm)}>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2 ">
          <Controller
            control={form.control}
            name="name"
            render={({ field }) => (
              <TextField
                disabled={isPending || editIsPending}
                fullWidth
                label="Name"
                {...field}
                // InputLabelProps={{ shrink: true }}
                // disabled={isPending}
              />
            )}
          />

          {form?.formState?.errors?.name && (
            <span className="text-xs text-red-500">
              {form.formState.errors.name?.message ?? ''}
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-2 ">
          <Controller
            control={form.control}
            name="country"
            render={({ field }) => (
              <CountryDropdown
                id="country"
                className="country-country border py-4 rounded-lg px-4 border-[#e5e7eb]"
                valueType="full"
                value={field.value}
                onChange={field.onChange}
                disabled={isPending || editIsPending}
              />
            )}
          />

          {form?.formState?.errors?.name && (
            <span className="text-xs text-red-500">
              {form.formState.errors.name?.message ?? ''}
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-2 ">
          <Controller
            control={form.control}
            name="instituteCharge"
            render={({ field }) => (
              <TextField
                disabled={isPending || editIsPending}
                fullWidth
                label="institute Charge"
                {...field}
                // InputLabelProps={{ shrink: true }}
                // disabled={isPending || editIsPending}
              />
            )}
          />

          {form?.formState?.errors?.name && (
            <span className="text-xs text-red-500">
              {form.formState.errors.name?.message ?? ''}
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-2 ">
          <Controller
            control={form.control}
            name="ourCharge"
            render={({ field }) => (
              <TextField
                disabled={isPending || editIsPending}
                fullWidth
                label="Our Charge"
                {...field}
                // InputLabelProps={{ shrink: true }}
                // disabled={isPending || editIsPending}
              />
            )}
          />

          {form?.formState?.errors?.ourCharge && (
            <span className="text-xs text-red-500">
              {form.formState.errors.ourCharge?.message ?? ''}
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-2 ">
          <Controller
            control={form.control}
            name="transcriptFee"
            render={({ field }) => (
              <TextField
                disabled={isPending || editIsPending}
                fullWidth
                label="Transcript Fee"
                {...field}
                // InputLabelProps={{ shrink: true }}
                // disabled={isPending}
              />
            )}
          />

          {form?.formState?.errors?.transcriptFee && (
            <span className="text-xs text-red-500">
              {form.formState.errors.transcriptFee?.message ?? ''}
            </span>
          )}
        </div>
      </div>
      <LoadingButton
        type="submit"
        variant="contained"
        color="inherit"
        loading={isPending || editIsPending}
        className="!py-4 w-full h-auto"
      >
        Submit
      </LoadingButton>
    </form>
  );
};

export default AddInstituteForm;
