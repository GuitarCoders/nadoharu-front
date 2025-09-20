"use client";

import { ReactNode, useEffect, useState } from "react";

export default function ModalWrapper({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsOpen(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[color:var(--background)] text-[color:var(--foreground)]">
      <div
        className={`min-h-screen overflow-y-auto transition-all duration-200 ease-out ${
          isOpen ? "ml-0 opacity-100" : "ml-6 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
