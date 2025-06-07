"use server";

import { getClient } from "@/libs/apollo-client";
import {
  MeDocument,
  MeQuery,
  PostsByMeDocument,
  PostsByMeQuery,
} from "./(graphql)";
import { PaginationInput, PostFilter } from "@/graphql/generated/graphql";

export async function getMyPosts(variables: {
  filter: PostFilter;
  pagination: PaginationInput;
}): Promise<PostsByMeQuery> {
  const client = await getClient();
  const { data } = await client.query<PostsByMeQuery>({
    query: PostsByMeDocument,
    variables,
  });

  return data;
}

export async function getWhoAmI() {
  const client = await getClient();
  const { data } = await client.query<MeQuery>({
    query: MeDocument,
  });

  return data;
}
