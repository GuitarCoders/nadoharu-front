"use server";

import { getClient } from "@/libs/apollo-client";
import {
  AddCommentToPostDocument,
  AddCommentToPostMutation,
  DeleteCommentByIdDocument,
  DeleteCommentByIdMutation,
  DeletePostDocument,
  DeletePostMutation,
} from "./(graphql)";
import { ActionResponse } from "@/app/types/action";
import { revalidatePath } from "next/cache";

export async function addCommentToPost(variables: {
  targetPostId: string;
  content: string;
}): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.mutate<AddCommentToPostMutation>({
      mutation: AddCommentToPostDocument,
      variables,
    });

    if (data) {
      revalidatePath(`/posts/${variables.targetPostId}`);
      return {
        success: true,
      };
    } else {
      throw new Error("댓글을 추가하는데 실패했습니다.");
    }
  } catch (error) {
    return {
      success: false,
      errorMessage:
        error instanceof Error
          ? error.message
          : "댓글을 추가하는데 실패했습니다.",
    };
  }
}

export async function deleteCommentById({
  targetPostId,
  targetCommentId,
}: {
  targetPostId: string;
  targetCommentId: string;
}): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.mutate<DeleteCommentByIdMutation>({
      mutation: DeleteCommentByIdDocument,
      variables: { targetCommentId },
    });

    if (data) {
      revalidatePath(`/posts/${targetPostId}`);
      return {
        success: true,
      };
    } else {
      throw new Error("댓글을 삭제하는데 실패했습니다.");
    }
  } catch (error) {
    return {
      success: false,
      errorMessage:
        error instanceof Error
          ? error.message
          : "댓글을 삭제하는데 실패했습니다.",
    };
  }
}

export async function deletePost({ postId }: { postId: string }) {
  try {
    const client = await getClient();
    const { data } = await client.mutate<DeletePostMutation>({
      mutation: DeletePostDocument,
      variables: { postId },
    });

    if (data) {
      revalidatePath(`/posts/${postId}`);
      return {
        success: true,
      };
    } else {
      throw new Error("게시글을 삭제하는데 실패했습니다.");
    }
  } catch (error) {
    return {
      success: false,
      errorMessage:
        error instanceof Error
          ? error.message
          : "게시글을 삭제하는데 실패했습니다.",
    };
  }
}
