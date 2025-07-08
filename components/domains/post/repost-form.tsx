"use client";

import { addNado, cancelNado } from "@/app/posts/[postId]/action";
import { toastAtom } from "@/libs/atoms";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";
import { useSetAtom } from "jotai";
import { startTransition, useOptimistic } from "react";

interface RepostFormProps {
  postId: string;
  isReposted: boolean;
  nadoCount: number;
}

export default function RepostForm({
  postId,
  isReposted,
  nadoCount,
}: RepostFormProps) {
  const setToast = useSetAtom(toastAtom);
  const [state, reducerFn] = useOptimistic(
    { isReposted, nadoCount },
    (prev) => ({
      isReposted: !prev.isReposted,
      nadoCount: prev.isReposted ? prev.nadoCount - 1 : prev.nadoCount + 1,
    })
  );

  const showErrorToast = (errorMessage: string) => {
    setToast({
      visible: true,
      title: errorMessage,
      isError: true,
    });
  };

  const onRepostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      reducerFn(undefined);

      const res = isReposted
        ? await cancelNado({ targetPostId: postId })
        : await addNado({ targetPostId: postId });

      if (!res.success) showErrorToast(res.errorMessage);
    });
  };

  return (
    <form onSubmit={onRepostSubmit}>
      <button
        className={`flex items-center gap-1 border shadow-sm rounded-md px-3 py-2 text-sm cursor-pointer ${
          state.isReposted
            ? " bg-violet-400 text-white font-bold border-violet-800"
            : ""
        }`}
      >
        <ArrowPathRoundedSquareIcon className="size-4" />
        <span>나도</span>
        <span>{state.nadoCount}</span>
      </button>
    </form>
  );
}
