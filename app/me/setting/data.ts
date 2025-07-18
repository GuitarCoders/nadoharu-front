"use server";

import { getClient } from "@/libs/apollo-client";
import {
  UserByAccountIdDocument,
  UserByAccountIdQuery,
  UserByAccountIdQueryVariables,
} from "./_graphql";

export async function getUserByAccountId(
  variables: UserByAccountIdQueryVariables,
): Promise<UserByAccountIdQuery> {
  const client = await getClient();
  const { data } = await client.query<
    UserByAccountIdQuery,
    UserByAccountIdQueryVariables
  >({
    query: UserByAccountIdDocument,
    variables,
  });

  return data;
}
