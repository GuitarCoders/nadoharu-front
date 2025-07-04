"use client";

import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";
import { startTransition, useOptimistic } from "react";

interface RepostFormProps {
  postId: string;
  isReposted: boolean;
  nadoCount: number;
}

export default function RepostForm({
  // postId,
  isReposted,
  nadoCount,
}: RepostFormProps) {
  const [state, reducerFn] = useOptimistic(
    { isReposted, nadoCount },
    (prev) => ({
      isReposted: !prev.isReposted,
      nadoCount: prev.isReposted ? prev.nadoCount - 1 : prev.nadoCount + 1,
    })
  );

  const onRepostClick = async () => {
    startTransition(() => reducerFn(undefined));
    if (isReposted) {
      // await unrepost(postId);
    } else {
      // await repost(postId);
    }
  };

  return (
    <form action={onRepostClick}>
      <button
        className={`flex items-center gap-1 border shadow-sm rounded-md px-3 py-2 text-sm ${
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
