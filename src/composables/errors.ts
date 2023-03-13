import { useToast } from "primevue/usetoast";

export function useErrors() {
  const toast = useToast();

  const showError = (message: string) => {
    toast.add({
      severity: "error",
      summary: "Ops!",
      detail: message,
      life: 5000,
    });
  };

  return {
    showError,
  };
}
