"use client";

import { PencilIcon } from "@heroicons/react/24/solid";
import ProfileImage from "./image";
import { useState } from "react";
import Textarea from "../../shared/inputs/textarea";
import SubmitButton from "../../shared/buttons/submit-button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { updateUser } from "@/app/me/setting/action";
import TextInput from "@/components/shared/inputs/text-input";
import { toastAtom } from "@/libs/atoms";
import { useSetAtom } from "jotai";
import * as constants from "@/libs/constants";

interface EditProfileFormProps {
  name: string;
  aboutMe: string;
  accountId: string;
}

interface EditProfileForm {
  name: string;
  about_me: string;
  password: string;
  confirm_password: string;
}

export default function EditProfileForm({
  name,
  aboutMe,
  accountId,
}: EditProfileFormProps) {
  const [pending, setPending] = useState(false);
  const { register, handleSubmit } = useForm<EditProfileForm>();
  const setToast = useSetAtom(toastAtom);
  const router = useRouter();

  const onEditProfileSubmit = async (formData: EditProfileForm) => {
    setPending(true);

    const response = await updateUser({
      name: formData.name,
      about_me: formData.about_me,
    });
    if (response.success) {
      setToast({
        visible: true,
        isError: false,
        title: "프로필이 성공적으로 업데이트 되었습니다.",
      });
      router.push("/me");
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
    <form onSubmit={handleSubmit(onEditProfileSubmit)}>
      <div className="bg-neutral-100 dark:bg-neutral-800 flex flex-col justify-end p-4 gap-4 relative">
        <div className="flex gap-5 items-center">
          <div className="size-20 rounded-md relative overflow-hidden">
            <label
              htmlFor="avatar"
              className="flex items-center justify-center absolute top-0 left-0 size-20 group cursor-pointer"
            >
              <PencilIcon className="size-6 opacity-40 group-hover:opacity-100" />
              {/* <input
                type="file"
                className="hidden"
                accept="image/*"
                id="avatar"
              /> */}
            </label>
            <ProfileImage avatar={null} name={name} size={20} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h5 className="font-semibold">@{accountId}</h5>
            </div>
            <p className="text-gray-400 text-sm">핸들명은 변경할 수 없어요</p>
          </div>
        </div>
        <TextInput
          showLabel
          placeholder="닉네임"
          {...register("name", { value: name })}
        />
        <Textarea
          showLabel
          placeholder="자기 소개"
          {...register("about_me", { value: aboutMe })}
        />
        <SubmitButton text="프로필 업데이트" pending={pending} />
      </div>
    </form>
  );
}
