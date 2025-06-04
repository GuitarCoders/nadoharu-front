"use server";

import { getClient } from "@/libs/apollo-client";
import {
  UserByAccountIdDocument,
  UserByAccountIdQuery,
} from "./index.generated";

export async function getUserByAccountId(accountId: string) {
  try {
    const client = await getClient();
    const { data } = await client.query<UserByAccountIdQuery>({
      query: UserByAccountIdDocument,
      variables: {
        account_id: accountId,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
