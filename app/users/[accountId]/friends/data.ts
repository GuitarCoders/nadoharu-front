"use server";

import { getClient } from "@/libs/apollo-client";
import { PaginationInput } from "@/graphql/generated/graphql";
import {
  FriendsDocument,
  FriendsQuery,
  GetUserIdDocument,
  GetUserIdQuery,
} from "./(graphql)";

export async function getUserId(variables: {
  accountId: string;
}): Promise<GetUserIdQuery> {
  try {
    const client = await getClient();
    const { data } = await client.query<GetUserIdQuery>({
      query: GetUserIdDocument,
      variables,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getFriends(variables: {
  targetUserId: string;
  pagination: PaginationInput;
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
