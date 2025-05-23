// lib/hooks/useScrollLock.ts
import { useEffect } from "react";

export function useScrollLock(isOpen: boolean) {
  useEffect(() => {
    const body = document.body;
    if (!body) return;

    const originalOverflow = body.style.overflow;
    const originalPaddingRight = body.style.paddingRight;

    if (isOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      body.style.paddingRight = `${scrollBarWidth}px`;
      body.style.overflow = "hidden";
    } else {
      body.style.paddingRight = originalPaddingRight;
      body.style.overflow = originalOverflow;
    }

    return () => {
      body.style.paddingRight = originalPaddingRight;
      body.style.overflow = originalOverflow;
    };
  }, [isOpen]);
}
