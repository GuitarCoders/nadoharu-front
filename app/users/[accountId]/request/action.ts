"use server";

import { getClient } from "@/libs/apollo-client";
import {
  CreateFriendRequestDocument,
  CreateFriendRequestMutation,
} from "./index.generated";

export async function sendFriendRequest(variables: {
  receiveUserId: string;
  requestMessage: string;
}) {
  try {
    const client = await getClient();
    const { data } = await client.mutate<CreateFriendRequestMutation>({
      mutation: CreateFriendRequestDocument,
      variables,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
