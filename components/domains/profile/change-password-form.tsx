"use client";

import SubmitButton from "@/components/shared/buttons/submit-button";
import TextInput from "@/components/shared/inputs/text-input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as constants from "@/libs/constants";
import { updatePassword } from "@/app/me/setting/password/action";
import { toastAtom } from "@/libs/atoms";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";

interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export default function ChangePasswordForm() {
  const [pending, setPending] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ChangePasswordForm>();
  const setToast = useSetAtom(toastAtom);
  const router = useRouter();

  const validatePassword = (newPasswordConfirm: string) => {
    const newPassword = getValues("newPassword");

    if (newPassword !== newPasswordConfirm) {
      return constants.PASSWORD_NOT_MATCH_ERROR_MESSAGE;
    }
    return true;
  };

  const onChangePasswordSubmit = async (data: ChangePasswordForm) => {
    setPending(true);

    const response = await updatePassword({
      updatePasswordData: {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      },
    });

    if (response.success) {
      setToast({
        visible: true,
        isError: false,
        title: "비밀번호 변경에 성공했습니다.",
      });
      router.push("/me");
    } else {
      setPending(false);
      setToast({
        visible: true,
        isError: true,
        title: response.errorMessage,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onChangePasswordSubmit)}
      className="flex flex-col gap-4"
    >
      <div className="bg-neutral-100 dark:bg-neutral-800 flex flex-col justify-end p-4 gap-4 relative">
        <TextInput
          showLabel
          placeholder="기존 비밀번호"
          type="password"
          required={true}
          disabled={pending}
          errorMessage={errors.oldPassword?.message}
          {...register("oldPassword", { required: true })}
        />
        <TextInput
          showLabel
          placeholder="새 비밀번호"
          type="password"
          required={true}
          disabled={pending}
          errorMessage={errors.newPassword?.message}
          {...register("newPassword", { required: true })}
        />
        <TextInput
          showLabel
          placeholder="새 비밀번호 확인"
          type="password"
          required={true}
          disabled={pending}
          errorMessage={errors.newPasswordConfirm?.message}
          {...register("newPasswordConfirm", {
            required: true,
            validate: validatePassword,
          })}
        />
        <SubmitButton text="비밀번호 변경" pending={pending} className="mt-4" />
      </div>
    </form>
  );
}
