"use client";

import { login, LoginFormData } from "@/app/(auth)/login/action";
import SubmitButton from "@/components/shared/buttons/submit-button";
import TextInput from "@/components/shared/inputs/text-input";
import { PASSWORD_MIN_LENGTH } from "@/libs/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const { register, handleSubmit } = useForm<LoginFormData>();

  const onLoginSubmit = async (formData: LoginFormData) => {
    setPending(true);
    const response = await login(formData);
    if (response.ok) {
      router.push("/posts");
    } else {
      alert("error!");
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
        minLength={PASSWORD_MIN_LENGTH}
        {...register("password")}
      />
      <SubmitButton text="로그인" pending={pending} />
    </form>
  );
}
