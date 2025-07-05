"use server";

import { getClient } from "@/libs/apollo-client";
import {
  UpdateUserDocument,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from "./(graphql)";
import { ActionResponse } from "@/app/types/action";

export async function updateUser(
  variables: UpdateUserMutationVariables
): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.mutate<
      UpdateUserMutation,
      UpdateUserMutationVariables
    >({
      mutation: UpdateUserDocument,
      variables,
    });

    if (data?.updateUser.status === "success") {
      return {
        success: true,
      };
    } else {
      throw new Error("유저 정보를 업데이트하는데 실패했습니다.");
    }
  } catch (error) {
    return {
      success: false,
      errorMessage:
        error instanceof Error
          ? error.message
          : "유저 정보를 업데이트하는데 실패했습니다.",
    };
  }
}
