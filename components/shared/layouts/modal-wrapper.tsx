"use client";

import { ReactNode } from "react";

export default function ModalWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[color:var(--background)] text-[color:var(--foreground)]">
      {children}
    </div>
  );
}
