import { toast } from "sonner";

interface ToastProps {
	message: string | React.ReactNode;
	type: "success" | "error" | "warning" | "info";
}

export const showToast = ({ message, type }: ToastProps) => {
	toast[type](message);
};
