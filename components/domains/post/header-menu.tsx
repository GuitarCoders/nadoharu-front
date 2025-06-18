"use client";

import { ExclamationTriangleIcon, TrashIcon } from "@heroicons/react/16/solid";
import ContextualMenu, {
  ContextualBtn,
} from "@/components/shared/buttons/contextual-menu";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { toastAtom } from "@/libs/atoms";
import { deletePost } from "@/app/posts/[postId]/action";

export default function PostHeaderMenu({
  isUserPost,
  postId,
}: {
  isUserPost: boolean;
  postId: string;
}) {
  const router = useRouter();
  const setToast = useSetAtom(toastAtom);

  const handleDeletePost = async () => {
    const result = await deletePost({ postId });
    if (result.success) {
      router.push("/posts");
      setToast({
        visible: true,
        title: "게시글이 삭제되었습니다.",
      });
    } else {
      setToast({
        visible: true,
        title: result.errorMessage,
        isError: true,
      });
    }
  };

  const buttons: ContextualBtn[] = [
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

  return <ContextualMenu buttons={buttons} />;
}
