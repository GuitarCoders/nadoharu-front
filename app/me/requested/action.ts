"use server";

import { getClient } from "@/libs/apollo-client";
import {
  AcceptFriendRequestDocument,
  AcceptFriendRequestMutation,
  DeleteFriendRequestDocument,
  DeleteFriendRequestMutation,
  ReceivedFriendRequestsDocument,
  ReceivedFriendRequestsQuery,
} from "./index.generated";
import { ActionResponse } from "@/app/types/action";

export async function getReceivedFriendRequests() {
  try {
    const client = await getClient();
    const { data } = await client.query<ReceivedFriendRequestsQuery>({
      query: ReceivedFriendRequestsDocument,
    });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function acceptFriendRequest(
  friendRequestId: string
): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.mutate<AcceptFriendRequestMutation>({
      mutation: AcceptFriendRequestDocument,
      variables: { friendRequestId },
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

export async function deleteFriendRequest(
  friendRequestId: string
): Promise<ActionResponse> {
  try {
    const client = await getClient();
    const { data } = await client.mutate<DeleteFriendRequestMutation>({
      mutation: DeleteFriendRequestDocument,
      variables: { friendRequestId },
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
