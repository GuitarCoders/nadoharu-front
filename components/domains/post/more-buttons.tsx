"use client";

import { ExclamationTriangleIcon, TrashIcon } from "@heroicons/react/16/solid";
import MoreButtons, { MoreBtn } from "@/components/shared/buttons/more-buttons";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { alertAtom, toastAtom } from "@/libs/atoms";
import { deletePost } from "@/app/posts/[postId]/action";

export default function PostDetailMoreBtns({
  isUserPost,
  postId,
}: {
  isUserPost: boolean;
  postId: string;
}) {
  const router = useRouter();
  const setAlert = useSetAtom(alertAtom);
  const setToast = useSetAtom(toastAtom);

  const handleDeletePost = async () => {
    const result = await deletePost({ postId });
    if (result.ok) {
      router.push("/posts");
      setToast({
        visible: true,
        title: "게시글이 삭제되었습니다.",
      });
    }
  };

  const buttons: MoreBtn[] = [
    isUserPost
      ? {
          name: "게시글 삭제하기",
          icon: <TrashIcon className="size-5" />,
          action: handleDeletePost,
          color: "red",
        }
      : {
          name: "게시글 신고하기",
          icon: <ExclamationTriangleIcon className="size-5" />,
          action: () => console.log("신고하기"),
        },
  ];

  return <MoreButtons buttons={buttons} />;
}
