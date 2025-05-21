"use client";

import { toastAtom } from "@/libs/atoms";
import { useAtom } from "jotai";
import * as Toast from "@radix-ui/react-toast";
import { useEffect, useRef } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function GlobalToast() {
  const [
    { visible, title, description, undoAction, duration = 5000, isError },
    setToast,
  ] = useAtom(toastAtom);

  const eventDateRef = useRef(new Date());
  const timerRef = useRef(0);

  useEffect(() => {
    if (visible) {
      eventDateRef.current = new Date();
      timerRef.current = window.setTimeout(() => {
        setToast({ visible: false, isError: false });
      }, duration);
    }
  }, [visible, setToast, duration]);

  return (
    <Toast.Provider duration={duration}>
      <Toast.Root
        className={`flex flex-col justify-center gap-x-4 rounded-md px-4 py-3 shadow-md transition-all duration-300 ease-out transform data-[state=open]:translate-y-0 data-[state=open]:opacity-100 data-[state=closed]:translate-y-5 data-[state=closed]:opacity-0 ${
          isError
            ? "bg-rose-400 dark:bg-rose-900 text-white"
            : "bg-neutral-900 text-white dark:bg-neutral-50 dark:text-neutral-900"
        }`}
        open={visible}
      >
        <Toast.Title className="flex items-center gap-2 font-semibold">
          {isError ? <InformationCircleIcon className="size-5" /> : null}
          {title}
        </Toast.Title>
        {description ? (
          <Toast.Description className="text-xs mt-2">
            {description}
          </Toast.Description>
        ) : null}
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-24 sm:bottom-12 left-1/2 sm:left-auto sm:right-0 -translate-x-1/2 sm:translate-x-0 z-50 m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-6 outline-none" />
    </Toast.Provider>
  );
}
