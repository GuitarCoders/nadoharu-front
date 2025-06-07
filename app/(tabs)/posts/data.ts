"use server";

import { getClient } from "@/libs/apollo-client";
import { PostsForTimelineDocument, PostsForTimelineQuery } from "./(graphql)";
import { PaginationInput } from "@/graphql/generated/graphql";

export async function getPosts(variables: {
  pagination: PaginationInput;
}): Promise<PostsForTimelineQuery> {
  const client = await getClient();
  const { data } = await client.query<PostsForTimelineQuery>({
    query: PostsForTimelineDocument,
    variables,
  });

  return data;
}
