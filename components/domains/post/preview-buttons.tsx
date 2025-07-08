"use client";

import { addNado, cancelNado } from "@/app/posts/[postId]/action";
import { toastAtom } from "@/libs/atoms";
import {
  ArrowPathRoundedSquareIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { useSetAtom } from "jotai";
import { startTransition, useEffect, useOptimistic, useState } from "react";

interface PostPreviewButtonsProps {
  postId: string;
  isUserReposted: boolean;
  isUserPost: boolean;
  nadoCount: number;
  commentCount: number;
}

export default function PostPreviewButtons({
  postId,
  isUserReposted,
  isUserPost,
  nadoCount,
  commentCount,
}: PostPreviewButtonsProps) {
  const setToast = useSetAtom(toastAtom);

  const [optimistic, setOptimistic] = useState({
    isUserReposted,
    nadoCount,
  });

  useEffect(() => {
    setOptimistic({ isUserReposted, nadoCount });
  }, [isUserReposted, nadoCount]);

  const showError = (msg: string) =>
    setToast({ visible: true, title: msg, isError: true });

  const onToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setOptimistic((prev) => ({
      isUserReposted: !prev.isUserReposted,
      nadoCount: prev.isUserReposted ? prev.nadoCount - 1 : prev.nadoCount + 1,
    }));

    const res = optimistic.isUserReposted
      ? await cancelNado({ targetPostId: postId })
      : await addNado({ targetPostId: postId });

    if (!res.success) {
      setOptimistic((prev) => ({
        isUserReposted: !prev.isUserReposted,
        nadoCount: prev.isUserReposted
          ? prev.nadoCount + 1
          : prev.nadoCount - 1,
      }));
      showError(res.errorMessage);
    }
  };

  return (
    <div className="flex gap-2 self-end mt-4 text-neutral-600 dark:text-neutral-100">
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center gap-1 border py-1 px-2 rounded-md ${
          optimistic.isUserReposted
            ? "text-white bg-violet-400 hover:bg-violet-300 border-violet-600 dark:border-violet-800"
            : "bg-white hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-700"
        }`}
      >
        <ArrowPathRoundedSquareIcon className="size-4" />
        <p className="text-sm">{optimistic.nadoCount}</p>
      </button>
      <div className="flex items-center gap-1 border py-1 px-2 rounded-md bg-white hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-700">
        <ChatBubbleOvalLeftEllipsisIcon className="size-4" />
        <p className="text-sm">{commentCount}</p>
      </div>
    </div>
  );
}
