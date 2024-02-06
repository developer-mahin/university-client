import { toast } from "sonner";

export const successMessage = (
  message: string,
  duration: number,
  id?: string | number
) => {
  return toast.success(message, { duration, id: id });
};

export const infoMessage = (
  message: string,
  duration: number,
  id?: string | number
) => {
  return toast.info(message, { duration, id: id });
};

export const errorMessage = (
  message: string,
  duration: number,
  id?: string | number
) => {
  return toast.error(message, { duration, id: id });
};

export const loadingMessage = (message: string, duration: number) => {
  return toast.loading(message, { duration });
};
