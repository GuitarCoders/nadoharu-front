"use server";

import { getClient } from "@/libs/apollo-client";
import {
  PostsForTimelineDocument,
  PostsForTimelineQuery,
} from "./index.generated";

export default async function getPosts(): Promise<PostsForTimelineQuery> {
  const client = await getClient();
  const { data } = await client.query<PostsForTimelineQuery>({
    query: PostsForTimelineDocument,
    variables: { count: 5, filter: undefined },
  });

  return data;
}
