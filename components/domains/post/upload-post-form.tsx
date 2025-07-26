"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import SubmitButton from "@/components/shared/buttons/submit-button";
import TextInput from "@/components/shared/inputs/text-input";
import Textarea from "@/components/shared/inputs/textarea";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { toastAtom } from "@/libs/atoms";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { createPost } from "@/app/posts/new/action";
import { redirect } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { uploadPostImages } from "@/app/posts/new/_api/upload-images";
import { compressImageInBrowser } from "@/libs/browser-image-compressor";
import { useEffect } from "react";

const MAX_IMAGES = 1;
const MAX_FILE_SIZE = 1024 * 1024; // 1MB

interface UploadPostFormData {
  content: string;
  tags: string;
}

export default function UploadPostForm({
  uploadUrl,
  publicUrl,
}: {
  uploadUrl: string;
  publicUrl: string;
}) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [pending, setPending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadPostFormData>();
  const setToast = useSetAtom(toastAtom);

  // attachedFiles 변경 시 previews 동기화
  useEffect(() => {
    const newPreviews = attachedFiles.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);

    // cleanup: 이전 preview URL들 해제 (메모리 누수 방지)
    return () => {
      newPreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [attachedFiles]);

  const onNewPostFormSubmit = async (postData: UploadPostFormData) => {
    setPending(true);

    let imageUrls: string[] = [];

    // 첨부된 파일이 있는 경우에만 업로드
    if (attachedFiles.length > 0) {
      const uploadImagesResponse = await uploadPostImages({
        images: attachedFiles, // 압축된 파일들 사용
        uploadUrls: [uploadUrl], // 현재는 1개만 지원
      });

      if (!uploadImagesResponse.success) {
        setToast({
          visible: true,
          title: uploadImagesResponse.errorMessage,
          isError: true,
        });
        setPending(false);
        return;
      }

      imageUrls = [publicUrl];
    }

    const response = await createPost({
      postData: {
        content: postData.content,
        tags: postData.tags,
        imageUrls,
        // TODO: category 선택 혹은 생성하는 기능 구현
        category: "",
      },
    });

    if (response.success) {
      setAttachedFiles([]); // useEffect가 previews도 자동으로 빈 배열로 설정
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
      setPending(false);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    // 현재 첨부된 이미지 개수 + 새로 선택한 이미지 개수가 최대 허용량을 초과하지 않도록 제한
    const availableSlots = MAX_IMAGES - attachedFiles.length;
    const filesToProcess = fileArray.slice(0, availableSlots);

    if (filesToProcess.length < fileArray.length) {
      setToast({
        visible: true,
        title: `최대 ${MAX_IMAGES}장까지 업로드할 수 있습니다`,
        isError: true,
      });
    }

    if (filesToProcess.length === 0) return;

    // 각 파일을 압축하고 상태에 추가
    const newCompressedFiles: File[] = [];

    for (const file of filesToProcess) {
      try {
        // 파일 압축
        const compressedFile = await compressImageInBrowser(file);

        // 압축 후 크기 검증
        if (compressedFile.size > MAX_FILE_SIZE) {
          setToast({
            visible: true,
            title: "일부 이미지가 너무 커서 첨부하지 못했어요.",
            isError: true,
          });
          continue; // 이 파일은 건너뛰고 다음 파일 처리 (기존 파일들은 유지됨)
        }

        newCompressedFiles.push(compressedFile);
      } catch (error) {
        setToast({
          visible: true,
          title: "이미지 처리 중 오류가 발생했습니다.",
          isError: true,
        });
      }
    }

    if (newCompressedFiles.length > 0) {
      // 기존 파일들 + 새로 추가된 파일들 (useEffect가 previews 자동 업데이트)
      setAttachedFiles([...attachedFiles, ...newCompressedFiles]);
    }

    // HTML input 초기화 (다음 선택을 위해)
    event.target.value = "";
  };

  const handleImageRemove = (index: number) => {
    const newAttachedFiles = attachedFiles.filter((_, i) => i !== index);
    setAttachedFiles(newAttachedFiles); // useEffect가 previews 자동 업데이트
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
        disabled={pending}
        {...register("content")}
      />
      <TextInput
        placeholder="태그 작성.."
        errorMessage={errors.tags?.message}
        disabled={pending}
        {...register("tags")}
      />
      <div className="flex gap-2">
        <div>
          <label
            htmlFor="photos"
            className={`w-14 h-14 border-2 border-dashed rounded-md text-neutral-300 flex justify-center items-center ${
              attachedFiles.length >= MAX_IMAGES
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:text-neutral-700 hover:border-neutral-700 dark:hover:text-neutral-400 dark:hover:border-neutral-400"
            }`}
          >
            <PlusIcon
              className={`size-6 ${
                attachedFiles.length >= MAX_IMAGES ? "rotate-45" : ""
              }`}
            />
          </label>
          <input
            id="photos"
            type="file"
            accept="image/*"
            className="hidden"
            disabled={attachedFiles.length >= MAX_IMAGES}
            onChange={handleImageUpload}
          />
        </div>
        {previews.map((preview, index) => (
          <button
            key={index}
            type="button"
            className="relative"
            onClick={() => handleImageRemove(index)}
          >
            <div className="absolute top-[2px] right-[2px] bg-neutral-900/50 rounded-full p-[2px] hover:bg-neutral-900/70">
              <XMarkIcon className="size-4 text-neutral-400" />
            </div>
            <Image
              src={preview}
              alt={`preview-${index + 1}`}
              className="size-14 overflow-hidden object-cover rounded-md border border-neutral-400 dark:border-neutral-800"
              width={56}
              height={56}
            />
          </button>
        ))}
      </div>
      <SubmitButton
        text="글쓰기"
        pending={pending}
        pendingText="업로드 중..."
      />
    </form>
  );
}
