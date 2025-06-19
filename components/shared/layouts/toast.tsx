"use client";

import { toastAtom } from "@/libs/atoms";
import { useAtom } from "jotai";
import * as Toast from "@radix-ui/react-toast";
import { useEffect, useRef } from "react";
import {
  ArrowTurnDownLeftIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion, Variants } from "framer-motion";

const toastVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: "easeIn",
    },
  },
};

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

      return () => {
        clearTimeout(timerRef.current);
      };
    }
  }, [visible, setToast, duration]);

  return (
    <Toast.Provider duration={duration} swipeDirection="down">
      <AnimatePresence>
        {visible && (
          <Toast.Root asChild forceMount open={visible}>
            <motion.div
              className={`flex flex-col justify-center gap-x-4 rounded-md px-4 py-3 shadow-md ${
                isError
                  ? "bg-rose-400 dark:bg-rose-900 text-white"
                  : "bg-neutral-900 text-white dark:bg-neutral-50 dark:text-neutral-900"
              }`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={toastVariants}
            >
              <Toast.Title className="flex gap-2 font-semibold">
                {isError ? (
                  <InformationCircleIcon className="mt-[2px] flex-shrink-0 size-5" />
                ) : null}
                {title}
              </Toast.Title>
              {description ? (
                <Toast.Description className="text-xs mt-2">
                  {description}
                </Toast.Description>
              ) : null}
              {undoAction ? (
                <Toast.Action
                  altText="Undo"
                  onClick={undoAction}
                  className="text-xs mt-2"
                >
                  <ArrowTurnDownLeftIcon className="size-4" />
                </Toast.Action>
              ) : null}
            </motion.div>
          </Toast.Root>
        )}
      </AnimatePresence>
      <Toast.Viewport className="fixed bottom-24 sm:bottom-12 left-1/2 sm:left-auto sm:right-0 -translate-x-1/2 sm:translate-x-0 z-50 m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-6 outline-none" />
    </Toast.Provider>
  );
}
