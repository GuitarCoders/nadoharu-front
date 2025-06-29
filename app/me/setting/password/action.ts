"use server";

import { getClient } from "@/libs/apollo-client";
import {
  UpdateUserPasswordDocument,
  UpdateUserPasswordMutation,
  UpdateUserPasswordMutationVariables,
} from "./(graphql)";
import { ActionResponse } from "@/app/types/action";

export async function updatePassword(
  variables: UpdateUserPasswordMutationVariables
): Promise<ActionResponse> {
  const client = await getClient();

  try {
    const { data } = await client.mutate<
      UpdateUserPasswordMutation,
      UpdateUserPasswordMutationVariables
    >({
      mutation: UpdateUserPasswordDocument,
      variables,
    });

    if (data?.updateUserPassword?._id) {
      return {
        success: true,
      };
    } else {
      throw new Error("비밀번호 변경에 실패했습니다.");
    }
  } catch (error) {
    return {
      success: false,
      errorMessage:
        error instanceof Error
          ? error.message
          : "비밀번호 변경에 실패했습니다.",
    };
  }
}
