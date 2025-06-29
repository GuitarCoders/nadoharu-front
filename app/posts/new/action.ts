"use server";

import { getClient } from "@/libs/apollo-client";
import { ActionResponse } from "@/app/types/action";
import { revalidatePath } from "next/cache";
import {
  CreatePostDocument,
  CreatePostMutation,
  CreatePostMutationVariables,
} from "./(graphql)";

export async function createPost(
  variables: CreatePostMutationVariables
): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.mutate<
      CreatePostMutation,
      CreatePostMutationVariables
    >({
      mutation: CreatePostDocument,
      variables,
    });

    if (data) {
      revalidatePath(`/posts`);
      return {
        success: true,
      };
    } else {
      throw new Error("게시글을 생성하는데 실패했습니다.");
    }
  } catch (error) {
    return {
      success: false,
      errorMessage:
        error instanceof Error
          ? error.message
          : "게시글을 생성하는데 실패했습니다.",
    };
  }
}
