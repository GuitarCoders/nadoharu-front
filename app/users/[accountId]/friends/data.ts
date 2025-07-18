"use server";

import { getClient } from "@/libs/apollo-client";
import { PaginationFrom, PaginationSort } from "@/graphql/generated/graphql";
import {
  FriendsDocument,
  FriendsQuery,
  FriendsQueryVariables,
  GetUserIdDocument,
  GetUserIdQuery,
  GetUserIdQueryVariables,
} from "./_graphql";

export async function getUserId(
  variables: GetUserIdQueryVariables,
): Promise<GetUserIdQuery> {
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
          sort: PaginationSort.Desc,
        },
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
