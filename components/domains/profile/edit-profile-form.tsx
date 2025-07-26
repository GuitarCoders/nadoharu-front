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
import { uploadProfileImage } from "@/app/me/setting/_api/upload-profile-image";
import { compressImageInBrowser } from "@/libs/browser-image-compressor";

interface EditProfileFormProps {
  name: string;
  aboutMe: string;
  accountId: string;
  profileImageUrl?: string | null;
  uploadUrl: string;
  publicUrl: string;
}

interface EditProfileForm {
  name: string;
  about_me: string;
  password: string;
  confirm_password: string;
  profile_image: FileList | null;
}

export default function EditProfileForm({
  name,
  aboutMe,
  accountId,
  profileImageUrl,
  uploadUrl,
  publicUrl,
}: EditProfileFormProps) {
  const [pending, setPending] = useState(false);
  const { register, handleSubmit } = useForm<EditProfileForm>();
  const setToast = useSetAtom(toastAtom);
  const router = useRouter();

  const [profileImagePreview, setProfileImagePreview] = useState<
    string | null | undefined
  >(profileImageUrl);

  const onProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const onEditProfileSubmit = async (updateUserData: {
    name: string;
    about_me: string;
    profile_image: FileList | null;
  }) => {
    setPending(true);

    let uploadedFileUrl = profileImageUrl;

    if (updateUserData.profile_image) {
      // 브라우저에서 1MB 이하로 압축
      const compressed = await compressImageInBrowser(
        updateUserData.profile_image[0]
      );

      const response = await uploadProfileImage({
        file: compressed,
        uploadUrl,
      });
      if (response.success) {
        uploadedFileUrl = publicUrl;
      } else {
        setToast({
          visible: true,
          isError: true,
          title: response.errorMessage,
        });
        setPending(false);
        return;
      }
    }

    const response = await updateUser({
      updateUserData: {
        name: updateUserData.name,
        about_me: updateUserData.about_me,
        profile_image_url: uploadedFileUrl,
      },
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
              htmlFor="profileImageUrl"
              className="flex items-center justify-center absolute top-0 left-0 size-20 group cursor-pointer bg-neutral-800/50 hover:bg-neutral-800/70"
            >
              <PencilIcon className="size-6 opacity-40 group-hover:opacity-100" />
              <input
                id="profileImageUrl"
                type="file"
                className="hidden"
                accept="image/*"
                {...register("profile_image", {
                  onChange: onProfileImageChange,
                })}
              />
            </label>
            <ProfileImage
              profileImageUrl={profileImagePreview}
              name={name}
              size={20}
            />
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
