"use server";

import { getClient } from "@/libs/apollo-client";
import { GetPostsDocument, GetPostsQuery } from "./index.generated";

export default async function getPosts(): Promise<GetPostsQuery> {
  const client = await getClient();
  const { data } = await client.query<GetPostsQuery>({
    query: GetPostsDocument,
    variables: { count: 5, filter: undefined },
  });

  return data;
}
