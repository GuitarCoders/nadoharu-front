"use server";

import { getClient } from "@/libs/apollo-client";
import {
  GetMyPostsDocument,
  GetMyPostsQuery,
  UserWhoAmIDocument,
  UserWhoAmIQuery,
} from "./index.generated";

export async function getMyPosts(accountId: string) {
  const client = await getClient();
  const { data } = await client.query<GetMyPostsQuery>({
    query: GetMyPostsDocument,
    variables: { count: 5, filter: undefined, accountId },
  });

  return data;
}

export async function getWhoAmI() {
  const client = await getClient();
  const { data } = await client.query<UserWhoAmIQuery>({
    query: UserWhoAmIDocument,
  });

  return data;
}
