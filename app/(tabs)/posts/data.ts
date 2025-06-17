"use server";

import { getClient } from "@/libs/apollo-client";
import { PostsForTimelineDocument, PostsForTimelineQuery } from "./(graphql)";
import { PaginationFrom } from "@/graphql/generated/graphql";

export async function getNewerPosts({
  limit,
  cursor,
}: {
  limit: number;
  cursor?: string | null;
}): Promise<PostsForTimelineQuery> {
  try {
    const client = await getClient();
    const { data } = await client.query<PostsForTimelineQuery>({
      query: PostsForTimelineDocument,
      variables: {
        pagination: {
          limit,
          cursor,
          from: PaginationFrom.Start,
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
  until,
}: {
  limit: number;
  until?: string | null;
}): Promise<PostsForTimelineQuery> {
  try {
    const client = await getClient();
    const { data } = await client.query<PostsForTimelineQuery>({
      query: PostsForTimelineDocument,
      variables: {
        pagination: {
          limit,
          until,
          from: PaginationFrom.End,
        },
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
