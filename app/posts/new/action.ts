"use server";

import { getClient } from "@/libs/apollo-client";
import { ActionResponse } from "@/app/types/action";
import { revalidatePath } from "next/cache";
import { CreatePostDocument, CreatePostMutation } from "./(graphql)";
import { ApolloError } from "@apollo/client";

export async function createPost(postData: {
  content: string;
  tags: string;
  category: string;
}): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.mutate<CreatePostMutation>({
      mutation: CreatePostDocument,
      variables: { postData },
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
