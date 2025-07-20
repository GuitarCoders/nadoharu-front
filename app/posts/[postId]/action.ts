"use server";

import { getClient } from "@/libs/apollo-client";
import {
  AddCommentToPostDocument,
  AddCommentToPostMutation,
  AddNadoDocument,
  AddNadoMutation,
  AddNadoMutationVariables,
  CancelNadoDocument,
  CancelNadoMutation,
  CancelNadoMutationVariables,
  DeleteCommentByIdDocument,
  DeleteCommentByIdMutation,
  DeleteCommentByIdMutationVariables,
  DeletePostDocument,
  DeletePostMutation,
  DeletePostMutationVariables,
} from "./_graphql";
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
    const { data } = await client.mutate<
      DeleteCommentByIdMutation,
      DeleteCommentByIdMutationVariables
    >({
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

export async function deletePost(
  variables: DeletePostMutationVariables,
): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.mutate<
      DeletePostMutation,
      DeletePostMutationVariables
    >({
      mutation: DeletePostDocument,
      variables,
    });

    if (data) {
      revalidatePath(`/posts/${variables.postId}`);
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

export async function addNado(
  variables: AddNadoMutationVariables,
): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.mutate<
      AddNadoMutation,
      AddNadoMutationVariables
    >({
      mutation: AddNadoDocument,
      variables,
    });

    if (data?.addNado.originPostId) {
      revalidatePath(`/posts`);
      revalidatePath(`/posts/${variables.targetPostId}`);
      return {
        success: true,
      };
    } else {
      throw new Error("나도를 추가하는데 실패했습니다.");
    }
  } catch (error) {
    return {
      success: false,
      errorMessage:
        error instanceof Error
          ? error.message
          : "나도를 추가하는데 실패했습니다.",
    };
  }
}

export async function cancelNado(
  variables: CancelNadoMutationVariables,
): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.mutate<
      CancelNadoMutation,
      CancelNadoMutationVariables
    >({
      mutation: CancelNadoDocument,
      variables,
    });

    if (data?.cancelNado.success) {
      revalidatePath(`/posts`);
      revalidatePath(`/posts/${variables.targetPostId}`);
      return {
        success: true,
      };
    } else {
      throw new Error("나도를 취소하는데 실패했습니다.");
    }
  } catch (error) {
    return {
      success: false,
      errorMessage:
        error instanceof Error
          ? error.message
          : "나도를 취소하는데 실패했습니다.",
    };
  }
}
