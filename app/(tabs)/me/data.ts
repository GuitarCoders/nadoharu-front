"use server";

import { getClient } from "@/libs/apollo-client";
import {
  MeDocument,
  MeQuery,
  PostsByMeDocument,
  PostsByMeQuery,
} from "./_graphql";
import {
  MeQueryVariables,
  PaginationFrom,
  PaginationSort,
  PostsByMeQueryVariables,
} from "@/graphql/generated/graphql";

export async function getMyPosts({
  category,
  limit,
  until,
}: {
  category?: string;
  limit: number;
  until?: string;
}): Promise<PostsByMeQuery> {
  try {
    const client = await getClient();
    const { data } = await client.query<
      PostsByMeQuery,
      PostsByMeQueryVariables
    >({
      query: PostsByMeDocument,
      variables: {
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

export async function getWhoAmI() {
  const client = await getClient();
  const { data } = await client.query<MeQuery, MeQueryVariables>({
    query: MeDocument,
  });

  return data;
}
