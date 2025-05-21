"use client";

import { ExclamationTriangleIcon, TrashIcon } from "@heroicons/react/16/solid";
import MoreButtons, { MoreBtn } from "@/components/shared/buttons/more-buttons";
import { useSetAtom } from "jotai";
import { alertAtom, toastAtom } from "@/libs/atoms";
import { deleteCommentById } from "@/app/posts/[postId]/action";

export default function CommentMoreBtns({
  isUserComment,
  targetCommentId,
  targetPostId,
}: {
  isUserComment: boolean;
  targetCommentId: string;
  targetPostId: string;
}) {
  const setToast = useSetAtom(toastAtom);
  const removeComment = async () => {
    const result = await deleteCommentById({ targetCommentId, targetPostId });
    if (result.ok) {
      setToast({
        visible: true,
        title: "댓글이 삭제되었습니다.",
      });
    }
  };

  const buttons: MoreBtn[] = [
    isUserComment
      ? {
          name: "댓글 삭제하기",
          icon: <TrashIcon className="size-5" />,
          action: removeComment,
          color: "red",
        }
      : {
          name: "댓글 신고하기",
          icon: <ExclamationTriangleIcon className="size-5" />,
          action: () => console.log("신고하기"),
        },
  ];

  return <MoreButtons buttons={buttons} />;
}
