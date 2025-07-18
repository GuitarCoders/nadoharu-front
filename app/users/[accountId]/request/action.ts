"use server";

import { getClient } from "@/libs/apollo-client";
import {
  CreateFriendRequestDocument,
  CreateFriendRequestMutation,
  CreateFriendRequestMutationVariables,
} from "./_graphql";
import { ActionResponse } from "@/app/types/action";

export async function sendFriendRequest(
  variables: CreateFriendRequestMutationVariables,
): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.mutate<
      CreateFriendRequestMutation,
      CreateFriendRequestMutationVariables
    >({
      mutation: CreateFriendRequestDocument,
      variables,
    });

    if (data?.createFriendRequest.success) {
      return {
        success: true,
      };
    } else {
      throw new Error("친구 신청을 보내는데 실패했습니다.");
    }
  } catch (error) {
    return {
      success: false,
      errorMessage:
        error instanceof Error
          ? error.message
          : "친구 신청을 보내는데 실패했습니다.",
    };
  }
}
