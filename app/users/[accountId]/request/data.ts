"use server";

import { getClient } from "@/libs/apollo-client";
import {
  GetReceiveUserByAccountIdDocument,
  GetReceiveUserByAccountIdQuery,
} from "./index.generated";

export async function getReceiveUserByAccountId(accountId: string) {
  try {
    const client = await getClient();
    const { data } = await client.query<GetReceiveUserByAccountIdQuery>({
      query: GetReceiveUserByAccountIdDocument,
      variables: {
        accountId,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
