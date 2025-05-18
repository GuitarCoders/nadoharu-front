"use server";

import { getClient } from "@/libs/apollo-client";
import {
  GetUserByAccountIdDocument,
  GetUserByAccountIdQuery,
} from "./index.generated";

export async function getUserByAccountId(
  accountId: string
): Promise<GetUserByAccountIdQuery> {
  const client = await getClient();
  const { data } = await client.query<GetUserByAccountIdQuery>({
    query: GetUserByAccountIdDocument,
    variables: { account_id: accountId },
  });

  return data;
}
