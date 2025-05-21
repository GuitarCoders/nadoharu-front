"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { alertAtom } from "@/libs/atoms";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, Variants } from "framer-motion";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

export default function GlobalAlertDialog() {
  const router = useRouter();
  const [
    {
      visible,
      title,
      description,
      descriptionElement,
      closeBtn = true,
      closeBtnAction,
      extraBtnText,
      extraBtnAction,
      extraBtnColor = "neutral",
      extraBtnLoading,
      relogin,
    },
    setAlert,
  ] = useAtom(alertAtom);

  const buttonColor = (color: "neutral" | "red" | "green") => {
    switch (color) {
      case "neutral":
        return "text-neutral-500 bg-neutral-100 hover:bg-neutral-200";
      case "red":
        return "text-white bg-rose-600 hover:bg-rose-700-";
      case "green":
        return "text-white bg-green-500 hover:bg-green-600";
    }
  };

  const closeDialog = () => {
    setAlert({ visible: false, title: "", description: "" });
    if (closeBtnAction) {
      closeBtnAction();
    }
  };

  const onExtraBtnClick = () => {
    if (extraBtnAction) {
      extraBtnAction();
    }
    closeDialog();
  };

  const pushToLogin = () => {
    router.push("/login");
    closeDialog();
  };

  return (
    <AlertDialog.Root open={visible} onOpenChange={closeDialog}>
      <AnimatePresence>
        {visible && (
          <AlertDialog.Portal forceMount>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
            >
              <AlertDialog.Overlay className="fixed inset-0" />
            </motion.div>

            <motion.div
              className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-neutral-900 rounded-md p-6 shadow-md min-w-[340px] sm:min-w-[380px]"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={contentVariants}
            >
              <AlertDialog.Content className="flex flex-col gap-4 h-full">
                <AlertDialog.Title className="text-lg font-semibold">
                  {title}
                </AlertDialog.Title>
                <AlertDialog.Description>
                  {description ? description : descriptionElement}
                </AlertDialog.Description>
                <div className="flex justify-end gap-3 mt-2">
                  <AlertDialog.Cancel
                    onClick={closeDialog}
                    className="cursor-pointer bg-neutral-500 text-white px-4 py-2 rounded-md hover:bg-neutral-600"
                  >
                    {closeBtn ? "취소" : null}
                  </AlertDialog.Cancel>
                  {relogin ? (
                    <AlertDialog.Action
                      onClick={pushToLogin}
                      className={`cursor-pointer ${buttonColor(
                        extraBtnColor
                      )} px-4 py-2 rounded-md ${
                        extraBtnLoading ? "animate-pulse" : ""
                      }`}
                    >
                      {extraBtnText}
                    </AlertDialog.Action>
                  ) : (
                    <AlertDialog.Action
                      onClick={onExtraBtnClick}
                      className={`cursor-pointer ${buttonColor(
                        extraBtnColor
                      )} px-4 py-2 rounded-md ${
                        extraBtnLoading ? "animate-pulse" : ""
                      }`}
                    >
                      {extraBtnText}
                    </AlertDialog.Action>
                  )}
                </div>
              </AlertDialog.Content>
            </motion.div>
          </AlertDialog.Portal>
        )}
      </AnimatePresence>
    </AlertDialog.Root>
  );
}
