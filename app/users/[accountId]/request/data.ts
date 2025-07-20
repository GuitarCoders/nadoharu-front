"use server";

import { getClient } from "@/libs/apollo-client";
import {
  UserNameByAccountIdDocument,
  UserNameByAccountIdQuery,
  UserNameByAccountIdQueryVariables,
} from "./_graphql";

export async function getReceiveUserByAccountId(
  variables: UserNameByAccountIdQueryVariables,
) {
  try {
    const client = await getClient();
    const { data } = await client.query<
      UserNameByAccountIdQuery,
      UserNameByAccountIdQueryVariables
    >({
      query: UserNameByAccountIdDocument,
      variables,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
