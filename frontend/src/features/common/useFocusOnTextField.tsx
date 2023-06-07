import { useEffect, useRef } from "react";

export default function useFocusOnTextField() {
  const fieldRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (fieldRef.current) {
      fieldRef.current.focus();
    }
  }, []);
  return { fieldRef };
}
