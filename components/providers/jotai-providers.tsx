import { ReactNode } from "react";
import { Provider as JotaiProvider } from "jotai";

export default function Providers({ children }: { children: ReactNode }) {
  return <JotaiProvider>{children}</JotaiProvider>;
}
