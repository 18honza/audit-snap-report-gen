
// Re-export from the hooks folder
import { useToast as useToastHook, toast as toastFunction } from "@/hooks/use-toast";

// Re-export with clearly named exports
export const useToast = useToastHook;
export const toast = toastFunction;
