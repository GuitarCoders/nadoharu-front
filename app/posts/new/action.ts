"use server";

import { getClient } from "@/libs/apollo-client";
import { ActionResponse } from "@/app/types/action";
import { revalidatePath } from "next/cache";
import { CreatePostDocument, CreatePostMutation } from "./index.generated";

export async function createPost(variables: {
  content: string;
  tags: string;
  category: string;
}): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.mutate<CreatePostMutation>({
      mutation: CreatePostDocument,
      variables,
    });

    if (data) {
      revalidatePath(`/posts`);
    }

    return {
      ok: true,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
    };
  }
}
