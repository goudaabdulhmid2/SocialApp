import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ApiErrorDisplay({ error }) {
  useEffect(() => {
    if (error) {
      const errorMessage =
        typeof error === 'string' ? error :
          error?.response?.data?.message ||
          error?.message ||
          "An unexpected error occurred. Please try again.";

      toast.error(errorMessage);
    }
  }, [error]);

  return null;
}

// Optional helper function to call toast directly
export const showApiErrorToast = (error) => {
  if (!error) return;
  const errorMessage =
    typeof error === 'string' ? error :
      error?.response?.data?.message ||
      error?.message ||
      "An unexpected error occurred. Please try again.";

  toast.error(errorMessage);
};
