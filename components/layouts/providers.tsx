import { ReactNode } from "react";
import { Provider as JotaiProvider } from "jotai";
import AlertDialogProvider from "./alert-dialog-provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <JotaiProvider>
      <AlertDialogProvider>{children}</AlertDialogProvider>
    </JotaiProvider>
  );
}
