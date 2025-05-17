"use server";

import {
  UserByAccountIdDocument,
  UserByAccountIdQuery,
} from "@/graphql/generated/graphql";
import { getClient } from "@/libs/apollo-client";

export async function getUserByAccountId(
  accountId: string
): Promise<UserByAccountIdQuery> {
  const client = await getClient();
  const { data } = await client.query<UserByAccountIdQuery>({
    query: UserByAccountIdDocument,
    variables: { account_id: accountId },
  });

  return data;
}
