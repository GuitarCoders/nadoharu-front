"use server";

import { getClient } from "@/libs/apollo-client";
import { PostsForTimelineDocument, PostsForTimelineQuery } from "./(graphql)";
import { PaginationInput } from "@/graphql/generated/graphql";

export async function getPosts(variables: {
  pagination: PaginationInput;
}): Promise<PostsForTimelineQuery> {
  try {
    const client = await getClient();
    const { data } = await client.query<PostsForTimelineQuery>({
      query: PostsForTimelineDocument,
      variables,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
