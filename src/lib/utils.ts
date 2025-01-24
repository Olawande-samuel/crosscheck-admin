import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(val: string) {
  const amount = Number(val);
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
  return formatter;
}

export function handleError(err: Error) {
  if (isAxiosError(err)) {
    const error = err?.response?.data;

    if (error) {
      if (typeof error === 'object' && 'message' in error) {
        toast.error(String(error.message));
      }
      if (typeof error === 'string') {
        toast.error(error);
      }
    }
  } else {
    toast.error(err.message);
  }
}
