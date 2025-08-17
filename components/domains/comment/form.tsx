"use client";

import { addCommentToPost } from "@/app/posts/[postId]/action";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toastAtom } from "@/libs/atoms";
import { useSetAtom } from "jotai";
import CommentInput from "./input";

export interface CommentForm {
  content: string;
}

export default function CommentForm({ postId }: { postId: string }) {
  const setToast = useSetAtom(toastAtom);

  const [pending, setPending] = useState(false);
  const { register, handleSubmit, reset } = useForm<CommentForm>();

  const onCommentSubmit = async ({ content }: CommentForm) => {
    if (content.trim() === "") {
      return;
    }

    setPending(true);
    const response = await addCommentToPost({
      targetPostId: postId,
      content,
    });

    if (response.success) {
      reset();
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
    <form onSubmit={handleSubmit(onCommentSubmit)}>
      <CommentInput
        pending={pending}
        placeholder={pending ? "댓글을 업로드하는 중.." : "댓글 입력.."}
        {...register("content")}
      />
    </form>
  );
}
