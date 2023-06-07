import { toast } from "react-toastify";
export type MessageType = {
  type: "error" | "info" | "warning" | "success";
  message: string;
};
export default function useUserToast() {
  function showToast(messageBody: MessageType) {
    if (messageBody.type === "error") {
      toast.error(messageBody.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (messageBody.type === "success") {
      toast.success(messageBody.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  return { showToast };
}
