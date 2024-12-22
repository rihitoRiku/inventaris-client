import { toast } from "react-hot-toast";

export const showToast = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message, {
        duration: 3000,
      });
      break;
    case "error":
      toast.error(message, {
        duration: 3000,
      });
      break;
    case "loading":
      toast.loading(message, {
        duration: 3000,
      });
      break;
    default:
      toast(message, {
        duration: 3000,
      });
  }
};
