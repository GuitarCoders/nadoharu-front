"use server";

import { getClient } from "@/libs/apollo-client";
import {
  AddCommentToPostDocument,
  AddCommentToPostMutation,
  DeleteCommentByIdDocument,
  DeleteCommentByIdMutation,
} from "./index.generated";
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
