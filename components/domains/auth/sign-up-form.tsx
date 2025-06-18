"use client";

import SubmitButton from "@/components/shared/buttons/submit-button";
import TextInput from "@/components/shared/inputs/text-input";
import { useForm } from "react-hook-form";
import { signUp, SignUpFormData } from "@/app/(auth)/sign-up/action";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { toastAtom } from "@/libs/atoms";

export default function SignUpForm() {
  const router = useRouter();
  const setToast = useSetAtom(toastAtom);
  const { register, handleSubmit } = useForm<SignUpFormData>();

  const onSignUpSubmit = async (formData: SignUpFormData) => {
    const response = await signUp(formData);
    if (response.success) {
      router.push("/login");
    } else {
      setToast({
        visible: true,
        title: response.errorMessage,
        isError: true,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSignUpSubmit)}
      className="flex flex-col gap-4 p-8"
    >
      <TextInput
        type="text"
        placeholder="아이디"
        {...register("account_id", { required: true })}
      />
      <TextInput
        type="password"
        placeholder="비밀번호"
        required={true}
        {...register("password", { required: true })}
      />
      <hr className="my-3" />
      <TextInput
        placeholder="복구용 이메일"
        required={true}
        {...register("email", { required: true })}
      />
      <TextInput
        placeholder="닉네임"
        required={true}
        warning="다른 이용자에게 불쾌감을 줄 수 있는 별명은 삼가주세요!"
        {...register("name", { required: true })}
      />
      <SubmitButton text="회원가입" />
    </form>
  );
}
