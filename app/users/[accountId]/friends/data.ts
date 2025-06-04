"use server";

import { getClient } from "@/libs/apollo-client";
import { FriendsDocument, FriendsQuery } from "./index.generated";

export async function getUserId(accountId: string): Promise<FriendsQuery> {
  try {
    const client = await getClient();
    const { data } = await client.query<FriendsQuery>({
      query: FriendsDocument,
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
}): Promise<FriendsQuery> {
  try {
    const client = await getClient();
    const { data } = await client.query<FriendsQuery>({
      query: FriendsDocument,
      variables,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
