"use server";

import { getClient } from "@/libs/apollo-client";
import {
  AcceptFriendRequestDocument,
  AcceptFriendRequestMutation,
  DeleteFriendRequestDocument,
  DeleteFriendRequestMutation,
} from "./(graphql)";
import { ActionResponse } from "@/app/types/action";

export async function acceptFriendRequest(variables: {
  acceptFriendRequestData: string;
}): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.mutate<AcceptFriendRequestMutation>({
      mutation: AcceptFriendRequestDocument,
      variables,
    });

    if (data?.acceptFriendRequest.success) {
      return {
        success: true,
      };
    } else {
      throw new Error("친구 신청을 수락하는데 실패했습니다.");
    }
  } catch (error) {
    return {
      success: false,
      errorMessage:
        error instanceof Error
          ? error.message
          : "친구 신청을 수락하는데 실패했습니다.",
    };
  }
}

export async function deleteFriendRequest(variables: {
  friendRequestId: string;
}): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.mutate<DeleteFriendRequestMutation>({
      mutation: DeleteFriendRequestDocument,
      variables,
    });

    if (data?.deleteFriendRequest.success) {
      return {
        success: true,
      };
    } else {
      throw new Error("친구 신청을 삭제하는데 실패했습니다.");
    }
  } catch (error) {
    return {
      success: false,
      errorMessage:
        error instanceof Error
          ? error.message
          : "친구 신청을 삭제하는데 실패했습니다.",
    };
  }
}
