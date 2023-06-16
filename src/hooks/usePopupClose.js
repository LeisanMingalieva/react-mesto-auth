import { useEffect } from "react";

export function usePopupClose(isOpen, closeAllPopups) {
    useEffect(() => {
        if(isOpen) return;

        const handleOverlay = (e) => {
            if (e.target.classList.contains("popup_opened")) {
                closeAllPopups();
            }
        }

        const handleEscape = (e) => {
            if (e.key === "Escape") {
              closeAllPopups();
            }
          }

        document.addEventListener("keydown", handleEscape);
        document.addEventListener("mousedown", handleOverlay);

        return() => {
            document.removeEventListener("keydown", handleEscape);
            document.removeEventListener("mousedown", handleOverlay);
        }
    }, [isOpen, closeAllPopups])
}