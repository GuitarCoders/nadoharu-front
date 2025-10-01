"use client";

import { ReactNode } from "react";

export default function ModalWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 bg-[color:var(--background)] text-[color:var(--foreground)] overflow-y-auto animate-[fadeIn_150ms_ease-out]">
      {children}
    </div>
  );
}
