"use server";

import { getClient } from "@/libs/apollo-client";
import {
  GetFriendsDocument,
  GetFriendsQuery,
  GetUserIdDocument,
  GetUserIdQuery,
} from "./index.generated";

export async function getUserId({
  accountId,
}: {
  accountId: string;
}): Promise<GetUserIdQuery> {
  try {
    const client = await getClient();
    const { data } = await client.query<GetUserIdQuery>({
      query: GetUserIdDocument,
      variables: { account_id: accountId },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getFriends(variables: {
  targetUserId: string;
  limit: number;
  skip: number;
}): Promise<GetFriendsQuery> {
  try {
    const client = await getClient();
    const { data } = await client.query<GetFriendsQuery>({
      query: GetFriendsDocument,
      variables,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
