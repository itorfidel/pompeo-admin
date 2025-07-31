import { useEffect } from "react";

const useClosePopup = (
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  overlayRef: React.RefObject<HTMLElement>,
  defaultRef: React.RefObject<HTMLElement>
) => {
  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      const eventTarget = e.target as HTMLElement;
      if (
        !overlayRef.current?.contains(eventTarget) &&
        !defaultRef.current?.contains(eventTarget)
      ) {
        setState(false);
      }
    };

    window.addEventListener("click", handleClose);
    return () => window.removeEventListener("click", handleClose);
  }, [setState, overlayRef, defaultRef]);
};

export default useClosePopup;
