"use server";

import { getClient } from "@/libs/apollo-client";
import {
  MeDocument,
  MeQuery,
  PostsByMeDocument,
  PostsByMeQuery,
} from "./index.generated";

export async function getMyPosts(accountId: string) {
  const client = await getClient();
  const { data } = await client.query<PostsByMeQuery>({
    query: PostsByMeDocument,
    variables: { count: 5, filter: undefined, accountId },
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
