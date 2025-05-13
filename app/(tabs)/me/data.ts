"use server";

import { getClient } from "@/libs/apollo-client";
import {
  GetMyPostsDocument,
  GetMyPostsQuery,
  UserByAccountIdDocument,
  UserByAccountIdQuery,
} from "./index.generated";

export async function getMyPosts(accountId: string) {
  const client = await getClient();
  const { data } = await client.query<GetMyPostsQuery>({
    query: GetMyPostsDocument,
    variables: { count: 5, filter: undefined, accountId },
  });

  return data;
}

export async function getUser(accountId: string) {
  const client = await getClient();
  const { data } = await client.query<UserByAccountIdQuery>({
    query: UserByAccountIdDocument,
    variables: { account_id: accountId },
  });

  return data;
}
