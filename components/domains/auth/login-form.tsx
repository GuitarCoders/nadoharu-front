"use client";

import { login } from "@/app/(auth)/login/action";
import SubmitButton from "@/components/shared/buttons/submit-button";
import TextInput from "@/components/shared/inputs/text-input";
import { toastAtom } from "@/libs/atoms";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginQueryVariables } from "@/graphql/generated/graphql";

export default function LoginForm() {
  const router = useRouter();
  const setToast = useSetAtom(toastAtom);
  const [pending, setPending] = useState(false);
  const { register, handleSubmit } = useForm<LoginQueryVariables>();

  const onLoginSubmit = async (loginData: LoginQueryVariables) => {
    setPending(true);

    const response = await login(loginData);
    if (response.success) {
      router.push("/posts");
    } else {
      setToast({
        visible: true,
        isError: true,
        title: response.errorMessage,
      });

      setPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onLoginSubmit)}
      className="flex flex-col gap-4 p-8"
    >
      <TextInput
        type="text"
        placeholder="유저명"
        required={true}
        {...register("username")}
      />
      <TextInput
        type="password"
        placeholder="비밀번호"
        required={true}
        {...register("password")}
      />
      <SubmitButton text="로그인" pending={pending} />
    </form>
  );
}
