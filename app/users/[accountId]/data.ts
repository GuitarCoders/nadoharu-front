"use server";

import { getClient } from "@/libs/apollo-client";
import {
  UserByAccountIdDocument,
  UserByAccountIdQuery,
  UserByAccountIdQueryVariables,
  PostsByUserIdDocument,
  PostsByUserIdQuery,
  PostsByUserIdQueryVariables,
} from "./_graphql";
import { PaginationFrom, PaginationSort } from "@/graphql/generated/graphql";

export async function getUserByAccountId(
  variables: UserByAccountIdQueryVariables,
): Promise<UserByAccountIdQuery> {
  try {
    const client = await getClient();
    const { data } = await client.query<
      UserByAccountIdQuery,
      UserByAccountIdQueryVariables
    >({
      query: UserByAccountIdDocument,
      variables,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getPostsByUserId({
  targetUserId,
  category,
  limit,
  until,
}: {
  targetUserId: string;
  category: string;
  limit: number;
  until: string | null;
}): Promise<PostsByUserIdQuery> {
  try {
    const client = await getClient();
    const { data } = await client.query<
      PostsByUserIdQuery,
      PostsByUserIdQueryVariables
    >({
      query: PostsByUserIdDocument,
      variables: {
        targetUserId,
        filter: {
          category,
        },
        pagination: {
          limit,
          until,
          from: PaginationFrom.End,
          sort: PaginationSort.Desc,
        },
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
