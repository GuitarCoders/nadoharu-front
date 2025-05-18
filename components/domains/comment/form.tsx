"use client";

import { addCommentToPost } from "@/app/posts/[postId]/action";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ChatInput from "@/components/domains/chat/input";

export interface CommentForm {
  content: string;
}

export default function CommentForm({ postId }: { postId: string }) {
  const [pending, setPending] = useState(false);
  const { register, handleSubmit, reset } = useForm<CommentForm>();

  const onCommentSubmit = async ({ content }: CommentForm) => {
    setPending(true);
    const response = await addCommentToPost({
      targetPostId: postId,
      content,
    });

    if (response.ok) {
      reset();
    } else {
      alert("error!");
    }

    setPending(false);
  };

  return (
    <form onSubmit={handleSubmit(onCommentSubmit)}>
      <ChatInput
        pending={pending}
        placeholder={pending ? "댓글을 업로드하는 중.." : "댓글 입력.."}
        {...register("content")}
      />
    </form>
  );
}
