import type { AppProps } from "next/app";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { ControlPanelProvider } from "../context/CPData";

import "../scss/All.scss";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    function handleResize() {
      document.documentElement.style.setProperty(
        "--100vh",
        `${window.innerHeight - 1}px`
      );
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ControlPanelProvider>
        <Component {...pageProps} />
      </ControlPanelProvider>
    </QueryClientProvider>
  );
}
