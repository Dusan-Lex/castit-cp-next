import { useEffect, useState } from "react";

function useWindowHeight(): number | undefined {
  const [windowHeight, setWindowHeight] = useState<number | undefined>(
    undefined
  );
  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowHeight;
}

export default useWindowHeight;
