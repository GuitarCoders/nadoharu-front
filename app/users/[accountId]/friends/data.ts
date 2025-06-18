"use server";

import { getClient } from "@/libs/apollo-client";
import { PaginationFrom, PaginationInput } from "@/graphql/generated/graphql";
import {
  FriendsDocument,
  FriendsQuery,
  FriendsQueryVariables,
  GetUserIdDocument,
  GetUserIdQuery,
  GetUserIdQueryVariables,
} from "./(graphql)";

export async function getUserId(variables: {
  accountId: string;
}): Promise<GetUserIdQuery> {
  try {
    const client = await getClient();
    const { data } = await client.query<
      GetUserIdQuery,
      GetUserIdQueryVariables
    >({
      query: GetUserIdDocument,
      variables,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getFriends({
  targetUserId,
  limit,
}: {
  targetUserId: string;
  limit: number;
}): Promise<FriendsQuery> {
  try {
    const client = await getClient();
    const { data } = await client.query<FriendsQuery, FriendsQueryVariables>({
      query: FriendsDocument,
      variables: {
        targetUserId,
        pagination: {
          limit,
          from: PaginationFrom.End,
        },
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
