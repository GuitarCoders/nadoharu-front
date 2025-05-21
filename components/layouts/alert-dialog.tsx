"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { alertAtom } from "@/libs/atoms";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

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
      extraBtnColor,
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
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <AlertDialog.Content className="flex flex-col gap-2 fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-neutral-900 rounded-md p-6 shadow-md min-w-[340px] sm:min-w-[380px]">
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
            <AlertDialog.Action
              onClick={onExtraBtnClick}
              className="cursor-pointer bg-violet-500 text-white px-4 py-2 rounded-md hover:bg-violet-600"
            >
              {extraBtnText}
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
