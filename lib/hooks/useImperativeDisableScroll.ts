import { useEffect } from "react";

function useImperativeDisableScroll({
  element,
  disabled,
}: {
  element: HTMLElement;
  disabled: boolean;
}) {
  useEffect(() => {
    if (!element) {
      return;
    }

    element.style.overflowY = disabled ? "hidden" : "scroll";

    return () => {
      element.style.overflowY = "scroll";
    };
  }, [disabled]);
}

export default useImperativeDisableScroll;
