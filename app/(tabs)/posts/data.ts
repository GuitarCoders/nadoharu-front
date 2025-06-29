"use server";

import { getClient } from "@/libs/apollo-client";
import { PostsForTimelineDocument, PostsForTimelineQuery } from "./(graphql)";
import {
  PaginationFrom,
  PaginationSort,
  PostsForTimelineQueryVariables,
} from "@/graphql/generated/graphql";

export async function getNewerPosts({
  limit,
  until,
}: {
  limit: number;
  until?: string | null;
}): Promise<PostsForTimelineQuery> {
  try {
    const client = await getClient();
    const { data } = await client.query<
      PostsForTimelineQuery,
      PostsForTimelineQueryVariables
    >({
      query: PostsForTimelineDocument,
      variables: {
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

export async function getOlderPosts({
  limit,
  cursor,
}: {
  limit: number;
  cursor?: string | null;
}): Promise<PostsForTimelineQuery> {
  try {
    const client = await getClient();
    const { data } = await client.query<
      PostsForTimelineQuery,
      PostsForTimelineQueryVariables
    >({
      query: PostsForTimelineDocument,
      variables: {
        pagination: {
          limit,
          cursor,
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
