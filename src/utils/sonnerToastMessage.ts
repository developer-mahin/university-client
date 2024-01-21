import { toast } from "sonner";

export const successMessage = (message: string, duration: number) => {
  return toast.success(message, { duration });
};

export const infoMessage = (message: string, duration: number) => {
  return toast.info(message, { duration });
};

export const errorMessage = (message: string, duration: number) => {
  return toast.error(message, { duration });
};

export const loadingMessage = (message: string, duration: number) => {
  return toast.loading(message, { duration });
};
