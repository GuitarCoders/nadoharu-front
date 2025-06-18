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
        ok: true,
      };
    } else {
      return {
        ok: false,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      ok: false,
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
        ok: true,
      };
    } else {
      return {
        ok: false,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      ok: false,
    };
  }
}
