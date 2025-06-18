"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import SubmitButton from "@/components/shared/buttons/submit-button";
import TextInput from "@/components/shared/inputs/text-input";
import Textarea from "@/components/shared/inputs/textarea";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { alertAtom, toastAtom } from "@/libs/atoms";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { createPost } from "@/app/posts/new/action";
import { redirect } from "next/navigation";

const maxImageSizeMb = 20;
const maxImages = 4;

interface NewPostForm {
  content: string;
  tags: string;
}

export default function UploadPostForm() {
  const [previews, setPreviews] = useState<string[]>([]);
  const [pending, setPending] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewPostForm>();
  const setAlert = useSetAtom(alertAtom);
  const setToast = useSetAtom(toastAtom);

  const onNewPostFormSubmit = async (formData: NewPostForm) => {
    setPending(true);

    const response = await createPost({
      ...formData,
      // TODO: category 선택 혹은 생성하는 기능 구현
      category: "",
    });

    if (response.success) {
      reset();
      setPreviews([]);
      setToast({
        visible: true,
        title: "새 게시글이 작성되었습니다",
      });
      redirect("/posts");
    } else {
      setToast({
        visible: true,
        title: response.errorMessage,
        isError: true,
      });
    }

    setPending(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onNewPostFormSubmit)}
      className="flex flex-col gap-3"
    >
      <Textarea
        placeholder="무슨 일이 일어나고 있나요?"
        required={true}
        errorMessage={errors.content?.message}
        {...register("content")}
      />
      <TextInput
        placeholder="태그 작성.."
        errorMessage={errors.tags?.message}
        {...register("tags")}
      />
      <div className="flex gap-2">
        <div>
          <label
            htmlFor="photos"
            className={`w-14 h-14 border-2 border-dashed rounded-md text-neutral-300 flex justify-center items-center ${
              previews.length >= maxImages
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:text-neutral-700 hover:border-neutral-700 dark:hover:text-neutral-400 dark:hover:border-neutral-400"
            }`}
          >
            <PlusIcon
              className={`size-6 ${
                previews.length >= maxImages ? "rotate-45" : ""
              }`}
            />
          </label>
          <input
            multiple
            type="file"
            accept="image/*"
            className="hidden"
            id="photos"
            name="photos"
            disabled={previews.length >= maxImages}
          />
        </div>
        {previews.map((preview, index) => (
          <button key={index} type="button">
            <Image
              src={preview}
              alt="preview"
              className="size-14 rounded-md object-cover"
              width={56}
              height={56}
            />
          </button>
        ))}
      </div>
      <SubmitButton text="글쓰기" pending={pending} />
    </form>
  );
}
