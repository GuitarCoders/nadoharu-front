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
    }

    return {
      ok: true,
    };
  } catch (error) {
    if (error instanceof ApolloError) {
      return {
        ok: false,
        errors: error.message,
      };
    }
    return {
      ok: false,
      errors:
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.",
    };
  }
}
